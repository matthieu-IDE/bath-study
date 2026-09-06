import { build } from 'esbuild';
import assert from 'node:assert/strict';
import katex from 'katex';
const result = await build({stdin:{contents:"export * from './src/data/masterclass/index'; export * from './src/data/masterclass/notation'; export * from './src/engine/pageReview'; export * from './src/data/pageNotes';", resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',write:false});
const data=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const {PAGE_LESSONS,NOTATION,PAGE_NOTES,schedulePage,readPageReviews}=data;
assert.equal(Object.keys(PAGE_LESSONS).length,98);
let equations=0;
function checkText(text,label) {
  assert.equal(/[\u0000-\u0008\u000b-\u001f]/.test(text),false,label+' contains a control character');
  for (const match of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]+)\$/g)) {
    katex.renderToString(match[1]??match[2],{throwOnError:true,strict:false});equations++;
  }
}
for(let page=1;page<=98;page++) {
  const l=PAGE_LESSONS[page];assert.ok(l,'missing '+page);
  assert.ok(l.reasoning.length>=2 && l.solution.length>=3,'incomplete '+page);
  for(const [key,value] of Object.entries(l)) for(const s of Array.isArray(value)?value:[value]) if(typeof s==='string') checkText(s,page+':'+key);
  if(page>=7) assert.ok(PAGE_NOTES[page]?.length,'missing notes '+page);
}
for(const n of NOTATION){katex.renderToString(n.symbol,{throwOnError:true});checkText(n.example,n.name);}
const now=1700000000000;
let review=schedulePage(undefined,7,'again','my reasoning',now);
assert.equal(review.due-now,600000);
review=schedulePage(review,7,'good','recalled',now);
assert.equal(review.interval,1);
review=schedulePage(review,7,'good','recalled',now);
assert.equal(review.interval,3);
review=schedulePage(review,7,'good','recalled',now);
assert.equal(review.interval,8);
for(let i=0;i<10;i++)review=schedulePage(review,7,'good','recalled',now);
assert.equal(review.interval,30);
assert.deepEqual(readPageReviews('corrupt'),{});
assert.deepEqual(readPageReviews('[]'),{});
assert.deepEqual(readPageReviews('{"7":{"page":7}}'),{});
assert.deepEqual(readPageReviews(JSON.stringify({7:review})),{7:review});
assert.equal(schedulePage(review,7,'hard','',now).interval,1);
console.log('PASS: 98 complete page lessons; '+equations+' equations; notation; review intervals, cap and malformed storage.');
