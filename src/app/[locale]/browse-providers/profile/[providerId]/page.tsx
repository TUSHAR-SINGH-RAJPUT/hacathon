import { getDictionary } from '@/lib/dictionaries';
import ProviderProfilePageContent from './ProviderProfilePageContent';

export default async function ProviderProfilePage({ params: { locale, providerId } }: { params: { locale: string, providerId: string } }) {
  const dict = await getDictionary(locale);
  // Assuming you'll have a ProviderProfilePage section in your common.json
  const t = dict.ProviderProfilePage || {}; 
  
  return <ProviderProfilePageContent t={t} locale={locale} providerId={providerId} />;
}
