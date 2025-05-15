
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, CalendarDays, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy booking data
const dummyBookings = [
  { id: "dummy-booking-123", service: "House Painting", provider: "Priya Sharma", date: "2024-08-15", status: "Completed", link: "/track-service/dummy-booking-123"},
  { id: "booking-456", service: "Garden Maintenance", provider: "Rohan Gowda", date: "2024-09-05", status: "Scheduled", link: "/track-service/dummy-booking-123"},
];

export default function MyBookingsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <ListOrdered className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            My Bookings
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            View and manage your past and upcoming service bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {dummyBookings.length > 0 ? (
            dummyBookings.map(booking => (
              <Card key={booking.id} className="bg-background p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{booking.service}</h3>
                    <p className="text-sm text-muted-foreground">With: {booking.provider}</p>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4"/> {new Date(booking.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${booking.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {booking.status}
                  </span>
                  <Link href={booking.link || `/track-service/${booking.id}`} passHref>
                    <Button variant="link" className="text-primary text-sm p-0 h-auto">Track / View Details</Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-6">
              <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">You have no bookings yet.</p>
              <Link href="/browse-providers" passHref>
                <Button variant="outline" className="mt-4 text-primary border-primary">Find Services</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
