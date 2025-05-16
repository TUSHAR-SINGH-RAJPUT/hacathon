// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
// src/lib/dictionaries.ts
import 'server-only';

const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  hi: () => import('@/locales/hi/common.json').then((module) => module.default),
  kn: () => import('@/locales/kn/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
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
