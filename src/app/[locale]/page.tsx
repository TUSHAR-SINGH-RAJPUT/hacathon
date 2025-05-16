import { getDictionary } from '@/lib/dictionaries';
import LandingPageContent from './LandingPageContent'; // Client component

export default async function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  return <LandingPageContent dict={dict.LandingPage || {}} locale={locale} />;
}
