import Image from 'next/image';
import type { ServiceProvider } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';
import ServiceTypeIcon from '@/components/icons/ServiceTypeIcon';

// Assuming ProviderCard texts are simple and might not need full dictionary keys for now
// Or, these could be passed as props if needed.
const viewProfileText = "View Profile"; 
const messageText = "Message";
const reviewsText = "reviews";
const experienceSuffix = "years experience";
const hourlyRateSuffix = "/hr (approx)";

export default function ProviderCard({ provider, locale }: { provider: ServiceProvider, locale: string }) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background overflow-hidden transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/${locale}/browse-providers/profile/${provider.id}`} passHref>
          <div className="relative w-full h-48 cursor-pointer group">
            <Image
              src={provider.profileImageUrl || `https://placehold.co/400x300.png?text=${provider.name.split(' ').join('+')}`}
              alt={`${provider.name}'s profile`}
              fill
              style={{objectFit:"cover"}}
              data-ai-hint="worker portrait"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/${locale}/browse-providers/profile/${provider.id}`} passHref>
            <CardTitle className="text-xl font-semibold mb-1 hover:text-primary cursor-pointer">{provider.name}</CardTitle>
          </Link>
          <div className="flex items-center text-sm text-amber-500 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.round(provider.rating) ? 'fill-current' : 'text-muted-foreground/50'}`} />
            ))}
            <span className="ml-2 text-muted-foreground">({provider.reviewsCount} {reviewsText})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" /> {provider.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-primary" /> {provider.experienceYears} {experienceSuffix}
          </div>
          {provider.hourlyRate && (
             <div className="flex items-center">
                <span className="font-bold text-lg text-primary mr-1">₹{provider.hourlyRate}</span> {hourlyRateSuffix}
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-xs font-semibold text-foreground mb-1">Services:</p>
          <div className="flex flex-wrap gap-2">
            {provider.serviceTypes.slice(0, 3).map((type) => (
              <Badge key={type} variant="secondary" className="bg-secondary text-secondary-foreground flex items-center">
                <ServiceTypeIcon type={type} className="h-4 w-4 mr-1 inline-block" /> {type}
              </Badge>
            ))}
            {provider.serviceTypes.length > 3 && <Badge variant="outline">+{provider.serviceTypes.length - 3} more</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2">
        <Link href={`/${locale}/browse-providers/profile/${provider.id}`} passHref className="flex-1">
          <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <User size={16} className="mr-2"/>
            {viewProfileText}
          </Button>
        </Link>
        <Link href={`/${locale}/chat/${provider.id}`} passHref className="flex-1">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <MessageSquare size={16} className="mr-2" /> {messageText}
          </Button>
        </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
