
"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyProviders, serviceCategories as allServiceCategories } from '@/components/providers/dummyData';
import type { ServiceProvider, ServiceCategory } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Award, CheckCircle, MessageSquare, Users, ShoppingCart, Paintbrush, Sprout, Wrench, Sparkles, Zap } from 'lucide-react';
import ProviderCard from '@/components/providers/ProviderCard';
import { useCart } from '@/context/CartContext'; // Ensure this path is correct
import { useToast } from "@/hooks/use-toast";

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


export default function ProviderProfilePage() {
  const params = useParams();
  const providerId = params.providerId as string;
  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  const provider = dummyProviders.find(p => p.id === providerId);

  if (!provider) {
    return (
      <div className="text-center py-20">
        <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">Provider not found</h1>
        <p className="text-muted-foreground mt-2">The provider you are looking for does not exist or may have been removed.</p>
        <Link href="/browse-providers" passHref>
          <Button className="mt-6">Back to Providers</Button>
        </Link>
      </div>
    );
  }

  const recommendedProviders = dummyProviders
    .filter(p => p.id !== provider.id && p.serviceTypes.some(st => provider.serviceTypes.includes(st)))
    .slice(0, 3);
  
  // Fallback to any other 3 providers if no similar ones found
  if (recommendedProviders.length === 0) {
    recommendedProviders.push(...dummyProviders.filter(p => p.id !== provider.id).slice(0, 3 - recommendedProviders.length));
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

  return (
    <div className="container mx-auto py-8 px-4 space-y-12 animate-in fade-in duration-500">
      <Card className="overflow-hidden shadow-xl bg-card">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 md:h-80 bg-muted">
            <Image
              src={provider.profileImageUrl || `https://placehold.co/800x400.png?text=${provider.name.split(' ').join('+')}`}
              alt={`${provider.name}'s profile background`}
              layout="fill"
              objectFit="cover"
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
                <p className="text-muted-foreground leading-relaxed">{provider.bio}</p>
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
                {isProviderInCart ? "Already in Job List" : "Add to Job List"}
              </Button>
              <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                <MessageSquare className="mr-2 h-5 w-5" /> Message {provider.name.split(' ')[0]}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {recommendedProviders.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Recommended Professionals</h2>
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
