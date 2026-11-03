import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const rules=JSON.parse(readFileSync('firebase/database.rules.json','utf8')).rules;
assert.equal(rules['.read'],false);
assert.equal(rules['.write'],false);
for(const key of ['healthRecords','deviceTelemetry','deviceStatus','deviceCommands']){
 assert.ok(rules[key]?.$uid?.['.read'].includes('auth.uid === $uid'));
 assert.ok(rules[key]?.$uid?.['.write'].includes('auth.uid === $uid'));
}
console.log('Firebase contract rules structural checks passed');
