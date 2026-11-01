# Dwiju Firebase Realtime integration (additive)

This branch does not remove Supabase or MongoDB. The new client is opt-in; it is **not** evidence of production parity.

## Configuration
Install the Firebase JS SDK with `npm install firebase` (commit lockfile changes), and supply Vite environment values:
`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_DATABASE_URL`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`.
Never commit service account keys or user credentials.

## Security
Deploy `firebase.database.rules.json` only after reviewing existing production rules; replacing them could remove old authorized paths. New data is scoped to `users/{auth.uid}/deviceStatus/{deviceId}`.
A logged-in user's token must be checked in Firebase Authentication before any write.
Untrusted sensor data is not a medical diagnosis. This helper does not claim physical device ACK.

## Verification gates
1. Build and lint with Firebase SDK installed; test Firebase Emulator Suite.
2. Check authenticated write/read/subscription and denied unauthenticated/cross-user access.
3. Verify website, web app and Android use the same Firebase project, database paths and schema.
4. Verify actual production read/write on an isolated test device, then clean up.
5. Confirm legacy Supabase and MongoDB paths still function before merging.
