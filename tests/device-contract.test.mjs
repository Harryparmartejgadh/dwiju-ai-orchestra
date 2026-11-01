import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
const source=readFileSync('src/lib/deviceContract.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {selectHealthReading,commandIsAcknowledged,userDevicePath}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
test('camera mode never shows sensor readings and vice versa',()=>{
 const readings=[{source:'sensor',capturedAt:100,bpm:70,verified:true},{source:'camera',capturedAt:200,bpm:80,verified:true}];
 assert.equal(selectHealthReading('camera',readings).bpm,80);
 assert.equal(selectHealthReading('sensor',readings).bpm,70);
 assert.equal(selectHealthReading('camera',[readings[0]]),null);
});
test('unverified readings are not presented as real sensor data',()=>{
 assert.equal(selectHealthReading('sensor',[{source:'sensor',capturedAt:1,bpm:70,verified:false}]),null);
});
test('queued commands never count as physical success',()=>{
 const cmd={id:'c1',deviceId:'pump1',action:'START',status:'PENDING',requestedAt:100};
 assert.equal(commandIsAcknowledged(cmd),false);
 assert.equal(commandIsAcknowledged({...cmd,status:'ACKNOWLEDGED',acknowledgedAt:101}),false);
 assert.equal(commandIsAcknowledged({...cmd,status:'ACKNOWLEDGED',acknowledgedAt:101,telemetryId:'t1'}),true);
 assert.equal(commandIsAcknowledged({...cmd,status:'HARDWARE_REQUIRED'}),false);
});
test('owner scoped device paths reject traversal',()=>{
 assert.equal(userDevicePath('deviceCommands','user_1'),'deviceCommands/user_1');
 assert.throws(()=>userDevicePath('deviceCommands','../admin'));
});
