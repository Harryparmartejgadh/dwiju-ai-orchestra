import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const page = readFileSync('src/pages/Index.tsx','utf8');
const chat = readFileSync('src/components/ChatInterface.tsx','utf8');
const edge = readFileSync('supabase/functions/chat/index.ts','utf8');
const cardBlocks = [...page.matchAll(/<FeatureCard\b[\s\S]*?\btitle="([^"]+)"[\s\S]*?\bfeatures=\{\[([\s\S]*?)\]\}/g)];
const rows = [];
for (const [index, match] of cardBlocks.entries()) {
 const title = match[1];
 const bullets = [...match[2].matchAll(/"([^"]+)"/g)].map(x=>x[1]);
 rows.push({id:'ora-card-'+String(index+1).padStart(3,'0'),name:title,source:'src/pages/Index.tsx',masterFeatureId:null,masterTraceability:'SOURCE_MISSING',status:'NOT_IMPLEMENTED',reason:'Presentation card routes Demo to general chat; no feature-specific runtime handler proven',bullets});
}
const evidence = {
 schemaVersion:1,
 sourceRevision:process.env.GITHUB_SHA || 'local-checkout',
 claimedOraFeatures:670,
 claimVerified:false,
 cardCount:rows.length,
 cardBulletCount:rows.reduce((n,x)=>n+x.bullets.length,0),
 chatModeCount:4,
 chatModes:['chat','image','video','music'],
 runtimeEvidence:{
  chat:chat.includes('supabase.functions.invoke("chat"') && edge.includes('ai.gateway.lovable.dev')?'PARTIAL':'SOURCE_MISSING',
  image:edge.includes('gemini-2.5-flash-image-preview')?'PARTIAL':'SOURCE_MISSING',
  vision:chat.includes('captureFromCamera') && edge.includes('image_url')?'PARTIAL':'SOURCE_MISSING',
  voice:chat.includes('webkitSpeechRecognition') && chat.includes('speechSynthesis')?'PARTIAL':'SOURCE_MISSING',
  video:'NOT_IMPLEMENTED',
  music:'NOT_IMPLEMENTED',
  automation:'SOURCE_MISSING',
  firebaseLiveParity:'SOURCE_MISSING'
 },
 cards:rows
};
assert.equal(rows.length,66,'ORA presentation card count changed; inspect source and update audit');
assert.equal(evidence.cardBulletCount,264,'ORA bullet count changed; inspect source and update audit');
assert.equal(new Set(rows.map(x=>x.name)).size,rows.length,'Duplicate card titles require review');
assert.ok(edge.includes('real-time video generation') && edge.includes('real-time music generation'),'Unimplemented media mode disclosures changed');
mkdirSync('audit',{recursive:true});
writeFileSync('audit/ora-source-evidence.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({cards:rows.length,bullets:evidence.cardBulletCount,verifiedRegistry:false,workingClaimed:0,modeEvidence:evidence.runtimeEvidence}));
