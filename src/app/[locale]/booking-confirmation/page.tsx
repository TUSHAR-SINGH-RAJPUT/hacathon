
import { getDictionary } from '@/lib/dictionaries';
import BookingConfirmationPageContent from './BookingConfirmationPageContent';

type Props = {
  params: { locale: string };
};

export default async function BookingConfirmationPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.BookingConfirmationPage || {};
  return <BookingConfirmationPageContent t={t} locale={locale} />;
}
