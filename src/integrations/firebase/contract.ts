// Additive contract only: existing Supabase integrations remain intact.
export const DWIJU_RTDB_PATHS = ['healthRecords','deviceTelemetry','deviceStatus','deviceCommands'] as const;
export type DwijuRtdbPath = typeof DWIJU_RTDB_PATHS[number];
export function userDataPath(path: DwijuRtdbPath, uid: string): string {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid)) throw new Error('Invalid user identity');
  return `${path}/${uid}`;
}
