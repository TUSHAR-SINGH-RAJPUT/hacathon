
"use client";

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, MessageSquare, ArrowLeft, Info, Loader2, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Simulate fetching booking details - in a real app, this would be an API call
const fetchBookingDetails = async (bookingId: string) => {
  console.log("Fetching booking details for:", bookingId);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (bookingId === "dummy-booking-123") {
    return {
      id: "dummy-booking-123",
      provider: {
        name: "Priya Sharma",
        serviceTypes: ["Painting"],
        profileImageUrl: 'https://placehold.co/80x80.png?text=Priya',
        phone: "+91 98XXXXXX01" // Dummy phone
      },
      status: "En Route", // Possible statuses: "Scheduled", "En Route", "In Progress", "Completed", "Cancelled"
      estimatedArrivalTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins from now
      serviceAddress: "123, Koramangala, Bangalore, 560034",
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
      fetchBookingDetails(bookingId)
        .then(data => {
          if (data) {
            setBookingDetails(data);
          } else {
            setError("Booking not found or invalid ID.");
          }
        })
        .catch(err => {
          console.error("Error fetching booking:", err);
          setError("Failed to load booking details.");
        })
        .finally(() => setLoading(false));
    } else {
      setError("No booking ID provided.");
      setLoading(false);
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading booking details...</p>
      </div>
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500">
        <Info className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-xl font-semibold text-destructive mb-2">{error || "Booking Not Found"}</h1>
        <p className="text-muted-foreground mb-6">Please check the booking ID or contact support.</p>
        <Button onClick={() => router.push('/')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
      </div>
    );
  }
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "En Route": return <Clock className="h-5 w-5 text-blue-500 mr-2" />;
      case "In Progress": return <Loader2 className="h-5 w-5 text-orange-500 mr-2 animate-spin" />;
      case "Completed": return <CheckCircle className="h-5 w-5 text-green-500 mr-2" />;
      default: return <Info className="h-5 w-5 text-muted-foreground mr-2" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="shadow-xl bg-card">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            Track Your Service
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Booking ID: {bookingDetails.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Provider Info */}
          <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
            <Image
              src={bookingDetails.provider.profileImageUrl || `https://placehold.co/80x80.png`}
              alt={bookingDetails.provider.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-foreground">{bookingDetails.provider.name}</p>
              <p className="text-sm text-muted-foreground">{bookingDetails.provider.serviceTypes.join(', ')}</p>
            </div>
          </div>

          {/* Status & ETA */}
          <Card className="bg-secondary">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center">
                {getStatusIcon(bookingDetails.status)}
                <p className="text-lg font-medium text-secondary-foreground">Status: {bookingDetails.status}</p>
              </div>
              {bookingDetails.status === "En Route" && bookingDetails.estimatedArrivalTime && (
                <div className="flex items-center text-sm text-muted-foreground">
                   <Clock className="h-4 w-4 mr-2"/>
                   Estimated Arrival: {new Date(bookingDetails.estimatedArrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Map Placeholder */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center p-4 shadow">
            <MapPin className="h-12 w-12 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground text-center">Live map tracking would appear here. (Feature under development)</p>
          </div>
          <p className="text-xs text-center text-muted-foreground">Service Address: {bookingDetails.serviceAddress}</p>


          {/* Contact Options */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="mr-2 h-5 w-5" /> Call {bookingDetails.provider.name.split(' ')[0]}
            </Button>
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <MessageSquare className="mr-2 h-5 w-5" /> Message
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">Contact options are simulated for this demo.</p>
        </CardContent>
      </Card>
    </div>
  );
}
