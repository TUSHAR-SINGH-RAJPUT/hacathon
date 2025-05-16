
"use client";

import React, { useState, useMemo } from 'react';
import type { ServiceProvider, ServiceCategory } from '@/types';
import ProviderCard from './ProviderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, XCircle, Star, Mic } from 'lucide-react'; // Added Mic icon
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast"; // Added useToast

interface ProviderListingsProps {
  initialProviders: ServiceProvider[];
  serviceCategories: { value: ServiceCategory; label: string }[];
  filterTranslations: any; 
  providerCardTranslations: any; 
  locale: string;
}

const ALL_CATEGORIES_VALUE = "__ALL_CATEGORIES__"; 

export default function ProviderListings({ initialProviders, serviceCategories, filterTranslations: t, providerCardTranslations, locale }: ProviderListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES_VALUE);
  const [minRating, setMinRating] = useState<number>(0);
  const [locationFilter, setLocationFilter] = useState('');
  const { toast } = useToast(); // Initialize toast

  const filteredProviders = useMemo(() => {
    return initialProviders.filter(provider => {
      const providerNameLower = provider.name.toLowerCase();
      const providerBioLower = provider.bio.toLowerCase();
      const providerCombinedText = `${providerNameLower} ${providerBioLower}`;
      
      const searchTermLower = searchTerm.toLowerCase().trim();
      let keywordMatch = true;

      if (searchTermLower !== '') {
        const rawKeywords = searchTermLower.split(' ').filter(kw => kw.length > 0);
        const validKeywords = rawKeywords.filter(kw => /[a-z0-9]/i.test(kw));

        if (validKeywords.length === 0 && rawKeywords.length > 0) {
          keywordMatch = false; // Search term had content but no valid alphanumeric keywords
        } else if (validKeywords.length === 1) {
          const singleValidKeyword = validKeywords[0];
          if (singleValidKeyword.length === 1 && /^[a-z0-9]$/i.test(singleValidKeyword)) {
            keywordMatch = providerNameLower.startsWith(singleValidKeyword);
          } else if (/^[a-z0-9]/i.test(singleValidKeyword)) {
            keywordMatch = providerNameLower.startsWith(singleValidKeyword);
          } else {
            keywordMatch = false; 
          }
        } else if (validKeywords.length > 1) {
          keywordMatch = validKeywords.every(keyword => providerCombinedText.includes(keyword));
        } else {
          // If no valid keywords extracted but search term was not empty initially (e.g. ";;;"),
          // it defaults to true unless explicitly set to false earlier for non-alphanumeric-only input.
          // This path means searchTermLower had something but it wasn't parseable into valid keywords
          // according to current logic, so we might assume no filtering if that's desired,
          // or ensure keywordMatch becomes false if any rawKeywords existed but none were valid.
          // For now, if validKeywords is empty AND rawKeywords was not empty, implies non-match.
           if (rawKeywords.length > 0) keywordMatch = false;
        }
      }
      
      const categoryMatch = selectedCategory === ALL_CATEGORIES_VALUE || provider.serviceTypes.includes(selectedCategory as ServiceCategory);
      const ratingMatch = provider.rating >= minRating;
      const locationMatch = locationFilter === '' || provider.location.toLowerCase().includes(locationFilter.toLowerCase().trim());
      
      return keywordMatch && categoryMatch && ratingMatch && locationMatch;
    });
  }, [initialProviders, searchTerm, selectedCategory, minRating, locationFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(ALL_CATEGORIES_VALUE); 
    setMinRating(0);
    setLocationFilter('');
  };

  const handleVoiceAssistClick = () => {
    toast({
      title: "Voice Assistant (Simulated)",
      description: "This feature is coming soon! You could ask for help like 'find a painter in Bangalore' or 'how do I upload my resume?'.",
      duration: 5000,
    });
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
              value={selectedCategory} 
              onValueChange={(value) => setSelectedCategory(value || ALL_CATEGORIES_VALUE)}
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
        <div className="flex justify-between items-center">
           <Button variant="outline" onClick={handleVoiceAssistClick} className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <Mic className="mr-2 h-4 w-4" /> Voice Assist (Beta)
          </Button>
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

