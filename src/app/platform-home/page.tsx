// @ts-nocheck
// This file is now a Server Component
import { getDictionary } from '@/lib/dictionaries';
import PlatformHomeContent from './PlatformHomeContent'; // Import the new client component

type Props = {
  params: { locale: string }; // Changed Locale to string
};

export default async function PlatformHomePage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  return <PlatformHomeContent dict={dict} locale={locale} />;
}
