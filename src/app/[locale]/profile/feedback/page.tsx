import { getDictionary } from '@/lib/dictionaries';
import FeedbackPageContent from './FeedbackPageContent';

export default async function FeedbackPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.FeedbackPage || {}; 

  return <FeedbackPageContent t={t} locale={locale} />;
}
