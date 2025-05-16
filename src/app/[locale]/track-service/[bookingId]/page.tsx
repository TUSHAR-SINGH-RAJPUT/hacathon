
import { getDictionary } from '@/lib/dictionaries';
import TrackServicePageContent from './TrackServicePageContent';

type Props = {
  params: { locale: string; bookingId: string };
};

export default async function TrackServicePage({ params }: Props) {
  const { locale, bookingId } = params;
  const dict = await getDictionary(locale);
  const t = dict.TrackServicePage || {};
  return <TrackServicePageContent t={t} locale={locale} bookingId={bookingId} />;
}
