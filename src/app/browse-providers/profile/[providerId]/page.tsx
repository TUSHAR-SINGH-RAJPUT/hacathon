
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders } from '@/components/providers/dummyData';
import type { ServiceProvider } from '@/types'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Award, ShoppingCart, MessageCircle, Users as UsersIcon, ArrowLeft } from 'lucide-react';
import ProviderCard from '@/components/providers/ProviderCard';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import ServiceTypeIcon from '@/components/icons/ServiceTypeIcon';

// Hardcoded English strings
const t = {
  providerNotFound: "Provider not found",
  providerNotFoundDesc: "The provider you are looking for does not exist or may have been removed.",
  backToProviders: "Back to Providers",
  addedToJobList: (name: string) => `${name} added to your Job List!`,
  viewYourList: "You can view your list from the header.",
  alreadyInJobList: (name: string) => `${name} is already in your Job List.`,
  aboutProvider: (name: string) => `About ${name}`,
  servicesOffered: "Services Offered",
  portfolioPastWork: "Portfolio / Past Work",
  quickInfo: "Quick Info",
  yearsExperience: (years: number) => `${years} years of experience`,
  hourlyRateApprox: (rate: string) => `₹${rate} /hr (approx)`,
  inYourJobList: "In Your Job List",
  addToJobList: "Add to Job List",
  messageProvider: (name: string) => `Message ${name.split(' ')[0]}`,
  recommendedProfessionals: "Recommended Professionals",
  reviews: "reviews" // For rating display
};

// Hardcoded English strings for ProviderCard, as this page renders it
const providerCardTranslations = {
  reviewsText: "reviews",
  experienceSuffix: "years experience",
  hourlyRateSuffix: "/hr (approx)",
  servicesLabel: "Services:",
  more: "more",
  viewProfileText: "View Profile",
  messageText: "Message"
};

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.providerId as string;

  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  const [provider, setProvider] = useState<ServiceProvider | undefined>(undefined);
  
  useEffect(() => {
    const foundProvider = dummyProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
  }, [providerId]);


  if (!provider) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <UsersIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">{t.providerNotFound}</h1>
        <p className="text-muted-foreground mt-2">{t.providerNotFoundDesc}</p>
        <Button className="mt-6" onClick={() => router.push(`/browse-providers`)}><ArrowLeft className="mr-2 h-4 w-4"/>{t.backToProviders}</Button>
      </div>
    );
  }

  const recommendedProviders = dummyProviders
    .filter(p => p.id !== provider.id && p.serviceTypes.some(st => provider.serviceTypes.includes(st)))
    .slice(0, 3);
  
  if (recommendedProviders.length < 3) {
    recommendedProviders.push(...dummyProviders.filter(p => p.id !== provider.id && !recommendedProviders.find(rp => rp.id === p.id)).slice(0, 3 - recommendedProviders.length));
  }
  
  const isProviderInCart = cart.some(item => item.id === provider.id);

  const handleAddToCart = () => {
    if (!isProviderInCart) {
      addToCart(provider);
      toast({
        title: t.addedToJobList(provider.name),
        description: t.viewYourList,
      });
    } else {
       toast({
        title: t.alreadyInJobList(provider.name),
        variant: "default",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-12 animate-in fade-in duration-500">
      <Card className="overflow-hidden shadow-xl bg-card">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 md:h-80 bg-muted">
            <Image
              src={provider.profileImageUrl || `https://placehold.co/800x400.png?text=${provider.name.split(' ').join('+')}`}
              alt={`${provider.name}'s profile background`}
              fill
              style={{objectFit: 'cover'}}
              data-ai-hint="professional service action"
              className="opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-primary-foreground">
              <CardTitle className="text-3xl md:text-4xl font-bold ">{provider.name}</CardTitle>
              <div className="flex items-center text-lg text-amber-300 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-6 w-6 ${i < Math.round(provider.rating) ? 'fill-current' : 'text-white/50'}`} />
                ))}
                <span className="ml-2 text-white">({provider.reviewsCount} {t.reviews})</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{t.aboutProvider(provider.name)}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{provider.bio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{t.servicesOffered}</h3>
                <div className="flex flex-wrap gap-3">
                  {provider.serviceTypes.map(service => (
                    <Badge key={service} variant="secondary" className="text-sm py-1 px-3 bg-secondary text-secondary-foreground flex items-center shadow-sm">
                      <ServiceTypeIcon type={service} className="h-5 w-5 mr-2 text-primary" /> 
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
                 {provider.portfolioImages && provider.portfolioImages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">{t.portfolioPastWork}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {provider.portfolioImages.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                        <Image src={img} alt={`Portfolio image ${index + 1}`} fill style={{objectFit:"cover"}} data-ai-hint="project example" className="group-hover:scale-105 transition-transform duration-300"/>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4 p-4 bg-background rounded-lg shadow">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">{t.quickInfo}</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary" /> {provider.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Award className="h-5 w-5 mr-3 text-primary" /> {t.yearsExperience(provider.experienceYears)}
              </div>
              {provider.hourlyRate && (
                <div className="flex items-center text-muted-foreground">
                   <span className="font-bold text-xl text-primary mr-2">{t.hourlyRateApprox(provider.hourlyRate)}</span>
                </div>
              )}
              <Button 
                onClick={handleAddToCart} 
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isProviderInCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {isProviderInCart ? t.inYourJobList : t.addToJobList}
              </Button>
              <Link href={`/chat/${provider.id}`} passHref>
                <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                  <MessageCircle className="mr-2 h-5 w-5" /> {t.messageProvider(provider.name)}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Section Removed */}
      {/* <Separator /> */}
      {/* <Card className="shadow-lg bg-card"> ... </Card> */}

      {recommendedProviders.length > 0 && (
        <section className="pt-8">
          <Separator className="mb-8" />
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">{t.recommendedProfessionals}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProviders.map(recProvider => (
              <ProviderCard key={recProvider.id} provider={recProvider} locale={"en"} translations={providerCardTranslations} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
