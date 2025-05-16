
import { getDictionary } from '@/lib/dictionaries';
import FeedbackPageContent from './FeedbackPageContent';

type Props = {
  params: { locale: string };
};

export default async function FeedbackPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.FeedbackPage || {};
  return <FeedbackPageContent t={t} locale={locale} />;
}
