
import ProviderListings from '@/components/providers/ProviderListings';
import { serviceCategories, dummyProviders } from '@/components/providers/dummyData';

// Hardcoded English strings for translations
const providerListingsTranslations = {
  searchByNameKeyword: "Search by Name/Keyword",
  searchPlaceholder: "e.g., John Doe, painter...",
  serviceCategory: "Service Category",
  allCategories: "All Categories",
  location: "Location",
  locationPlaceholder: "e.g., New York, Zip Code",
  minimumRating: "Minimum Rating",
  clearFilters: "Clear Filters",
  noProvidersFound: "No Providers Found",
  tryAdjustingFilters: "Try adjusting your filters or check back later."
};

const providerCardTranslations = { // Added this for ProviderCard
  reviewsText: "reviews",
  experienceSuffix: "years experience",
  hourlyRateSuffix: "/hr (approx)",
  servicesLabel: "Services:",
  more: "more",
  viewProfileText: "View Profile",
  messageText: "Message"
};


const t = {
  findYourPerfectPro: "Find Your Perfect Pro",
  exploreSkilledProfessionals: "Explore skilled professionals for any service you need. Filter by category, location, and more."
};
  
export default function BrowseProvidersPage() {
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
        filterTranslations={providerListingsTranslations}
        providerCardTranslations={providerCardTranslations} // Pass ProviderCard translations
        locale="en" // Defaulting to 'en' as i18n is removed
      />
    </div>
  );
}
