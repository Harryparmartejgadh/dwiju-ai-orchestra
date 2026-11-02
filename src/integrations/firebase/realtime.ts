/**
 * Additive Firebase Realtime Database integration.
 * Existing Supabase clients and routes remain unchanged.
 * Install firebase SDK before importing this module.
 */
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref, type Unsubscribe } from 'firebase/database';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function watchFirebaseAuth(onUser: (uid: string | null) => void): Unsubscribe {
  const { auth } = services();
  return onAuthStateChanged(auth, user => onUser(user?.uid ?? null));
}
export async function firebaseSignIn(email: string, password: string): Promise<void> {
  const { auth } = services();
  await signInWithEmailAndPassword(auth, email, password);
}
export async function firebaseSignOut(): Promise<void> {
  const { auth } = services();
  await signOut(auth);
}
export function firebaseConfigured(): boolean {
  return Object.values(config).every(value => typeof value === 'string' && value.trim().length > 0) && config.projectId === 'bhilodiya-health-robo';
}

function services() {
  if (!firebaseConfigured()) throw new Error('Firebase is not configured; no live sync is available');
  const existing = getApps().find(app => app.name === 'dwiju-firebase');
  if (existing && (existing.options.projectId !== config.projectId ||
      existing.options.databaseURL !== config.databaseURL ||
      existing.options.appId !== config.appId)) {
    throw new Error('Dwiju Firebase app configuration mismatch');
  }
  const app = existing ?? initializeApp(config, 'dwiju-firebase');
  return { auth: getAuth(app), db: getDatabase(app) };
}

/** Production rules allow only a trusted deviceGateway to write deviceStatus.
 * Browsers must never write or fabricate physical device state.
 */
export function watchUserDeviceStatus(deviceId: string, onData: (data: unknown) => void, onError: (error: Error) => void): Unsubscribe {
  const { auth, db } = services();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Firebase authentication required');
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(deviceId)) throw new Error('Invalid device ID');
  return onValue(ref(db, `deviceStatus/${uid}/${deviceId}`), snap => onData(snap.val()), onError);
}

/**
 * Read-only health, device telemetry and command views.
 * Writes to these paths require a trusted backend/device gateway;
 * the browser must never fabricate sensor measurements or ACKs.
 */
export type DwijuReadOnlyCollection = 'healthRecords' | 'deviceTelemetry' | 'deviceCommands';
export function watchUserReadOnlyCollection(
  collection: DwijuReadOnlyCollection,
  recordId: string,
  onData: (data: unknown) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const { auth, db } = services();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Firebase authentication required');
  if (!['healthRecords', 'deviceTelemetry', 'deviceCommands'].includes(collection)) {
    throw new Error('Invalid Firebase collection');
  }
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(recordId)) throw new Error('Invalid record ID');
  return onValue(ref(db, `${collection}/${uid}/${recordId}`), snap => onData(snap.val()), onError);
}

/** Read authenticated root-level production collections without inventing a record ID. */
export type DwijuProductionCollection = DwijuReadOnlyCollection | 'projectRecords' | 'deviceStatus';
export function watchUserProductionCollection(
  collection: DwijuProductionCollection,
  onData: (data: unknown) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const { auth, db } = services();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Firebase authentication required');
  if (!['healthRecords', 'deviceTelemetry', 'deviceCommands', 'projectRecords', 'deviceStatus'].includes(collection)) {
    throw new Error('Invalid Firebase collection');
  }
  return onValue(ref(db, `${collection}/${uid}`), snap => onData(snap.val()), onError);
}
