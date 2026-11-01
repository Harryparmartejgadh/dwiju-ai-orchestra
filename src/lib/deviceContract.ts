export const DEVICE_PATHS = ['healthRecords', 'deviceTelemetry', 'deviceStatus', 'deviceCommands'] as const;
export type HealthSource = 'camera' | 'sensor';
export type DeviceCommandStatus = 'PENDING' | 'ACKNOWLEDGED' | 'FAILED' | 'HARDWARE_REQUIRED';
export interface DeviceCommand {
  id: string;
  deviceId: string;
  action: string;
  status: DeviceCommandStatus;
  requestedAt: number;
  acknowledgedAt?: number;
  telemetryId?: string;
}
export interface HealthReading {
  source: HealthSource;
  capturedAt: number;
  bpm?: number;
  temperatureC?: number;
  ecgSamples?: number[];
  verified: boolean;
}
export function selectHealthReading(mode: HealthSource, readings: readonly HealthReading[]): HealthReading | null {
  const candidates = readings.filter(r => r.source === mode && r.verified && Number.isFinite(r.capturedAt));
  if (!candidates.length) return null;
  return candidates.reduce((a,b) => b.capturedAt > a.capturedAt ? b : a);
}
export function commandIsAcknowledged(command: DeviceCommand): boolean {
  return command.status === 'ACKNOWLEDGED' &&
    Number.isFinite(command.acknowledgedAt) &&
    command.acknowledgedAt! >= command.requestedAt &&
    typeof command.telemetryId === 'string' && command.telemetryId.length > 0;
}
export function userDevicePath(collection: typeof DEVICE_PATHS[number], uid: string): string {
  if (!DEVICE_PATHS.includes(collection) || !/^[A-Za-z0-9_-]{1,128}$/.test(uid))
    throw new Error('Invalid device path or owner');
  return collection + '/' + uid;
}
