// Additive contract only: existing Supabase integrations remain intact.
export const DWIJU_RTDB_PATHS = ['healthRecords','deviceTelemetry','deviceStatus','deviceCommands'] as const;
export type DwijuRtdbPath = typeof DWIJU_RTDB_PATHS[number];
export function userDataPath(path: DwijuRtdbPath, uid: string): string {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid)) throw new Error('Invalid user identity');
  return `${path}/${uid}`;
}

/** User-owned daily step goal record path. Never infer verified activity from a goal. */
export function dailyStepRecordPath(uid: string, date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date + 'T00:00:00Z')) ||
      new Date(date + 'T00:00:00Z').toISOString().slice(0,10) !== date)
    throw new Error('Invalid calendar date');
  return userDataPath('healthRecords', uid) + '/dailySteps/' + date;
}

export interface DailyStepRecord {
  goal: number;
  observed: number | null;
  verified: boolean;
  source: 'NOT_CONNECTED' | 'PHONE_SENSOR' | 'ESP32_SENSOR';
}
/** Strictly separate user-selected goal from verified hardware activity. */
export function validateDailyStepRecord(value: unknown): DailyStepRecord {
  if (!value || typeof value !== 'object') throw new Error('Invalid step record');
  const record = value as Record<string, unknown>;
  if (!Number.isSafeInteger(record.goal) || (record.goal as number) <= 0 || (record.goal as number) > 100000)
    throw new Error('Invalid step goal');
  const verified = record.verified === true;
  if (typeof record.verified !== 'boolean') throw new Error('Invalid verification flag');
  if (!['NOT_CONNECTED','PHONE_SENSOR','ESP32_SENSOR'].includes(String(record.source)))
    throw new Error('Invalid step source');
  if (verified && record.source === 'NOT_CONNECTED') throw new Error('Unverified sensor source');
  if (!verified && record.observed !== null) throw new Error('Unverified activity must be unknown');
  if (verified && (!Number.isSafeInteger(record.observed) || (record.observed as number) < 0))
    throw new Error('Invalid verified steps');
  return {
    goal: record.goal as number,
    observed: verified ? record.observed as number : null,
    verified,
    source: record.source as DailyStepRecord['source']
  };
}

/** Immutable patch for a selected daily goal: never manufacture or verify steps. */
export function updateDailyStepGoal(record: DailyStepRecord, goal: number): DailyStepRecord {
  if (!Number.isSafeInteger(goal) || goal <= 0 || goal > 100000)
    throw new Error('Invalid step goal');
  const current = validateDailyStepRecord(record);
  return { ...current, goal };
}

/** Never treat an unverified step count as a measured health result. */
export function dailyStepStatus(record: DailyStepRecord): {
  goal: number; observed: number | null; remaining: number | null; progressPercent: number | null;
} {
  const valid = validateDailyStepRecord(record);
  if (!valid.verified || valid.observed === null) {
    return { goal: valid.goal, observed: null, remaining: null, progressPercent: null };
  }
  return {
    goal: valid.goal,
    observed: valid.observed,
    remaining: Math.max(0, valid.goal - valid.observed),
    progressPercent: Math.min(100, Math.floor((valid.observed / valid.goal) * 100))
  };
}

/** Display only the selected measurement source; never mix camera and ESP32 readings. */
export type HealthReadingMode = 'CAMERA' | 'SENSOR';
export interface HealthReading {
  source: 'CAMERA' | 'SENSOR';
  verified: boolean;
  bpm: number | null;
}
export function selectedHealthReading(mode: HealthReadingMode, camera: HealthReading | null, sensor: HealthReading | null): HealthReading | null {
  if (mode !== 'CAMERA' && mode !== 'SENSOR') throw new Error('Invalid health mode');
  const reading = mode === 'CAMERA' ? camera : sensor;
  if (reading === null) return null;
  if (!reading || reading.source !== mode || typeof reading.verified !== 'boolean')
    throw new Error('Invalid health reading provenance');
  if (!reading.verified) {
    if (reading.bpm !== null) throw new Error('Unverified BPM must remain unknown');
    return { source: mode, verified: false, bpm: null };
  }
  if (typeof reading.bpm !== 'number' || !Number.isInteger(reading.bpm) || reading.bpm < 20 || reading.bpm > 250)
    throw new Error('Invalid measured BPM');
  return { source: mode, verified: true, bpm: reading.bpm };
}

/** A disconnected device must never be represented as a working live device. */
export type DeviceAvailability = 'HARDWARE_REQUIRED' | 'CONNECTED_UNVERIFIED' | 'LIVE_VERIFIED';
export function deviceAvailability(value: unknown): DeviceAvailability {
  if (!value || typeof value !== 'object') return 'HARDWARE_REQUIRED';
  const record = value as Record<string, unknown>;
  if (record.connected !== true) return 'HARDWARE_REQUIRED';
  if (record.verified !== true || record.acknowledged !== true) return 'CONNECTED_UNVERIFIED';
  return 'LIVE_VERIFIED';
}

/** Guard against a stale ACK from an earlier command being reused for a new action. */
export interface DeviceCommandReceipt {
  commandId: string;
  acknowledgedCommandId: string | null;
  connected: boolean;
  verified: boolean;
}
export function commandAcknowledged(receipt: DeviceCommandReceipt): boolean {
  if (!receipt || typeof receipt.commandId !== 'string' || !/^[A-Za-z0-9_-]{1,128}$/.test(receipt.commandId)) return false;
  return receipt.connected === true && receipt.verified === true &&
    receipt.acknowledgedCommandId === receipt.commandId;
}
