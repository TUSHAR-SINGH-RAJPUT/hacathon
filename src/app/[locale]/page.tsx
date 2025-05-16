import { getDictionary } from '@/lib/dictionaries';
import LandingPageContent from './LandingPageContent'; // Separate client component

type Props = {
  params: { locale: string };
};

export default async function LandingPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  
  return <LandingPageContent dict={dict} locale={locale} />;
}
