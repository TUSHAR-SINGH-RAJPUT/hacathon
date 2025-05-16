// src/lib/dictionaries.ts
import 'server-only';

// Define a type for the dictionary structure if it becomes complex.
// For now, 'any' is used for simplicity.
const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  hi: () => import('@/locales/hi/common.json').then((module) => module.default),
  kn: () => import('@/locales/kn/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const lowerLocale = locale.toLowerCase();
  if (dictionaries[lowerLocale]) {
    try {
      return await dictionaries[lowerLocale]();
    } catch (error) {
      console.warn(`Could not load dictionary for locale: ${lowerLocale}. Falling back to 'en'.`, error);
      return dictionaries.en(); // Fallback to English if specific locale fails
    }
  }
  console.warn(`Dictionary for locale "${lowerLocale}" not found. Falling back to "en".`);
  return dictionaries.en(); // Fallback to English if locale doesn't exist
};
