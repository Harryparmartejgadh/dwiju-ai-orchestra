import test from 'node:test';
import assert from 'node:assert/strict';
import { offlineAnswer, DWJ_GU_GREETING } from '../src/lib/offlineAssistant.ts';

test('Dwiju identity answers use the requested language and exact Gujarati greeting', () => {
  assert.equal(offlineAnswer('તમારું નામ શું છે?', 'en-US')?.answer, DWJ_GU_GREETING);
  assert.match(offlineAnswer('आप कौन हैं?', 'gu-IN')?.answer ?? '', /मेरा नाम द्विजु है/);
  assert.match(offlineAnswer('Who are you?', 'en-US')?.answer ?? '', /My name is Dwiju/);
});

test('catalog counts are labeled as catalog data, not live executions', () => {
  const reply = offlineAnswer('total features and benefits?', 'en-US')?.answer ?? '';
  assert.match(reply, /4,410 features/);
  assert.match(reply, /not live workflow counts/);
});

test('offline health and step answers do not invent measured values', () => {
  assert.match(offlineAnswer('મારા પગલાં કેટલા છે?', 'gu-IN')?.answer ?? '', /baseline/);
  assert.match(offlineAnswer('Camera PPG health reading', 'en-US')?.answer ?? '', /not a medical diagnosis/);
});

test('robotics guidance requires a matching ACK and never issues an offline command', () => {
  assert.match(offlineAnswer('robot hardware status?', 'en-US')?.answer ?? '', /matching device ACK/);
  assert.equal(offlineAnswer('turn on the pump', 'en-US'), null);
});

test('unsupported questions are handed to the configured online AI instead of guessed', () => {
  assert.equal(offlineAnswer('write a poem about rain', 'en-US'), null);
});
