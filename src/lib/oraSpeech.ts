export function normalizeOraSpeech(text: string): string {
  return text.replace(/[*#_`]/g, '').replace(/\s+/g, ' ').trim();
}
export function oraSpeechLanguage(text: string): 'gu-IN' | 'hi-IN' | 'en-IN' {
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN';
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
  return 'en-IN';
}

/** Explicit Gujarati default for the Dwiju assistant, independent of Latin words. */
export const DWIJU_GREETING = 'નમસ્તે મારું નામ દ્વિજુ છે, મારો શોધક હરીશભાઈ પરમાર છે અને ભીલોડીયા પ્રાથમિકશાળાનો હું AI સહાયક છું.';
export function oraReplyLanguage(requested: 'auto' | 'gu-IN' | 'hi-IN' | 'en-IN', input: string): 'gu-IN' | 'hi-IN' | 'en-IN' {
  if (requested !== 'auto') return requested;
  if (/[\u0A80-\u0AFF]/.test(input)) return 'gu-IN';
  if (/[\u0900-\u097F]/.test(input)) return 'hi-IN';
  return 'gu-IN';
}
