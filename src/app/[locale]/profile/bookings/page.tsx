import { getDictionary } from '@/lib/dictionaries';
import MyBookingsPageContent from './MyBookingsPageContent';

export default async function MyBookingsPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.MyBookingsPage || {}; 

  return <MyBookingsPageContent t={t} locale={locale} />;
}
