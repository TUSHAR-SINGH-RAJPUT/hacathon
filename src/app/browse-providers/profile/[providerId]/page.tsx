
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders } from '@/components/providers/dummyData';
import type { ServiceProvider, Review } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Award, CheckCircle, MessageSquare, Users, ShoppingCart, Paintbrush, Sprout, Wrench, Sparkles, Zap, Send, MessageCircle, Loader2, ArrowLeft, ArrowRight } from 'lucide-react'; // Added Loader2, ArrowLeft, ArrowRight
import ProviderCard from '@/components/providers/ProviderCard';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

const ServiceTypeIcon = ({ type }: { type: ServiceProvider['serviceTypes'][0] }) => {
  const icons: Record<ServiceProvider['serviceTypes'][0], React.ReactNode> = {
    Painting: <Paintbrush className="h-5 w-5 mr-2 text-primary" />,
    Gardening: <Sprout className="h-5 w-5 mr-2 text-primary" />,
    Plumbing: <Wrench className="h-5 w-5 mr-2 text-primary" />,
    Cleaning: <Sparkles className="h-5 w-5 mr-2 text-primary" />,
    Electrical: <Zap className="h-5 w-5 mr-2 text-primary" />,
    Handyman: <Users className="h-5 w-5 mr-2 text-primary" />,
    Landscaping: <Sprout className="h-5 w-5 mr-2 text-primary" />,
    Other: <Briefcase className="h-5 w-5 mr-2 text-primary" />,
  };
  return icons[type] || <Briefcase className="h-5 w-5 mr-2 text-primary" />;
};

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
  const providerId = params.providerId as string;
  const { addToCart, cart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [provider, setProvider] = useState<ServiceProvider | undefined>(undefined);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const foundProvider = dummyProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
    setCurrentReviewIndex(0); // Reset index when provider changes
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


  if (!provider) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">Provider not found</h1>
        <p className="text-muted-foreground mt-2">The provider you are looking for does not exist or may have been removed.</p>
        <Button className="mt-6" onClick={() => router.push('/browse-providers')}>Back to Providers</Button>
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
        title: `${provider.name} added to your Job List!`,
        description: "You can view your list from the header.",
      });
    } else {
       toast({
        title: `${provider.name} is already in your Job List.`,
        variant: "default",
      });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) {
      toast({ title: "Rating Required", description: "Please select a star rating.", variant: "destructive" });
      return;
    }
    if (!userReview.trim()) {
      toast({ title: "Review Comment Required", description: "Please write a comment for your review.", variant: "destructive" });
      return;
    }
    setIsSubmittingReview(true);
    console.log("Submitting review:", { providerId: provider.id, rating: userRating, comment: userReview });
    // Simulate API call
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
        // Reset slideshow to show the new review first
        setCurrentReviewIndex(0); 
        return { ...prev, reviews: updatedReviews, reviewsCount: (prev.reviewsCount || 0) + 1 };
      });
      
      toast({ title: "Review Submitted!", description: "Thank you for your feedback." });
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
                <h3 className="text-xl font-semibold text-card-foreground mb-2">About {provider.name}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{provider.bio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">Services Offered</h3>
                <div className="flex flex-wrap gap-3">
                  {provider.serviceTypes.map(service => (
                    <Badge key={service} variant="secondary" className="text-sm py-1 px-3 bg-secondary text-secondary-foreground flex items-center shadow-sm">
                      <ServiceTypeIcon type={service} />
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
                 {provider.portfolioImages && provider.portfolioImages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">Portfolio / Past Work</h3>
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
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Quick Info</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary" /> {provider.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Award className="h-5 w-5 mr-3 text-primary" /> {provider.experienceYears} years of experience
              </div>
              {provider.hourlyRate && (
                <div className="flex items-center text-muted-foreground">
                   <span className="font-bold text-xl text-primary mr-2">₹{provider.hourlyRate}</span> /hr (approx)
                </div>
              )}
              <Button 
                onClick={handleAddToCart} 
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isProviderInCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {isProviderInCart ? "In Your Job List" : "Add to Job List"}
              </Button>
              <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="mr-2 h-5 w-5" /> Message {provider.name.split(' ')[0]} (Simulated)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Reviews Section */}
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">Customer Reviews & Ratings</CardTitle>
          <UiCardDescription className="text-muted-foreground">See what others are saying about {provider.name}.</UiCardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {provider.reviews && provider.reviews.length > 0 ? (
            <div className="relative">
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
                  <p className="text-muted-foreground text-center">Loading review...</p>
                )}
              </Card>
              {provider.reviews.length > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" onClick={handlePrevReview} className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentReviewIndex + 1} of {provider.reviews.length}
                  </span>
                  <Button variant="outline" onClick={handleNextReview} className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    Next <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet for {provider.name}. Be the first to add one!</p>
          )}

          <Separator className="my-6" />

          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">Leave a Review for {provider.name}</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="user-rating" className="mb-1 block font-medium">Your Rating</Label>
                <StarRatingInput rating={userRating} setRating={setUserRating} />
              </div>
              <div>
                <Label htmlFor="user-review" className="mb-1 block font-medium">Your Review</Label>
                <Textarea
                  id="user-review"
                  placeholder={`Share your experience with ${provider.name}...`}
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={isSubmittingReview} className="bg-primary text-primary-foreground">
                {isSubmittingReview ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-4 w-4" /> Submit Review</>}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {recommendedProviders.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Recommended Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProviders.map(recProvider => (
              <ProviderCard key={recProvider.id} provider={recProvider} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
