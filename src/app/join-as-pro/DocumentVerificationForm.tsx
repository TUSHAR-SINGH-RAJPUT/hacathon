
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from "@/components/ui/card";
import { ShieldCheck, FileText } from "lucide-react";
import type { ProviderRegistrationData } from './ProviderRegistrationForm'; // Import the type from the first form
import { useRouter } from 'next/navigation';

const documentVerificationSchema = z.object({
  aadhaarNumber: z.string()
    .min(1, { message: "Aadhaar number is required." })
    .refine(val => /^\d{4}\s?\d{4}\s?\d{4}$/.test(val) || /^\d{12}$/.test(val), { // Allow with or without spaces
      message: "Enter a valid 12-digit Aadhaar number (e.g., XXXX XXXX XXXX or XXXXXXXXXXXX)."
  }),
  panNumber: z.string()
    .min(1, { message: "PAN card number is required." })
    .refine(val => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase()), {
      message: "Enter a valid PAN card number (e.g., ABCDE1234F)."
  }),
  otherDocumentsDetails: z.string().max(500, { message: "Details too long, max 500 characters."}).optional(),
});

export default function DocumentVerificationForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof documentVerificationSchema>>({
    resolver: zodResolver(documentVerificationSchema),
    defaultValues: {
      aadhaarNumber: "",
      panNumber: "",
      otherDocumentsDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof documentVerificationSchema>) {
    let initialData: ProviderRegistrationData | null = null;
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem('providerRegistrationData');
      if (storedData) {
        initialData = JSON.parse(storedData);
      }
    }

    if (!initialData) {
      toast({
        title: "Error",
        description: "Could not retrieve initial registration data. Please start over.",
        variant: "destructive",
      });
      router.push('/join-as-pro'); // Redirect to the first step
      return;
    }

    const completeRegistrationData = {
      ...initialData,
      ...values,
    };

    console.log("Complete Provider Registration Data:", completeRegistrationData);
    toast({
      title: "Registration Submitted Successfully!",
      description: "Thank you for registering. Your profile and documents will be reviewed for verification.",
    });
    
    if (typeof window !== "undefined") {
      sessionStorage.removeItem('providerRegistrationData'); // Clean up session storage
    }
    // Optionally redirect to a thank you page or dashboard
    // router.push('/'); 
    form.reset(); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl">Required Documents</CardTitle>
            <UiCardDescription className="text-muted-foreground">
              Actual document upload functionality would be part of a full backend implementation. For now, please provide the numbers.
            </UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary" />Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXX XXXX XXXX or XXXXXXXXXXXX" {...field} onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))} />
                  </FormControl>
                  <FormDescription>Enter your 12-digit Aadhaar number. It will be stored without spaces.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary" />PAN Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ABCDE1234F" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                  </FormControl>
                  <FormDescription>Enter your 10-character PAN number. It will be stored in uppercase.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherDocumentsDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><FileText className="h-4 w-4 mr-2 text-primary" />Other Relevant Documents (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Trade license details, previous work certifications, etc. List any documents you can provide for verification."
                      className="resize-y min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    List any other documents or certifications that can help verify your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <div className="pt-6">
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            Complete Registration & Submit for Verification
          </Button>
        </div>
      </form>
    </Form>
  );
}
