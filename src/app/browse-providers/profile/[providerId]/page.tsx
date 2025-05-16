
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders } from '@/components/providers/dummyData';
import type { ServiceProvider } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Award, ShoppingCart, MessageCircle, Users as UsersIcon, ArrowLeft, ArrowRight, ThumbsUp, Search } from 'lucide-react'; // Added Search
import ProviderCard from '@/components/providers/ProviderCard';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import ServiceTypeIcon from '@/components/icons/ServiceTypeIcon';
// Removed Textarea and Label as they were only for the review form

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
  reviews: "reviews",
  customerReviews: "Customer Reviews",
  noReviewsYet: "No reviews yet for this provider.", // Updated message
  // Removed "Leave a Review" related translations
  previous: "Previous",
  next: "Next",
  of: "of"
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

// StarRatingInput component is removed as it's no longer used on this page

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.providerId as string;

  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  const [provider, setProvider] = useState<ServiceProvider | undefined>(undefined);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isHoveringReviews, setIsHoveringReviews] = useState(false);
  
  useEffect(() => {
    const foundProvider = dummyProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
    if (foundProvider) {
      setCurrentReviewIndex(0); 
    }
  }, [providerId]);

  const handleNextReview = useCallback(() => {
    if (provider && provider.reviews && provider.reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % provider.reviews!.length);
    }
  }, [provider]);

  const handlePrevReview = () => {
    if (provider && provider.reviews && provider.reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + provider.reviews!.length) % provider.reviews!.length);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (provider && provider.reviews && provider.reviews.length > 1 && !isHoveringReviews) {
      intervalId = setInterval(handleNextReview, 5000); 
    }
    return () => clearInterval(intervalId); 
  }, [provider, isHoveringReviews, handleNextReview]);

  // Removed handleSubmitReview function

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
  
  const currentReview = provider.reviews && provider.reviews.length > 0 ? provider.reviews[currentReviewIndex] : null;

  return (
    <div className="container mx-auto py-8 px-4 space-y-12 animate-in fade-in duration-500">
      <Card className="overflow-hidden shadow-xl bg-card">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-secondary via-background to-secondary/50">
            <Image
              src={provider.profileImageUrl || `https://placehold.co/800x400.png?text=${provider.name.split(' ').join('+')}`}
              alt={`${provider.name}'s profile background`}
              data-ai-hint="professional service action"
              fill
              style={{objectFit: 'cover'}}
              className="opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">{provider.name}</CardTitle>
              <div className="flex items-center text-lg text-amber-300 mt-2 drop-shadow-sm">
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
                    <Badge key={service} variant="secondary" className="text-sm py-1.5 px-3 bg-secondary text-secondary-foreground flex items-center shadow-sm hover:bg-secondary/80 transition-colors">
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
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md group cursor-pointer">
                        <Image src={img} alt={`Portfolio image ${index + 1}`} fill style={{objectFit:"cover"}} data-ai-hint="project example" className="group-hover:scale-105 transition-transform duration-300"/>
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Search className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4 p-4 bg-background rounded-lg shadow-md sticky top-24">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">{t.quickInfo}</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary" /> {provider.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Award className="h-5 w-5 mr-3 text-primary" /> {t.yearsExperience(provider.experienceYears)}
              </div>
              {provider.hourlyRate && (
                <div className="flex items-center text-muted-foreground">
                   <span className="font-bold text-xl text-primary mr-2">₹{provider.hourlyRate}</span> {t.hourlyRateApprox(provider.hourlyRate.split('-')[0])}
                </div>
              )}
              <Button 
                onClick={handleAddToCart} 
                className="w-full mt-4"
                disabled={isProviderInCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {isProviderInCart ? t.inYourJobList : t.addToJobList}
              </Button>
              <Link href={`/chat/${provider.id}`} passHref>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-5 w-5" /> {t.messageProvider(provider.name)}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-xl bg-card" onMouseEnter={() => setIsHoveringReviews(true)} onMouseLeave={() => setIsHoveringReviews(false)}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-card-foreground flex items-center">
            <ThumbsUp className="mr-3 h-7 w-7 text-primary"/> {t.customerReviews}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {provider.reviews && provider.reviews.length > 0 ? (
            <div className="relative group">
              <div className="min-h-[200px] p-6 bg-background rounded-lg shadow-inner flex flex-col justify-center">
                {currentReview && (
                  <div className="text-center animate-in fade-in duration-300">
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < currentReview.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">&quot;{currentReview.comment}&quot;</p>
                    <p className="text-sm font-medium text-foreground mt-3">- {currentReview.reviewerName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(currentReview.date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              {provider.reviews.length > 1 && (
                 <>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handlePrevReview} 
                        className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isHoveringReviews ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        aria-label={t.previous}
                    >
                        <ArrowLeft className="h-6 w-6"/>
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleNextReview} 
                        className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isHoveringReviews ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        aria-label={t.next}
                    >
                        <ArrowRight className="h-6 w-6"/>
                    </Button>
                    <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground transition-opacity duration-300 ${isHoveringReviews ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {currentReviewIndex + 1} {t.of} {provider.reviews.length}
                    </div>
                 </>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">{t.noReviewsYet}</p>
          )}

          {/* Leave a Review Form Removed */}
          
        </CardContent>
      </Card>

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
