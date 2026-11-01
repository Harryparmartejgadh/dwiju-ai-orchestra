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
