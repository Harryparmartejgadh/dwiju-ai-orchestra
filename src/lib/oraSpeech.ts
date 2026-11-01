export function normalizeOraSpeech(text: string): string {
  return text.replace(/[*#_`]/g, '').replace(/\s+/g, ' ').trim();
}
export function oraSpeechLanguage(text: string): 'gu-IN' | 'hi-IN' | 'en-IN' {
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN';
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
  return 'en-IN';
}
