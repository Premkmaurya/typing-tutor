/**
 * Unicode Grapheme Cluster Utilities for Hindi and English
 * Uses Intl.Segmenter with reliable fallback for grapheme boundary segmentation
 */

export function splitIntoGraphemes(text: string, locale: 'en' | 'hi' = 'hi'): string[] {
  if (!text) return [];

  // Use standard Intl.Segmenter if supported by browser environment
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new (Intl as any).Segmenter(locale, { granularity: 'grapheme' });
      const segments = segmenter.segment(text);
      return Array.from(segments, (s: any) => s.segment);
    } catch {
      // Fallback below
    }
  }

  // Regex fallback for Devanagari + Latin graphemes
  // Matches base consonants + Virama + combining marks + matras
  const devanagariGraphemeRegex = /[\u0900-\u097F][\u093E-\u094F\u0951-\u0957\u0962-\u0963]*|[\s\S]/gu;
  const matches = text.match(devanagariGraphemeRegex);
  return matches || Array.from(text);
}

/**
 * Check if a character is a Devanagari Combining Mark / Matra
 */
export function isDevanagariCombiningMark(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  // Halant (094D), Matras (093E-094C, 0962-0963), Anusvara/Visarga/Candrabindu (0901-0903), Nukta (093C)
  return (
    (code >= 0x0901 && code <= 0x0903) ||
    code === 0x093c ||
    (code >= 0x093e && code <= 0x094d) ||
    (code >= 0x0951 && code <= 0x0957) ||
    (code >= 0x0962 && code <= 0x0963)
  );
}

/**
 * Normalizes text to Unicode NFC (Canonical Composition)
 */
export function normalizeUnicode(text: string): string {
  return text.normalize('NFC');
}
