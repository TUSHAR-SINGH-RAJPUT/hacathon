
import { getDictionary } from '@/lib/dictionaries';
import ProviderProfilePageContent from './ProviderProfilePageContent';
import type { ServiceProvider } from '@/types'; // Import ServiceProvider for dummy data check
import { dummyProviders } from '@/components/providers/dummyData'; // Import dummyProviders

type Props = {
  params: { locale: string; providerId: string };
};

// Helper to generate static params for all provider profiles and locales
export async function generateStaticParams() {
  const locales = ['en', 'kn']; // Or dynamically get from i18n config if available
  const providerIds = dummyProviders.map(provider => provider.id);
  
  const params = [];
  for (const locale of locales) {
    for (const providerId of providerIds) {
      params.push({ locale, providerId });
    }
  }
  return params;
}


export default async function ProviderProfilePage({ params }: Props) {
  const { locale, providerId } = params;
  const dict = await getDictionary(locale);
  const t = dict.ProviderProfilePage || {};
  
  // Optionally, fetch provider data here if it were dynamic
  // For dummy data, the Content component will handle finding the provider
  // const provider = dummyProviders.find(p => p.id === providerId);

  return <ProviderProfilePageContent t={t} locale={locale} providerId={providerId} />;
}
