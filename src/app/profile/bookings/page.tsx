
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, CalendarDays, Info, MessageCircle, Star, Send } from "lucide-react"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from 'react'; // Import useState
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Dummy booking data - slightly adjusted for provider info
const dummyBookings = [
  { 
    id: "dummy-booking-123", 
    service: "House Painting", 
    provider: { name: "Priya Sharma", phone: "9876543210", id: "1" },
    date: "2024-08-15", 
    status: "Completed", 
    link: "/track-service/dummy-booking-123" 
  },
  { 
    id: "booking-456", 
    service: "Garden Maintenance", 
    provider: { name: "Rohan Gowda", phone: "9876543211", id: "2" },
    date: "2024-09-05", 
    status: "Scheduled", 
    link: "/track-service/dummy-booking-123"
  },
  { 
    id: "booking-789", 
    service: "Plumbing Repair", 
    provider: { name: "Ananya Reddy", phone: "9876543212", id: "3" },
    date: "2024-07-20", 
    status: "Completed", 
    link: "/track-service/dummy-booking-123"
  },
];
  
// Hardcoded English strings
const t = {
  myBookings: "My Bookings",
  viewManageBookings: "View and manage your past and upcoming service bookings.",
  with: "With",
  trackViewDetails: "Track / View Details",
  noBookingsYet: "You have no bookings yet.",
  findServices: "Find Services",
  contactOnWhatsApp: "WhatsApp",
  rateExperience: "Rate Experience",
  ratingSubmittedTitle: "Rating Submitted (Simulated)",
  ratingSubmittedDesc: (service: string, provider: string) => `Thank you for rating your experience for ${service} with ${provider}!`,
  // Dialog specific translations
  rateYourServiceTitle: "Rate Your Service",
  rateYourServiceDescription: (service: string, provider: string) => `Share your feedback for the ${service} provided by ${provider}.`,
  yourRating: "Your Rating",
  yourComments: "Your Comments (Optional)",
  yourCommentsPlaceholder: "Tell us more about your experience...",
  submitReview: "Submit Review",
  close: "Close",
};

// Simple StarRatingInput component for the dialog
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
  return (
    <div className="flex items-center space-x-1 py-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-7 w-7 cursor-pointer transition-colors ${
            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground hover:text-amber-300'
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};
  
export default function MyBookingsPage() {
  const { toast } = useToast();
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [currentBookingForRating, setCurrentBookingForRating] = useState<any>(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [currentComment, setCurrentComment] = useState("");

  const handleWhatsAppClick = (providerName: string, providerPhone: string) => {
    alert(`Simulating WhatsApp chat with ${providerName}. In a real app, this would open WhatsApp.`);
  };

  const handleOpenRatingDialog = (booking: any) => {
    setCurrentBookingForRating(booking);
    setCurrentRating(0); // Reset rating
    setCurrentComment(""); // Reset comment
    setIsRatingDialogOpen(true);
  };

  const handleReviewSubmit = () => {
    if (!currentBookingForRating) return;
    if (currentRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating.",
        variant: "destructive",
      });
      return;
    }

    console.log("Review Submitted (Simulated):", {
      bookingId: currentBookingForRating.id,
      service: currentBookingForRating.service,
      provider: currentBookingForRating.provider.name,
      rating: currentRating,
      comment: currentComment,
    });

    toast({
      title: t.ratingSubmittedTitle,
      description: t.ratingSubmittedDesc(currentBookingForRating.service, currentBookingForRating.provider.name),
    });
    setIsRatingDialogOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <ListOrdered className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.myBookings}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.viewManageBookings}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {dummyBookings.length > 0 ? (
            dummyBookings.map(booking => (
              <Card key={booking.id} className="bg-background p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{booking.service}</h3>
                    <p className="text-sm text-muted-foreground">{t.with}: {booking.provider.name}</p>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4"/> {new Date(booking.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full self-start ${booking.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"}`}>
                    {booking.status}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <Link href={booking.link} passHref>
                      <Button variant="link" className="text-primary text-sm p-0 h-auto">{t.trackViewDetails}</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white dark:text-green-400 dark:border-green-400 dark:hover:bg-green-500 dark:hover:text-card"
                      onClick={() => handleWhatsAppClick(booking.provider.name, booking.provider.phone)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> {t.contactOnWhatsApp}
                    </Button>
                    {booking.status === "Completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-500 dark:hover:text-card"
                        onClick={() => handleOpenRatingDialog(booking)}
                      >
                        <Star className="mr-2 h-4 w-4" /> {t.rateExperience}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-6">
              <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">{t.noBookingsYet}</p>
              <Link href="/browse-providers" passHref>
                <Button variant="outline" className="mt-4 text-primary border-primary">{t.findServices}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {currentBookingForRating && (
        <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {t.rateYourServiceTitle}
              </DialogTitle>
              <DialogDescription>
                {t.rateYourServiceDescription(currentBookingForRating.service, currentBookingForRating.provider.name)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="rating" className="block text-sm font-medium text-card-foreground">
                  {t.yourRating}
                </Label>
                <StarRatingInput rating={currentRating} setRating={setCurrentRating} />
              </div>
              <div>
                <Label htmlFor="comment" className="block text-sm font-medium text-card-foreground">
                  {t.yourComments}
                </Label>
                <Textarea
                  id="comment"
                  placeholder={t.yourCommentsPlaceholder}
                  value={currentComment}
                  onChange={(e) => setCurrentComment(e.target.value)}
                  className="min-h-[100px] bg-background text-foreground"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="text-muted-foreground border-muted-foreground/50 hover:bg-muted/20">
                  {t.close}
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleReviewSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="mr-2 h-4 w-4" /> {t.submitReview}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
