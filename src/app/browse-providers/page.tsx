import ProviderListings from '@/components/providers/ProviderListings';
import { serviceCategories, dummyProviders } from '@/components/providers/dummyData'; // Assuming dummy data is moved here

export default function BrowseProvidersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center py-8 bg-card rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          Find Your Perfect Pro
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Explore skilled professionals for any service you need. Filter by category, location, and more.
        </p>
      </section>
      
      <ProviderListings initialProviders={dummyProviders} serviceCategories={serviceCategories} />
    </div>
  );
}
