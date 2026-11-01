import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
const source=readFileSync('src/lib/oraSpeech.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {normalizeOraSpeech,oraSpeechLanguage}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
test('ORA speech removes markdown symbols without deleting Gujarati words',()=>{
 assert.equal(normalizeOraSpeech('**નમસ્તે** #દ્વિજુ'), 'નમસ્તે દ્વિજુ');
});
test('ORA voice follows response script',()=>{
 assert.equal(oraSpeechLanguage('નમસ્તે'),'gu-IN');
 assert.equal(oraSpeechLanguage('नमस्ते'),'hi-IN');
 assert.equal(oraSpeechLanguage('Hello'),'en-IN');
});
