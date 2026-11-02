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

test('health camera and sensor readings are isolated by source without inventing medical data',async()=>{
 const owner=env.authenticatedContext('health-user').database();
 const outsider=env.authenticatedContext('another-user').database();
 const camera='healthRecords/health-user/camera';
 const sensor='healthRecords/health-user/sensor';
 await assertSucceeds(set(ref(owner,camera),{source:'camera',verified:false,status:'UNVERIFIED',capturedAt:100}));
 await assertSucceeds(set(ref(owner,sensor),{source:'sensor',verified:false,status:'HARDWARE_REQUIRED',capturedAt:101}));
 const cameraReading=(await assertSucceeds(get(ref(owner,camera)))).val();
 const sensorReading=(await assertSucceeds(get(ref(owner,sensor)))).val();
 assert.equal(cameraReading.source,'camera');
 assert.equal(sensorReading.source,'sensor');
 assert.equal(cameraReading.bpm,undefined);
 assert.equal(sensorReading.bpm,undefined);
 assert.equal(sensorReading.status,'HARDWARE_REQUIRED');
 await assertFails(get(ref(outsider,camera)));
 await assertFails(get(ref(outsider,sensor)));
});
test('robot emergency commands remain pending without hardware acknowledgement',async()=>{
 const owner=env.authenticatedContext('robot-user').database();
 const path='deviceCommands/robot-user/emergency-stop';
 await assertSucceeds(set(ref(owner,path),{action:'EMERGENCY_STOP',status:'PENDING',requestedAt:200,hardwareRequired:true}));
 const cmd=(await assertSucceeds(get(ref(owner,path)))).val();
 assert.equal(cmd.action,'EMERGENCY_STOP');
 assert.equal(cmd.status,'PENDING');
 assert.equal(cmd.acknowledgedAt,undefined);
 assert.equal(cmd.hardwareRequired,true);
});

test('step-goal records are owner-scoped and preserve goal versus observed steps',async()=>{
 const owner=env.authenticatedContext('walker').database();
 const outsider=env.authenticatedContext('other-walker').database();
 const path='healthRecords/walker/dailySteps/2026-11-02';
 await assertSucceeds(set(ref(owner,path),{goal:8000,observed:0,source:'NOT_CONNECTED',verified:false}));
 const record=(await assertSucceeds(get(ref(owner,path)))).val();
 assert.equal(record.goal,8000);
 assert.equal(record.observed,0);
 assert.equal(record.verified,false);
 await assertFails(get(ref(outsider,path)));
 await assertFails(set(ref(outsider,path),{goal:1000,observed:99999,verified:true}));
});
