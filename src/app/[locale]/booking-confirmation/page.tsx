import { getDictionary } from '@/lib/dictionaries';
import BookingConfirmationPageContent from './BookingConfirmationPageContent';

export default async function BookingConfirmationPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.BookingConfirmationPage || {}; 

  return <BookingConfirmationPageContent t={t} locale={locale} />;
}
