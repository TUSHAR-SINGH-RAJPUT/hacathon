
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, CalendarDays, Info, MessageCircle } from "lucide-react"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Removed: import { useEffect, useState } from "react";
// Removed: import { getDictionary } from '@/lib/dictionaries';
// Removed: import { useParams } from "next/navigation";

const dummyBookings = [
  { 
    id: "dummy-booking-123", 
    service: "House Painting", 
    provider: { name: "Priya Sharma", phone: "9876543210" }, 
    date: "2024-08-15", 
    status: "Completed", 
    linkKey: "dummy-booking-123" 
  },
  { 
    id: "booking-456", 
    service: "Garden Maintenance", 
    provider: { name: "Rohan Gowda", phone: "9876543211" }, 
    date: "2024-09-05", 
    status: "Scheduled", 
    linkKey: "booking-456" 
  },
];

interface MyBookingsPageContentProps {
  t: any;
  locale: string;
}
  
export default function MyBookingsPageContent({ t, locale }: MyBookingsPageContentProps) {
  const handleWhatsAppClick = (providerName: string, providerPhone: string) => {
    alert(`Simulating WhatsApp chat with ${providerName}. In a real app, this would open WhatsApp.`);
  };

  if (Object.keys(t).length === 0) {
    return <div>Loading translations...</div>; 
  }

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <ListOrdered className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.myBookings || "My Bookings"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.viewManageBookings || "View and manage your past and upcoming service bookings."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {dummyBookings.length > 0 ? (
            dummyBookings.map(booking => (
              <Card key={booking.id} className="bg-background p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{booking.service}</h3>
                    <p className="text-sm text-muted-foreground">{t.with || "With"}: {booking.provider.name}</p>
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
                    <Link href={`/${locale}/track-service/${booking.linkKey}`} passHref>
                      <Button variant="link" className="text-primary text-sm p-0 h-auto">{t.trackViewDetails || "Track / View Details"}</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => handleWhatsAppClick(booking.provider.name, booking.provider.phone)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> {t.contactOnWhatsApp || "WhatsApp"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-6">
              <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">{t.noBookingsYet || "You have no bookings yet."}</p>
              <Link href={`/${locale}/browse-providers`} passHref>
                <Button variant="outline" className="mt-4 text-primary border-primary">{t.findServices || "Find Services"}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
