import { getDictionary } from '@/lib/dictionaries';
import PlatformHomeContent from './PlatformHomeContent'; // Client component

export default async function PlatformHomePage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  return <PlatformHomeContent dict={dict.PlatformHomePage || {}} locale={locale} />;
}
