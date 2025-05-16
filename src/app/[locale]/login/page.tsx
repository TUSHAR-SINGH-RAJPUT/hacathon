
import { getDictionary } from '@/lib/dictionaries';
import LoginPageContent from './LoginPageContent'; // Assuming LoginPageContent.tsx will be created

type Props = {
  params: { locale: string };
};

export default async function LoginPage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const t = dict.LoginPage || {}; // Pass specific translations for this page
  return <LoginPageContent t={t} locale={locale} />;
}
