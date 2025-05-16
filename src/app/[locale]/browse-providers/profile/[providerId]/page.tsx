
import { getDictionary } from '@/lib/dictionaries';
import ProviderProfilePageContent from './ProviderProfilePageContent';

export default async function ProviderProfilePage({ params: { locale, providerId } }: { params: { locale: string, providerId: string } }) {
  const dict = await getDictionary(locale);
  const tProfilePage = dict.ProviderProfilePage || {}; 
  const tProviderCard = dict.ProviderCard || {}; // For recommended provider cards
  
  return <ProviderProfilePageContent tProfilePage={tProfilePage} tProviderCard={tProviderCard} locale={locale} providerId={providerId} />;
}

    