
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

// Hardcoded English translations
const t = {
  jobListEmptyTitle: "Your Job List is Empty",
  jobListEmptyDesc: "Please add professionals to your job list before proceeding to booking.",
  addressRequiredTitle: "Address Required",
  addressRequiredDesc: "Please enter a service address.",
  paymentMethodRequiredTitle: "Payment Method Required",
  paymentMethodRequiredDesc: "Please select a payment method.",
  bookingConfirmedTitle: "Booking Confirmed (Simulated)!",
  bookingConfirmedDesc: (names: string) => `Your request with ${names} has been submitted. You will be contacted shortly.`,
  trackService: "Track Service",
  jobListEmptyRedirect: "Job List Empty",
  redirectingMessage: "Redirecting you to find professionals...",
  confirmBookingTitle: "Confirm Your Service Booking",
  confirmBookingDesc: "Please review your selected professionals, provide service address, and choose a payment method.",
  selectedProfessionals: "Selected Professionals:",
  serviceAddressLabel: "Service Address",
  serviceAddressPlaceholder: "Enter your full address, including area and pincode",
  serviceAddressHint: "This is where the service will be performed.",
  paymentMethodLabel: "Payment Method",
  cashOnDelivery: "Cash on Delivery",
  cashOnDeliveryDesc: "Pay directly to the professional after service.",
  onlinePayment: "Online Payment (UPI/Card)",
  onlinePaymentDesc: "Pay securely online. (This is a simulated option)",
  processing: "Processing...",
  confirmAndBook: "Confirm & Book Service"
};

export default function BookingConfirmationPage() {
  const { cart, customerAddress, setCustomerAddress, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [address, setAddress] = useState(customerAddress || "");
  const [paymentMethod, setPaymentMethod] = useState<"Cash on Delivery" | "Online Payment" | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !isSubmitting) {
      toast({
        title: t.jobListEmptyTitle,
        description: t.jobListEmptyDesc,
        variant: "destructive",
      });
      router.push("/browse-providers");
    }
  }, [cart, router, toast, isSubmitting]); // t removed from dependencies

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setCustomerAddress(e.target.value);
  };

  const handleConfirmBooking = () => {
    if (!address.trim()) {
      toast({ title: t.addressRequiredTitle, description: t.addressRequiredDesc, variant: "destructive" });
      return;
    }
    if (!paymentMethod) {
      toast({ title: t.paymentMethodRequiredTitle, description: t.paymentMethodRequiredDesc, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    console.log("Booking Details:", {
      providers: cart.map(p => ({ id: p.id, name: p.name })),
      address,
      paymentMethod,
      bookingDate: new Date().toISOString(),
    });

    setTimeout(() => {
      toast({
        title: t.bookingConfirmedTitle,
        description: t.bookingConfirmedDesc(cart.map(p => p.name).join(', ')),
        action: <Button onClick={() => router.push(`/track-service/dummy-booking-123`)}>{t.trackService}</Button>
      });
      clearCart(); 
      setIsSubmitting(false);
      router.push('/'); 
    }, 1500);
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] animate-in fade-in duration-500">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">{t.jobListEmptyRedirect}</h1>
        <p className="text-muted-foreground mb-6">{t.redirectingMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.confirmBookingTitle}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.confirmBookingDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-card-foreground">{t.selectedProfessionals}</h3>
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
              <MapPin className="h-5 w-5 mr-2 text-primary" /> {t.serviceAddressLabel}
            </Label>
            <Input 
              id="service-address"
              placeholder={t.serviceAddressPlaceholder}
              value={address}
              onChange={handleAddressChange}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground mt-1">{t.serviceAddressHint}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3 text-card-foreground">{t.paymentMethodLabel}</h3>
            <RadioGroup value={paymentMethod} onValueChange={(value: "Cash on Delivery" | "Online Payment") => setPaymentMethod(value)}>
              <div className="space-y-3">
                <Label 
                  htmlFor="cod" 
                  className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-secondary has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="Cash on Delivery" id="cod" />
                  <DollarSign className="h-6 w-6 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">{t.cashOnDelivery}</span>
                    <p className="text-sm text-muted-foreground">{t.cashOnDeliveryDesc}</p>
                  </div>
                </Label>
                <Label 
                  htmlFor="online" 
                  className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-secondary has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="Online Payment" id="online" />
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">{t.onlinePayment}</span>
                    <p className="text-sm text-muted-foreground">{t.onlinePaymentDesc}</p>
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
            {isSubmitting ? t.processing : t.confirmAndBook}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
