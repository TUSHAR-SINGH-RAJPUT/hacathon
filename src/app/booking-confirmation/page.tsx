
"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, CreditCard, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";

export default function BookingConfirmationPage() {
  const { cart, customerAddress, setCustomerAddress, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [address, setAddress] = useState(customerAddress || "");
  const [paymentMethod, setPaymentMethod] = useState<"Cash on Delivery" | "Online Payment" | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      toast({
        title: "Your Job List is Empty",
        description: "Please add professionals to your job list before proceeding to booking.",
        variant: "destructive",
      });
      router.push("/browse-providers");
    }
  }, [cart, router, toast]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setCustomerAddress(e.target.value); // Update context as user types
  };

  const handleConfirmBooking = () => {
    if (!address.trim()) {
      toast({ title: "Address Required", description: "Please enter a service address.", variant: "destructive" });
      return;
    }
    if (!paymentMethod) {
      toast({ title: "Payment Method Required", description: "Please select a payment method.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    // Simulate booking process
    console.log("Booking Details:", {
      providers: cart.map(p => ({ id: p.id, name: p.name })),
      address,
      paymentMethod,
      bookingDate: new Date().toISOString(),
    });

    setTimeout(() => {
      toast({
        title: "Booking Confirmed (Simulated)!",
        description: `Your request with ${cart.map(p => p.name).join(', ')} has been submitted. You will be contacted shortly.`,
        action: <Button onClick={() => router.push(`/track-service/dummy-booking-123`)}>Track Service</Button>
      });
      clearCart(); // Clear cart after successful "booking"
      setIsSubmitting(false);
      // For now, redirect to a conceptual tracking page, or homepage.
      // router.push(`/track-service/dummy-booking-123`); // Replace dummy-booking-123 with actual ID
      router.push('/'); 
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] animate-in fade-in duration-500">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Job List Empty</h1>
        <p className="text-muted-foreground mb-6">Redirecting you to find professionals...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            Confirm Your Service Booking
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please review your selected professionals, provide service address, and choose a payment method.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-card-foreground">Selected Professionals:</h3>
            <ul className="space-y-3">
              {cart.map(provider => (
                <li key={provider.id} className="flex items-center gap-3 p-3 bg-background rounded-md shadow-sm">
                  <Image 
                    src={provider.profileImageUrl || `https://placehold.co/50x50.png`} 
                    alt={provider.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">{provider.serviceTypes.join(', ')}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Label htmlFor="service-address" className="text-lg font-semibold mb-2 flex items-center text-card-foreground">
              <MapPin className="h-5 w-5 mr-2 text-primary" /> Service Address
            </Label>
            <Input 
              id="service-address"
              placeholder="Enter your full address, including area and pincode"
              value={address}
              onChange={handleAddressChange}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground mt-1">This is where the service will be performed.</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3 text-card-foreground">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={(value: "Cash on Delivery" | "Online Payment") => setPaymentMethod(value)}>
              <div className="space-y-3">
                <Label 
                  htmlFor="cod" 
                  className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-secondary has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="Cash on Delivery" id="cod" />
                  <DollarSign className="h-6 w-6 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">Cash on Delivery</span>
                    <p className="text-sm text-muted-foreground">Pay directly to the professional after service.</p>
                  </div>
                </Label>
                <Label 
                  htmlFor="online" 
                  className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-secondary has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="Online Payment" id="online" />
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">Online Payment (UPI/Card)</span>
                    <p className="text-sm text-muted-foreground">Pay securely online. (This is a simulated option)</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            size="lg" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleConfirmBooking}
            disabled={isSubmitting || cart.length === 0}
          >
            {isSubmitting ? "Processing..." : "Confirm & Book Service"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
