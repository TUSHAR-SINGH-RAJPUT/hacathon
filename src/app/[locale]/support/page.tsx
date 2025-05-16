
import { getDictionary } from '@/lib/dictionaries';
import SupportPageContent from './SupportPageContent';

type Props = {
  params: { locale: string };
};

export default async function SupportPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.SupportPage || {};
  const faqItems = dict.SupportPage?.faqItems || [
    { question: "How do I post a job?", answer: "Navigate to the 'Post a Job' page from the header. Fill in the details..." },
    { question: "How do I find a service provider?", answer: "Go to the 'Browse Services' page. You can search by keywords..." },
  ]; // Ensure faqItems are also passed
  return <SupportPageContent t={t} locale={locale} faqItems={faqItems} />;
}
