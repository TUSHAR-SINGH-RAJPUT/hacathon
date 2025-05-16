// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file

// This file is now a Server Component
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/../next.config';
import LandingPageContent from './LandingPageContent'; // Import the new client component

type Props = {
  params: { locale: Locale };
};

export default async function LandingPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return <LandingPageContent dict={dict} locale={locale} />;
}
