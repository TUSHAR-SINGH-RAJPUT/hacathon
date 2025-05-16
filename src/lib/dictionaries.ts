// src/lib/dictionaries.ts
import 'server-only';

// Define a type for the dictionary structure if it becomes complex.
// For now, 'any' is used for simplicity.
type Dictionary = Record<string, any>;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  kn: () => import('@/locales/kn/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const loadDictionary = dictionaries[locale] || dictionaries.en;
  if (!dictionaries[locale]) {
    console.warn(`Dictionary for locale "${locale}" not found, falling back to "en".`);
  }
  try {
    return await loadDictionary();
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error);
    // Fallback to English dictionary in case of error
    return await dictionaries.en();
  }
};
