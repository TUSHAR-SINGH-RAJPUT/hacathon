import { getDictionary } from '@/lib/dictionaries';
import SignUpPageContent from './SignUpPageContent';

export default async function SignUpPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  return <SignUpPageContent t={dict.SignUpPage || {}} locale={locale} />;
}
