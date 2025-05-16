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
import type { ProviderRegistrationData } from './ProviderRegistrationForm'; 
import { useRouter } from 'next/navigation';

const documentVerificationSchema = z.object({
  aadhaarNumber: z.string()
    .min(1, { message: "Aadhaar number is required." })
    .refine(val => /^\d{4}\s?\d{4}\s?\d{4}$/.test(val) || /^\d{12}$/.test(val), {
      message: "Enter a valid 12-digit Aadhaar number (e.g., XXXX XXXX XXXX or XXXXXXXXXXXX)."
  }),
  panNumber: z.string()
    .min(1, { message: "PAN card number is required." })
    .refine(val => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase()), {
      message: "Enter a valid PAN card number (e.g., ABCDE1234F)."
  }),
  otherDocumentsDetails: z.string().max(500, { message: "Details too long, max 500 characters."}).optional(),
});

interface DocumentVerificationFormProps {
  translations: any;
}

interface StoredProviderData extends Omit<ProviderRegistrationData, 'resume'> { 
  resumeFileName?: string;
}

export default function DocumentVerificationForm({ translations: t }: DocumentVerificationFormProps) {
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
    let initialData: StoredProviderData | null = null;
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem('providerRegistrationData');
      if (storedData) {
        initialData = JSON.parse(storedData) as StoredProviderData;
      }
    }

    if (!initialData) {
      toast({
        title: t.error,
        description: t.couldNotRetrieveInitialData,
        variant: "destructive",
      });
      router.push(`/join-as-pro`); 
      return;
    }

    const completeRegistrationData = {
      ...initialData, 
      ...values,
    };

    console.log("Complete Provider Registration Data:", completeRegistrationData);
    toast({
      title: t.registrationSubmittedSuccessfully,
      description: t.profileWillBeReviewed,
    });
    
    if (typeof window !== "undefined") {
      sessionStorage.removeItem('providerRegistrationData'); 
    }
    form.reset(); 
    router.push(`/`); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl">{t.requiredDocuments}</CardTitle>
            <UiCardDescription className="text-muted-foreground">
              {t.documentUploadNote}
            </UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary" />{t.aadhaarNumber}</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXX XXXX XXXX or XXXXXXXXXXXX" {...field} onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))} />
                  </FormControl>
                  <FormDescription>{t.aadhaarDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary" />{t.panNumber}</FormLabel>
                  <FormControl>
                    <Input placeholder="ABCDE1234F" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                  </FormControl>
                  <FormDescription>{t.panDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherDocumentsDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><FileText className="h-4 w-4 mr-2 text-primary" />{t.otherDocumentsDetails}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.otherDocumentsPlaceholder || "e.g., Trade license details, previous work certifications, etc. List any documents you can provide for verification."}
                      className="resize-y min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t.otherDocumentsDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <div className="pt-6">
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            {t.completeRegistration}
          </Button>
        </div>
      </form>
    </Form>
  );
}
