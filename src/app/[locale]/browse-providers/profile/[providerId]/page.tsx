"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders } from '@/components/providers/dummyData';
import type { ServiceProvider, Review } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Award, CheckCircle, MessageSquare, Users as UsersIcon, ShoppingCart, Send, MessageCircle, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import ProviderCard from '@/components/providers/ProviderCard';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import ServiceTypeIcon from '@/components/icons/ServiceTypeIcon';
import { getDictionary } from '@/lib/dictionaries'; // For client-side translation loading

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


export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.providerId as string;
  const locale = params.locale as string || 'en';

  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  const [provider, setProvider] = useState<ServiceProvider | undefined>(undefined);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isHoveringReviews, setIsHoveringReviews] = useState(false);
  const reviewIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [t, setT] = useState<any>({}); // For translations

  useEffect(() => {
    const fetchDict = async () => {
      const dict = await getDictionary(locale);
      // Assuming translations for this page are under a key like "ProviderProfilePage"
      setT(dict.ProviderProfilePage || { 
        // Fallbacks if not found in dictionary
        providerNotFound: "Provider not found",
        providerNotFoundDesc: "The provider you are looking for does not exist or may have been removed.",
        backToProviders: "Back to Providers",
        addedToJobList: (name: string) => `${name} added to your Job List!`,
        viewYourList: "You can view your list from the header.",
        alreadyInJobList: (name: string) => `${name} is already in your Job List.`,
        ratingRequired: "Rating Required",
        selectStarRating: "Please select a star rating.",
        reviewCommentRequired: "Review Comment Required",
        writeCommentForReview: "Please write a comment for your review.",
        reviewSubmitted: "Review Submitted!",
        thankYouFeedback: "Thank you for your feedback.",
        aboutProvider: (name: string) => `About ${name}`,
        servicesOffered: "Services Offered",
        portfolioPastWork: "Portfolio / Past Work",
        quickInfo: "Quick Info",
        yearsExperience: (years: number) => `${years} years of experience`,
        hourlyRateApprox: (rate: string) => `₹${rate} /hr (approx)`,
        inYourJobList: "In Your Job List",
        addToJobList: "Add to Job List",
        messageProvider: (name: string) => `Message ${name.split(' ')[0]}`,
        customerReviewsRatings: "Customer Reviews & Ratings",
        seeWhatOthersSaying: (name: string) => `See what others are saying about ${name}.`,
        loadingReview: "Loading review...",
        noReviewsYet: (name: string) => `No reviews yet for ${name}. Be the first to add one!`,
        leaveAReviewFor: (name: string) => `Leave a Review for ${name}`,
        yourRating: "Your Rating",
        yourReview: "Your Review",
        shareYourExperience: (name: string) => `Share your experience with ${name}...`,
        submitting: "Submitting...",
        submitReview: "Submit Review",
        recommendedProfessionals: "Recommended Professionals"
      });
    };
    fetchDict();
  }, [locale]);
  
  useEffect(() => {
    const foundProvider = dummyProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
    setCurrentReviewIndex(0); 
  }, [providerId]);

  const handleNextReview = () => {
    if (provider && provider.reviews && provider.reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % provider.reviews!.length);
    }
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, isHoveringReviews, provider?.reviews?.length]);


  if (Object.keys(t).length === 0 || !provider && !localStorage.getItem('loadingInitialData')) { // Prevent flash of "Provider not found"
    return <div className="text-center py-20">Loading...</div>; // Or a better loader
  }


  if (!provider) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <UsersIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">{t.providerNotFound}</h1>
        <p className="text-muted-foreground mt-2">{t.providerNotFoundDesc}</p>
        <Button className="mt-6" onClick={() => router.push(`/${locale}/browse-providers`)}>{t.backToProviders}</Button>
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) {
      toast({ title: t.ratingRequired, description: t.selectStarRating, variant: "destructive" });
      return;
    }
    if (!userReview.trim()) {
      toast({ title: t.reviewCommentRequired, description: t.writeCommentForReview, variant: "destructive" });
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
      
      toast({ title: t.reviewSubmitted, description: t.thankYouFeedback });
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
                <span className="ml-2 text-white">({provider.reviewsCount} reviews)</span>
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
              <Link href={`/${locale}/chat/${provider.id}`} passHref>
                <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                  <MessageCircle className="mr-2 h-5 w-5" /> {t.messageProvider(provider.name)}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">{t.customerReviewsRatings}</CardTitle>
          <UiCardDescription className="text-muted-foreground">{t.seeWhatOthersSaying(provider.name)}</UiCardDescription>
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
                  <p className="text-muted-foreground text-center">{t.loadingReview}</p>
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
            <p className="text-muted-foreground">{t.noReviewsYet(provider.name)}</p>
          )}

          <Separator className="my-6" />

          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">{t.leaveAReviewFor(provider.name)}</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="user-rating" className="mb-1 block font-medium">{t.yourRating}</Label>
                <StarRatingInput rating={userRating} setRating={setUserRating} />
              </div>
              <div>
                <Label htmlFor="user-review" className="mb-1 block font-medium">{t.yourReview}</Label>
                <Textarea
                  id="user-review"
                  placeholder={t.shareYourExperience(provider.name)}
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={isSubmittingReview} className="bg-primary text-primary-foreground">
                {isSubmittingReview ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.submitting}</> : <><Send className="mr-2 h-4 w-4" /> {t.submitReview}</>}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {recommendedProviders.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">{t.recommendedProfessionals}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProviders.map(recProvider => (
              <ProviderCard key={recProvider.id} provider={recProvider} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
