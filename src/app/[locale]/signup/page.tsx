
import { getDictionary } from '@/lib/dictionaries';
import SignUpPageContent from './SignUpPageContent';

type Props = {
  params: { locale: string };
};

export default async function SignUpPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.SignUpPage || {};
  return <SignUpPageContent t={t} locale={locale} />;
}
