
import ProviderListings from '@/components/providers/ProviderListings';
import { serviceCategories, dummyProviders } from '@/components/providers/dummyData';
import { getDictionary } from '@/lib/dictionaries';

export default async function BrowseProvidersPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const tBrowsePage = dict.BrowseProvidersPage || {}; 
  const tProviderListings = dict.ProviderListings || {};
  const tProviderCard = dict.ProviderCard || {}; // For ProviderCard component

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center py-8 bg-card rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          {tBrowsePage.findYourPerfectPro || "Find Your Perfect Pro"}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          {tBrowsePage.exploreSkilledProfessionals || "Explore skilled professionals for any service you need."}
        </p>
      </section>
      
      <ProviderListings 
        initialProviders={dummyProviders} 
        serviceCategories={serviceCategories} 
        filterTranslations={tProviderListings}
        providerCardTranslations={tProviderCard}
        locale={locale}
      />
    </div>
  );
}

    