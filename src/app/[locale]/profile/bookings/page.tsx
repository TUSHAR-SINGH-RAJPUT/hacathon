
import { getDictionary } from '@/lib/dictionaries';
import MyBookingsPageContent from './MyBookingsPageContent';

type Props = {
  params: { locale: string };
};

export default async function MyBookingsPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.MyBookingsPage || {};
  return <MyBookingsPageContent t={t} locale={locale} />;
}
