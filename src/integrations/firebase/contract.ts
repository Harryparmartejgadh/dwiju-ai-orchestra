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
