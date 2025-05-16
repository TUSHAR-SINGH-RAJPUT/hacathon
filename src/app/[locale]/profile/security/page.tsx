import { getDictionary } from '@/lib/dictionaries';
import SecurityPageContent from './SecurityPageContent';

export default async function SecurityPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.SecurityPage || {}; 

  return <SecurityPageContent t={t} locale={locale} />;
}
