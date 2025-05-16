import { getDictionary } from '@/lib/dictionaries';
import LoginPageContent from './LoginPageContent';

export default async function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  return <LoginPageContent t={dict.LoginPage || {}} locale={locale} />;
}
