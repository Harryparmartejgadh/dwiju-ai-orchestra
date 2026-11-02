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
