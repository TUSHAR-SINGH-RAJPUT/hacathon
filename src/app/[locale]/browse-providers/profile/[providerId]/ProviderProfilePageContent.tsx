
"use client";

import { useRouter } from 'next/navigation'; // No longer need useParams if providerId is passed as prop
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders } from '@/components/providers/dummyData';
import type { ServiceProvider, Review } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Award, MessageSquare, Users as UsersIcon, ShoppingCart, Send, MessageCircle, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import ProviderCard from '@/components/providers/ProviderCard';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback
import { Separator } from '@/components/ui/separator';
import ServiceTypeIcon from '@/components/icons/ServiceTypeIcon';

const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground hover:text-amber-300'
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

interface ProviderProfilePageContentProps {
  tProfilePage: any; // Translations for this page's specific content
  tProviderCard: any; // Translations for the ProviderCard component
  locale: string;
  providerId: string;
}

export default function ProviderProfilePageContent({ tProfilePage: t, tProviderCard, locale, providerId }: ProviderProfilePageContentProps) {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  const [provider, setProvider] = useState<ServiceProvider | undefined>(undefined);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isHoveringReviews, setIsHoveringReviews] = useState(false);
  const reviewIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const foundProvider = dummyProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
    setCurrentReviewIndex(0); 
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
    if (provider && provider.reviews && provider.reviews.length > 1 && !isHoveringReviews) {
      reviewIntervalRef.current = setInterval(() => {
        handleNextReview();
      }, 5000); 
    } else {
      if (reviewIntervalRef.current) {
        clearInterval(reviewIntervalRef.current);
      }
    }
    return () => {
      if (reviewIntervalRef.current) {
        clearInterval(reviewIntervalRef.current);
      }
    };
  }, [provider, isHoveringReviews, handleNextReview]);


  if (!provider) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <UsersIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">{t.providerNotFound || "Provider not found"}</h1>
        <p className="text-muted-foreground mt-2">{t.providerNotFoundDesc || "The provider you are looking for does not exist."}</p>
        <Button className="mt-6" onClick={() => router.push(`/${locale}/browse-providers`)}>{t.backToProviders || "Back to Providers"}</Button>
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
        title: t.addedToJobList ? t.addedToJobList(provider.name) : `${provider.name} added to Job List!`,
        description: t.viewYourList || "View your list from the header.",
      });
    } else {
       toast({
        title: t.alreadyInJobList ? t.alreadyInJobList(provider.name) : `${provider.name} is already in Job List.`,
        variant: "default",
      });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) {
      toast({ title: t.ratingRequired || "Rating Required", description: t.selectStarRating || "Select a star rating.", variant: "destructive" });
      return;
    }
    if (!userReview.trim()) {
      toast({ title: t.reviewCommentRequired || "Comment Required", description: t.writeCommentForReview || "Write a comment.", variant: "destructive" });
      return;
    }
    setIsSubmittingReview(true);
    console.log("Submitting review:", { providerId: provider.id, rating: userRating, comment: userReview });
    
    setTimeout(() => {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        reviewerName: "You (Demo User)", 
        rating: userRating,
        comment: userReview,
        date: new Date().toISOString(),
      };
      setProvider(prev => {
        if (!prev) return undefined;
        const updatedReviews = [newReview, ...(prev.reviews || [])];
        setCurrentReviewIndex(0); 
        return { ...prev, reviews: updatedReviews, reviewsCount: (prev.reviewsCount || 0) + 1 };
      });
      
      toast({ title: t.reviewSubmitted || "Review Submitted!", description: t.thankYouFeedback || "Thank you!" });
      setUserReview('');
      setUserRating(0);
      setIsSubmittingReview(false);
    }, 1000);
  };

  const currentReview = provider.reviews && provider.reviews.length > 0 ? provider.reviews[currentReviewIndex] : null;

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
                <span className="ml-2 text-white">({provider.reviewsCount} {t.reviews || "reviews"})</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{t.aboutProvider ? t.aboutProvider(provider.name) : `About ${provider.name}`}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{provider.bio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{t.servicesOffered || "Services Offered"}</h3>
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
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">{t.portfolioPastWork || "Portfolio / Past Work"}</h3>
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
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">{t.quickInfo || "Quick Info"}</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary" /> {provider.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Award className="h-5 w-5 mr-3 text-primary" /> {t.yearsExperience ? t.yearsExperience(provider.experienceYears) : `${provider.experienceYears} years experience`}
              </div>
              {provider.hourlyRate && (
                <div className="flex items-center text-muted-foreground">
                   <span className="font-bold text-xl text-primary mr-2">{t.hourlyRateApprox ? t.hourlyRateApprox(provider.hourlyRate) : `₹${provider.hourlyRate} /hr (approx)`}</span>
                </div>
              )}
              <Button 
                onClick={handleAddToCart} 
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isProviderInCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {isProviderInCart ? (t.inYourJobList || "In Your Job List") : (t.addToJobList || "Add to Job List")}
              </Button>
              <Link href={`/${locale}/chat/${provider.id}`} passHref>
                <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                  <MessageCircle className="mr-2 h-5 w-5" /> {t.messageProvider ? t.messageProvider(provider.name.split(' ')[0]) : `Message ${provider.name.split(' ')[0]}`}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">{t.customerReviewsRatings || "Customer Reviews & Ratings"}</CardTitle>
          <UiCardDescription className="text-muted-foreground">{t.seeWhatOthersSaying ? t.seeWhatOthersSaying(provider.name) : `See what others are saying about ${provider.name}.`}</UiCardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {provider.reviews && provider.reviews.length > 0 ? (
            <div 
              className="relative group"
              onMouseEnter={() => setIsHoveringReviews(true)}
              onMouseLeave={() => setIsHoveringReviews(false)}
            >
              <Card className="bg-background p-4 shadow-sm min-h-[150px] flex flex-col justify-center transition-opacity duration-300 ease-in-out">
                {currentReview ? (
                  <>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < currentReview.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                      ))}
                      <span className="ml-auto text-xs text-muted-foreground">{new Date(currentReview.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-foreground mb-1 font-medium">{currentReview.reviewerName}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{currentReview.comment}</p>
                  </>
                ) : (
                  <p className="text-muted-foreground text-center">{t.loadingReview || "Loading review..."}</p>
                )}
              </Card>
              {provider.reviews.length > 1 && (
                <div className={`absolute inset-0 flex justify-between items-center transition-opacity duration-300 ${isHoveringReviews ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handlePrevReview} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-primary border-primary hover:text-primary-foreground"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleNextReview} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-primary border-primary hover:text-primary-foreground"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
               {provider.reviews.length > 1 && (
                 <div className={`text-center text-xs text-muted-foreground mt-2 transition-opacity duration-300 ${isHoveringReviews ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {currentReviewIndex + 1} of {provider.reviews.length}
                  </div>
               )}
            </div>
          ) : (
            <p className="text-muted-foreground">{t.noReviewsYet ? t.noReviewsYet(provider.name) : `No reviews yet for ${provider.name}.`}</p>
          )}

          <Separator className="my-6" />

          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">{t.leaveAReviewFor ? t.leaveAReviewFor(provider.name) : `Leave a Review for ${provider.name}`}</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="user-rating" className="mb-1 block font-medium">{t.yourRating || "Your Rating"}</Label>
                <StarRatingInput rating={userRating} setRating={setUserRating} />
              </div>
              <div>
                <Label htmlFor="user-review" className="mb-1 block font-medium">{t.yourReview || "Your Review"}</Label>
                <Textarea
                  id="user-review"
                  placeholder={t.shareYourExperience ? t.shareYourExperience(provider.name) : `Share your experience with ${provider.name}...`}
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={isSubmittingReview} className="bg-primary text-primary-foreground">
                {isSubmittingReview ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.submitting || "Submitting..."}</> : <><Send className="mr-2 h-4 w-4" /> {t.submitReview || "Submit Review"}</>}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {recommendedProviders.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">{t.recommendedProfessionals || "Recommended Professionals"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProviders.map(recProvider => (
              <ProviderCard key={recProvider.id} provider={recProvider} locale={locale} translations={tProviderCard} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

    