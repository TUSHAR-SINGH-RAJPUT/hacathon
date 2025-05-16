import ProviderListings from '@/components/providers/ProviderListings';
import { serviceCategories, dummyProviders } from '@/components/providers/dummyData';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string };
};

export default async function BrowseProvidersPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  // Assuming translations for ProviderListings are nested or can be derived
  const providerListingsTranslations = {
    searchByNameKeyword: dict.ProviderListings?.searchByNameKeyword || "Search by Name/Keyword",
    searchPlaceholder: dict.ProviderListings?.searchPlaceholder || "e.g., John Doe, painter...",
    serviceCategory: dict.ProviderListings?.serviceCategory || "Service Category",
    allCategories: dict.ProviderListings?.allCategories || "All Categories",
    location: dict.ProviderListings?.location || "Location",
    locationPlaceholder: dict.ProviderListings?.locationPlaceholder || "e.g., New York, Zip Code",
    minimumRating: dict.ProviderListings?.minimumRating || "Minimum Rating",
    clearFilters: dict.ProviderListings?.clearFilters || "Clear Filters",
    noProvidersFound: dict.ProviderListings?.noProvidersFound || "No Providers Found",
    tryAdjustingFilters: dict.ProviderListings?.tryAdjustingFilters || "Try adjusting your filters or check back later."
  };

  const t = {
    findYourPerfectPro: dict.BrowseProvidersPage?.findYourPerfectPro || "Find Your Perfect Pro",
    exploreSkilledProfessionals: dict.BrowseProvidersPage?.exploreSkilledProfessionals || "Explore skilled professionals for any service you need. Filter by category, location, and more."
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center py-8 bg-card rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          {t.findYourPerfectPro}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          {t.exploreSkilledProfessionals}
        </p>
      </section>
      
      <ProviderListings 
        initialProviders={dummyProviders} 
        serviceCategories={serviceCategories} 
        translations={providerListingsTranslations}
        locale={locale}
      />
    </div>
  );
}
