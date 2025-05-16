"use client"; // Add this directive

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, CalendarDays, Info, MessageCircle } from "lucide-react"; // Using MessageCircle for WhatsApp
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy booking data - slightly adjusted for provider info
const dummyBookings = [
  { 
    id: "dummy-booking-123", 
    service: "House Painting", 
    provider: { name: "Priya Sharma", phone: "9876543210" }, // Example phone
    date: "2024-08-15", 
    status: "Completed", 
    link: "/track-service/dummy-booking-123" 
  },
  { 
    id: "booking-456", 
    service: "Garden Maintenance", 
    provider: { name: "Rohan Gowda", phone: "9876543211" }, // Example phone
    date: "2024-09-05", 
    status: "Scheduled", 
    link: "/track-service/dummy-booking-123" // Assuming track service page can handle different bookings
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
  contactOnWhatsApp: "WhatsApp" // New string
};
  
export default function MyBookingsPage() {
  const handleWhatsAppClick = (providerName: string, providerPhone: string) => {
    // In a real app, you'd construct a WhatsApp link:
    // const whatsappLink = `https://wa.me/${providerPhone}?text=Hello%20${providerName},%20I%20have%20a%20query%20regarding%20my%20booking.`;
    // window.open(whatsappLink, '_blank');
    alert(`Simulating WhatsApp chat with ${providerName}. In a real app, this would open WhatsApp.`);
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
                  <span className={`text-xs font-medium px-2 py-1 rounded-full self-start ${booking.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {booking.status}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <Link href={booking.link} passHref>
                      <Button variant="link" className="text-primary text-sm p-0 h-auto">{t.trackViewDetails}</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => handleWhatsAppClick(booking.provider.name, booking.provider.phone)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> {t.contactOnWhatsApp}
                    </Button>
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
    </div>
  );
}
