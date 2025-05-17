
"use client";

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, MessageSquare, ArrowLeft, Info, Loader2, Navigation } from 'lucide-react'; // Added Navigation icon
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Added Link for Waze button

// Hardcoded English strings
const t = {
  loadingBookingDetails: "Loading booking details...",
  bookingNotFound: "Booking Not Found",
  bookingNotFoundOrInvalid: "Booking not found or invalid ID.",
  failedToLoadBooking: "Failed to load booking details.",
  checkBookingIdContactSupport: "Please check the booking ID or contact support.",
  backToHome: "Back to Home",
  trackYourService: "Track Your Service",
  bookingIdLabel: "Booking ID",
  statusLabel: "Status",
  estimatedArrival: "Estimated Arrival",
  providerLocation: "Provider Location (Map Placeholder)",
  serviceAddressLabel: "Service Address",
  callProvider: (name: string) => `Call ${name.split(' ')[0]}`,
  messageProvider: "Message",
  navigateWithWaze: "Navigate with Waze",
  contactOptionsSimulated: "Contact options are simulated for this demo.",
  backButton: "Back"
};

const fetchBookingDetails = async (bookingId: string) => {
  console.log("Fetching booking details for:", bookingId);
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (bookingId === "dummy-booking-123") {
    return {
      id: "dummy-booking-123",
      provider: {
        name: "Priya Sharma",
        serviceTypes: ["Painting"],
        profileImageUrl: 'https://placehold.co/80x80.png',
        dataAiHint: "person portrait",
        phone: "+91 98XXXXXX01"
      },
      status: "En Route",
      estimatedArrivalTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      serviceAddress: "123, Koramangala, Bangalore, Karnataka, 560034",
    };
  }
  return null;
};


export default function TrackServicePage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookingId) {
      setLoading(true);
      setError(null);
      fetchBookingDetails(bookingId)
        .then(data => {
          if (data) {
            setBookingDetails(data);
          } else {
            setError(t.bookingNotFoundOrInvalid);
          }
        })
        .catch(err => {
          console.error("Error fetching booking:", err);
          setError(t.failedToLoadBooking);
        })
        .finally(() => setLoading(false));
    } else {
      setError(t.bookingNotFoundOrInvalid);
      setLoading(false);
    }
  }, [bookingId]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">{t.loadingBookingDetails}</p>
      </div>
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500">
        <Info className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-xl font-semibold text-destructive mb-2">{error || t.bookingNotFound}</h1>
        <p className="text-muted-foreground mb-6">{t.checkBookingIdContactSupport}</p>
        <Button onClick={() => router.push('/')}><ArrowLeft className="mr-2 h-4 w-4" /> {t.backToHome}</Button>
      </div>
    );
  }

  const wazeBaseUrl = "https://www.waze.com/ul";
  const wazeLink = `${wazeBaseUrl}?q=${encodeURIComponent(bookingDetails.serviceAddress)}&navigate=yes`;

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t.backButton}
      </Button>

      <Card className="shadow-xl bg-card">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.trackYourService}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.bookingIdLabel}: {bookingDetails.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
            <Image
              src={bookingDetails.provider.profileImageUrl || `https://placehold.co/80x80.png`}
              alt={bookingDetails.provider.name}
              data-ai-hint={bookingDetails.provider.dataAiHint || "person portrait"}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-foreground">{bookingDetails.provider.name}</p>
              <p className="text-sm text-muted-foreground">{bookingDetails.provider.serviceTypes.join(', ')}</p>
            </div>
          </div>

          <Card className="bg-secondary">
            <CardContent className="p-4 space-y-2">
              <p className="text-lg font-medium text-secondary-foreground">{t.statusLabel}: {bookingDetails.status}</p>
              {bookingDetails.status === "En Route" && bookingDetails.estimatedArrivalTime && (
                <p className="text-sm text-muted-foreground">{t.estimatedArrival}: {new Date(bookingDetails.estimatedArrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              )}
            </CardContent>
          </Card>
          
          {/* Placeholder for map */}
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground shadow">
            <MapPin className="h-12 w-12" />
            <p className="ml-2">{t.providerLocation}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-foreground font-medium mb-1">{t.serviceAddressLabel}:</p>
            <p className="text-sm text-muted-foreground">{bookingDetails.serviceAddress}</p>
             <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3">
              <Button variant="outline" className="w-full sm:w-auto text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                <Navigation className="mr-2 h-5 w-5" /> {t.navigateWithWaze}
              </Button>
            </a>
          </div>


          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="mr-2 h-5 w-5" /> {t.callProvider(bookingDetails.provider.name)}
            </Button>
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <MessageSquare className="mr-2 h-5 w-5" /> {t.messageProvider}
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">{t.contactOptionsSimulated}</p>
        </CardContent>
      </Card>
    </div>
  );
}
