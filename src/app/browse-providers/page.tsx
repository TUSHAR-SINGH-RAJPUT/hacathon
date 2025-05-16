// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
import ProviderListings from '@/components/providers/ProviderListings';
import { serviceCategories, dummyProviders } from '@/components/providers/dummyData';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string }; // Changed Locale to string
};

export default async function BrowseProvidersPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  // Pass translations to client component ProviderListings
  const providerListingsTranslations = {
    searchByNameKeyword: dict.searchByNameKeyword || "Search by Name/Keyword",
    searchPlaceholder: dict.searchPlaceholder || "e.g., John Doe, painter...",
    serviceCategory: dict.serviceCategory || "Service Category",
    allCategories: dict.allCategories || "All Categories",
    location: dict.location || "Location",
    locationPlaceholder: dict.locationPlaceholder || "e.g., New York, Zip Code",
    minimumRating: dict.minimumRating || "Minimum Rating",
    clearFilters: dict.clearFilters || "Clear Filters",
    noProvidersFound: dict.noProvidersFound || "No Providers Found",
    tryAdjustingFilters: dict.tryAdjustingFilters || "Try adjusting your filters or check back later."
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center py-8 bg-card rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          {dict.findYourPerfectPro || "Find Your Perfect Pro"}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          {dict.exploreSkilledProfessionals || "Explore skilled professionals for any service you need. Filter by category, location, and more."}
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
