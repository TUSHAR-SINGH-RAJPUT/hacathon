
import { getDictionary } from '@/lib/dictionaries';
import SecurityPageContent from './SecurityPageContent';

type Props = {
  params: { locale: string };
};

export default async function SecurityPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.SecurityPage || {};
  return <SecurityPageContent t={t} locale={locale} />;
}
