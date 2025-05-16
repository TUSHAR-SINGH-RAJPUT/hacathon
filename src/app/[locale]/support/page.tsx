import { getDictionary } from '@/lib/dictionaries';
import SupportPageContent from './SupportPageContent';

export default async function SupportPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.SupportPage || {}; 

  return <SupportPageContent t={t} locale={locale} />;
}
