import { getDictionary } from '@/lib/dictionaries';
import PlatformHomeContent from './PlatformHomeContent'; // Separate client component

type Props = {
  params: { locale: string };
};

export default async function PlatformHomePage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  
  return <PlatformHomeContent dict={dict.PlatformHome} locale={locale} />;
}
