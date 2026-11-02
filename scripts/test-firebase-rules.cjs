const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const fs = require('node:fs');
(async () => {
  const env = await initializeTestEnvironment({
    projectId: 'demo-dwiju-rules',
    database: { rules: fs.readFileSync('firebase.database.rules.json', 'utf8') }
  });
  try {
    const a = env.authenticatedContext('userA').database();
    const b = env.authenticatedContext('userB').database();
    const guest = env.unauthenticatedContext().database();
    await assertSucceeds(a.ref('users/userA/deviceStatus/test').set({ status: 'ok' }));
    await assertSucceeds(a.ref('users/userA/deviceStatus/test').once('value'));
    await assertFails(b.ref('users/userA/deviceStatus/test').once('value'));
    await assertFails(b.ref('users/userA/deviceStatus/test').set({ status: 'tampered' }));
    await assertFails(guest.ref('users/userA/deviceStatus/test').once('value'));
    await assertFails(guest.ref('users/userA/deviceStatus/test').set({ status: 'tampered' }));
    for (const collection of ['healthRecords', 'deviceTelemetry', 'deviceCommands']) {
      await assertFails(a.ref('users/userA/' + collection + '/test').set({ forged: true }));
      await assertFails(b.ref('users/userA/' + collection).once('value'));
      await assertFails(guest.ref('users/userA/' + collection).once('value'));
      await assertSucceeds(a.ref('users/userA/' + collection).once('value'));
    }
    await assertFails(a.ref('users/userA').once('value'));
    // Prevent users from accessing other namespaces or changing the root.
    await assertFails(a.ref('users/userB/deviceStatus/test').set({ status: 'forged' }));
    await assertFails(a.ref('users/userA/ora/private').once('value'));
    await assertFails(a.ref('users/userA/ora/private').set({ enabled: true }));
    await assertFails(a.ref('users/userA/deviceStatus').set(null));
    await assertFails(guest.ref('/').once('value'));
    await assertFails(a.ref('/').set({ users: {} }));
    console.log('Firebase RTDB security isolation and path scope: PASS');
  } finally { await env.cleanup(); }
})().catch(err => { console.error(err); process.exitCode = 1; });
