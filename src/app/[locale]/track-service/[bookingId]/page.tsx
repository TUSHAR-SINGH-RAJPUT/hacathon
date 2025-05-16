import { getDictionary } from '@/lib/dictionaries';
import TrackServicePageContent from './TrackServicePageContent';

export default async function TrackServicePage({ params: { locale, bookingId } }: { params: { locale: string, bookingId: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.TrackServicePage || {};

  return <TrackServicePageContent t={t} locale={locale} bookingId={bookingId} />;
}
