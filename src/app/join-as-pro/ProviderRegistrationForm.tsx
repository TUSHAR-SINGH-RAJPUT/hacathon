
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
import { Checkbox } from "@/components/ui/checkbox";
import { serviceCategories } from '@/components/providers/dummyData';
import type { ServiceCategory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPinIcon, Briefcase, Settings, DollarSign, ImageIcon, Info, FileUp, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import React from 'react';

const createProviderFormSchema = (t: any) => {
  const validation = t.validationMessages || {};
  return z.object({
    fullName: z.string().min(3, { message: validation.fullNameMin || "Full name must be at least 3 characters." }).max(100),
    email: z.string().email({ message: validation.emailInvalid || "Please enter a valid email address." }),
    phoneNumber: z.string().optional(),
    location: z.string().min(3, { message: validation.locationRequired || "Location is required." }).max(100),
    serviceTypes: z.array(z.string()).min(1, { message: validation.serviceTypeRequired || "Please select at least one service type." }),
    experienceYears: z.coerce.number().min(0, { message: validation.experiencePositive || "Experience must be a positive number." }).max(50),
    bio: z.string().min(20, { message: validation.bioMin || "Bio must be at least 20 characters." }).max(1000),
    hourlyRate: z.string().optional(),
    profileImageUrl: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success || val.startsWith('https://placehold.co'), {
      message: validation.profileImageInvalidUrl || "Please enter a valid URL for profile image or leave blank for placeholder.",
    }),
    resume: z.custom<FileList | undefined>((val) => val === undefined || val instanceof FileList, validation.resumeMustBeFileList || "Resume must be a FileList")
      .refine(
        (files) => files === undefined || files.length === 0 || (files.length === 1 && files[0].type === "application/pdf"),
        validation.resumeSinglePDF || "Please upload a single PDF file."
      )
      .refine(
          (files) => files === undefined || files.length === 0 || files[0].size <= 5 * 1024 * 1024, // 5MB
          validation.resumeMaxSize || `Resume file size should be less than 5MB.`
      )
      .optional(),
  });
};

export type ProviderRegistrationData = z.infer<ReturnType<typeof createProviderFormSchema>>;

interface ProviderRegistrationFormProps {
  translations: any;
}

export default function ProviderRegistrationForm({ translations: t }: ProviderRegistrationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const providerFormSchema = createProviderFormSchema(t);
  
  const form = useForm<ProviderRegistrationData>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      serviceTypes: [],
      experienceYears: 0,
      bio: "",
      hourlyRate: "",
      profileImageUrl: "",
      resume: undefined,
    },
  });

  async function onSubmit(values: ProviderRegistrationData) {
    setIsSubmitting(true);
    let resumeFileName: string | undefined = undefined;

    if (values.resume && values.resume.length > 0) {
      const file = values.resume[0];
      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await fetch('/api/upload-resume', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          toast({
            title: "Resume Upload Failed",
            description: result.message || "Could not upload resume. Please try again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        resumeFileName = result.fileName; 
        toast({
          title: "Resume Uploaded (Mock)",
          description: `${result.fileName} processed.`,
        });
      } catch (error) {
        console.error("Resume upload fetch error:", error);
        toast({
          title: "Resume Upload Error",
          description: "An error occurred while uploading the resume. Please check your connection and try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    const dataToStore = {
      ...values,
      resume: undefined, 
      resumeFileName: resumeFileName, 
    };
    
    if (typeof window !== "undefined") {
      sessionStorage.setItem('providerRegistrationData', JSON.stringify(dataToStore));
    }
    router.push(`/join-as-pro/verify-documents`);
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        
        <Card className="bg-card/70 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <User className="text-primary"/>{t.basicInformation || "Basic Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="h-4 w-4 mr-2 opacity-70" />{t.fullName || "Full Name"}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.fullNamePlaceholder || "e.g., Priya Sharma"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Mail className="h-4 w-4 mr-2 opacity-70" />{t.emailAddress || "Email Address"}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t.emailPlaceholder || "e.g., priya.sharma@example.com"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Phone className="h-4 w-4 mr-2 opacity-70" />{t.phoneNumberOptional || "Phone Number (Optional)"}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t.phoneNumberPlaceholder || "e.g., +91 XXXXXXXXXX"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2 opacity-70" />{t.primaryServiceLocation || "Primary Service Location"}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.locationPlaceholder || "e.g., Bangalore, Karnataka"} {...field} />
                    </FormControl>
                    <FormDescription>{t.locationDescription || "City, State where you primarily offer services."}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <Settings className="text-primary"/>{t.serviceDetails || "Service Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <FormField
              control={form.control}
              name="serviceTypes"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center text-base"><Settings className="h-4 w-4 mr-2 opacity-70" />{t.servicesYouOffer || "Services You Offer"}</FormLabel>
                  <FormDescription>{t.servicesDescription || "Select all services you are proficient in."}</FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    {serviceCategories.map((service) => (
                      <FormField
                        key={service.value}
                        control={form.control}
                        name="serviceTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.value}
                              className="flex flex-row items-center space-x-3 space-y-0 p-3 bg-secondary/50 rounded-md border border-border hover:bg-secondary/70 transition-colors"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), service.value])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== service.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm text-foreground cursor-pointer">
                                {service.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Briefcase className="h-4 w-4 mr-2 opacity-70" />{t.yearsOfExperience || "Years of Experience"}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t.experiencePlaceholder || "e.g., 5"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><DollarSign className="h-4 w-4 mr-2 opacity-70" />{t.typicalHourlyRateOptional || "Typical Hourly Rate (Optional)"}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.ratePlaceholder || "e.g., ₹300-₹500 or 'Contact for quote'"} {...field} />
                    </FormControl>
                    <FormDescription>{t.rateDescription || "Provide a range or indicate custom quotes."}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Info className="h-4 w-4 mr-2 opacity-70" />{t.aboutYouServices || "About You / Your Services"}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.bioPlaceholder || "Describe your skills, experience, and what makes your service stand out."}
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profileImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ImageIcon className="h-4 w-4 mr-2 opacity-70" />{t.profileImageUrlOptional || "Profile Image URL (Optional)"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.profileImageUrlPlaceholder || "https://example.com/your-image.png or https://placehold.co/..."} {...field} />
                  </FormControl>
                  <FormDescription>{t.profileImageDescription || "Link to your professional photo. If blank, a placeholder will be used."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, value, ...restField } }) => ( 
                <FormItem>
                  <FormLabel className="flex items-center"><FileUp className="h-4 w-4 mr-2 opacity-70" />{t.resumeOptionalPDF || "Resume (Optional, PDF only, max 5MB)"}</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => onChange(e.target.files)} 
                      {...restField}
                      className="pt-2"
                    />
                  </FormControl>
                  <FormDescription>{t.resumeDescription || "Upload your resume to showcase your qualifications."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <div className="pt-8 flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {t.nextDocumentVerification || "Next: Document Verification"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

