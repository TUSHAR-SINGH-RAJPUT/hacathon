
"use client";

import React, { useState, useMemo } from 'react';
import type { ServiceProvider, ServiceCategory } from '@/types';
import ProviderCard from './ProviderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, XCircle, Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ProviderListingsProps {
  initialProviders: ServiceProvider[];
  serviceCategories: { value: ServiceCategory; label: string }[];
  filterTranslations: any; // Translations for filter controls
  providerCardTranslations: any; // Translations for ProviderCard
  locale: string;
}

const ALL_CATEGORIES_VALUE = "__ALL_CATEGORIES__"; 

export default function ProviderListings({ initialProviders, serviceCategories, filterTranslations: t, providerCardTranslations, locale }: ProviderListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [locationFilter, setLocationFilter] = useState('');

  const filteredProviders = useMemo(() => {
    return initialProviders.filter(provider => {
      const nameMatch = provider.name.toLowerCase().includes(searchTerm.toLowerCase());
      const bioMatch = provider.bio.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === '' || selectedCategory === ALL_CATEGORIES_VALUE || provider.serviceTypes.includes(selectedCategory as ServiceCategory);
      const ratingMatch = provider.rating >= minRating;
      const locationMatch = locationFilter === '' || provider.location.toLowerCase().includes(locationFilter.toLowerCase());
      return (nameMatch || bioMatch) && categoryMatch && ratingMatch && locationMatch;
    });
  }, [initialProviders, searchTerm, selectedCategory, minRating, locationFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(''); 
    setMinRating(0);
    setLocationFilter('');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-secondary rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <Label htmlFor="search-term" className="text-sm font-medium text-secondary-foreground">{t.searchByNameKeyword || "Search by Name/Keyword"}</Label>
            <Input
              id="search-term"
              type="text"
              placeholder={t.searchPlaceholder || "e.g., John Doe, painter..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="service-category" className="text-sm font-medium text-secondary-foreground">{t.serviceCategory || "Service Category"}</Label>
            <Select 
              value={selectedCategory === '' ? ALL_CATEGORIES_VALUE : selectedCategory} 
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger id="service-category" className="bg-background focus:ring-primary">
                <SelectValue placeholder={t.allCategories || "All Categories"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORIES_VALUE}>{t.allCategories || "All Categories"}</SelectItem>
                {serviceCategories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div>
            <Label htmlFor="location-filter" className="text-sm font-medium text-secondary-foreground">{t.location || "Location"}</Label>
            <Input
              id="location-filter"
              type="text"
              placeholder={t.locationPlaceholder || "e.g., New York, Zip Code"}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-background focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-rating" className="text-sm font-medium text-secondary-foreground flex justify-between">
              {t.minimumRating || "Minimum Rating"}: 
              <span className="font-bold text-primary">{minRating.toFixed(1)} <Star className="inline h-4 w-4 mb-0.5" /></span>
            </Label>
            <Slider
              id="min-rating"
              min={0}
              max={5}
              step={0.5}
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
              className="[&>span]:bg-primary"
            />
          </div>
        </div>
        <div className="flex justify-end">
           <Button variant="ghost" onClick={resetFilters} className="text-primary hover:bg-primary/10">
            <XCircle className="mr-2 h-4 w-4" /> {t.clearFilters || "Clear Filters"}
          </Button>
        </div>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <ProviderCard key={provider.id} provider={provider} locale={locale} translations={providerCardTranslations} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">{t.noProvidersFound || "No Providers Found"}</h3>
          <p className="text-muted-foreground mt-2">{t.tryAdjustingFilters || "Try adjusting your filters."}</p>
        </div>
      )}
    </div>
  );
}
