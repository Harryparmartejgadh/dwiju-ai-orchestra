# Production RTDB no-loss integration — 2026-11-02

Verified from owner-provided Firebase Console Rules screenshot (not an API export):

- Existing production root: `.read=false`, `.write=false`.
- Production collections are **root-level** `users/$uid`, `healthRecords/$uid`, `deviceTelemetry/$uid`, `deviceStatus/$uid`, `deviceCommands/$uid`, `projectRecords/$uid`; **not** `users/$uid/<collection>`.
- `deviceTelemetry` and `deviceStatus` writes require `auth.token.deviceGateway === true`.
- `deviceCommands/$uid/$commandId` has existing status/source validation and conditional writes; retain all conditions.
- `projectRecords` write requires verified email; existing indexes and legacy records must be preserved.
- Browser must not write deviceStatus, telemetry or device ACK; web integration is read-only for these paths.

**STOP: DO NOT DEPLOY `firebase.database.rules.json` TO PRODUCTION.**
That file is an isolated emulator test fixture from the earlier proposed namespace and does **not** represent the complete production rules. Replacing production rules with it would remove existing root-level namespaces and validation. The source-of-truth production rules must be exported/copied completely, backed up, merged preserving all legacy permissions, tested in emulator, then explicitly approved before deploy.

No production deploy, Firebase rules mutation, or user data migration has been performed by these commits.
