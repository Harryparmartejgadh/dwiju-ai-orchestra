import test from 'node:test';
import assert from 'node:assert/strict';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { ref, set, get } from 'firebase/database';
const projectId='dwiju-rules-ci';
let env;
test.before(async()=>{
 env=await initializeTestEnvironment({projectId,database:{rules:readFileSync('firebase/database.rules.json','utf8')}});
});
test.after(async()=>{if(env)await env.cleanup();});
test('RTDB blocks unauthenticated reads and writes',async()=>{
 const db=env.unauthenticatedContext().database();
 await assertFails(get(ref(db,'healthRecords/alice')));
 await assertFails(set(ref(db,'healthRecords/alice'),{bpm:70}));
});
test('RTDB permits own data but denies another user',async()=>{
 const alice=env.authenticatedContext('alice').database();
 const bob=env.authenticatedContext('bob').database();
 await assertSucceeds(set(ref(alice,'healthRecords/alice'),{bpm:70}));
 const snapshot=await assertSucceeds(get(ref(alice,'healthRecords/alice')));
 assert.equal(snapshot.val().bpm,70);
 await assertFails(get(ref(bob,'healthRecords/alice')));
 await assertFails(set(ref(bob,'healthRecords/alice'),{bpm:75}));
});
test('all shared paths isolate users',async()=>{
 const alice=env.authenticatedContext('alice').database();
 const bob=env.authenticatedContext('bob').database();
 for(const key of ['deviceTelemetry','deviceStatus','deviceCommands']){
  await assertSucceeds(set(ref(alice,key+'/alice'),{value:1}));
  await assertFails(get(ref(bob,key+'/alice')));
 }
});

test('web and Android clients share identical authenticated RTDB paths',async()=>{
 const web=env.authenticatedContext('shared-user').database();
 const android=env.authenticatedContext('shared-user').database();
 for(const key of ['healthRecords','deviceTelemetry','deviceStatus','deviceCommands']){
  const path=key+'/shared-user';
  await assertSucceeds(set(ref(web,path),{source:'web',revision:1}));
  assert.equal((await assertSucceeds(get(ref(android,path)))).val().revision,1);
  await assertSucceeds(set(ref(android,path),{source:'android',revision:2}));
  assert.equal((await assertSucceeds(get(ref(web,path)))).val().revision,2);
 }
});

test('device command queue and telemetry remain owner scoped without inventing ACK',async()=>{
 const owner=env.authenticatedContext('operator-1').database();
 const outsider=env.authenticatedContext('operator-2').database();
 const commandPath='deviceCommands/operator-1/pump-T1';
 const telemetryPath='deviceTelemetry/operator-1/pump-T1';
 await assertSucceeds(set(ref(owner,commandPath),{id:'pump-T1',action:'START',status:'PENDING',requestedAt:100}));
 const pending=(await assertSucceeds(get(ref(owner,commandPath)))).val();
 assert.equal(pending.status,'PENDING');
 assert.equal(pending.acknowledgedAt,undefined);
 await assertFails(get(ref(outsider,commandPath)));
 await assertFails(set(ref(outsider,commandPath),{status:'ACKNOWLEDGED'}));
 await assertSucceeds(set(ref(owner,telemetryPath),{connected:false,verified:false}));
 assert.equal((await assertSucceeds(get(ref(owner,telemetryPath)))).val().verified,false);
 await assertFails(get(ref(outsider,telemetryPath)));
});
