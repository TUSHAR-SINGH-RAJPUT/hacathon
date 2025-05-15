
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { serviceCategories } from '@/components/providers/dummyData'; // Using existing categories
import type { ServiceCategory } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription as UiCardDescription } from "@/components/ui/card"; // Renamed to avoid conflict
import { User, Mail, Phone, MapPinIcon, Briefcase, Settings, DollarSign, Image as ImageIcon, Info, ShieldCheck, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const providerFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().optional(), // Making phone optional for now
  location: z.string().min(3, { message: "Location is required." }).max(100),
  serviceTypes: z.array(z.string()).min(1, { message: "Please select at least one service type." }),
  experienceYears: z.coerce.number().min(0, { message: "Experience must be a positive number." }).max(50),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters." }).max(1000),
  hourlyRate: z.string().optional(), // e.g., "200-400" or "Contact for quote"
  profileImageUrl: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success || val.startsWith('https://placehold.co'), {
    message: "Please enter a valid URL for profile image or leave blank for placeholder.",
  }),
  // Verification fields
  aadhaarNumber: z.string().optional().refine(val => !val || /^\d{4}\s\d{4}\s\d{4}$/.test(val) || /^\d{12}$/.test(val), {
    message: "Enter a valid 12-digit Aadhaar number (optionally with spaces)."
  }),
  panNumber: z.string().optional().refine(val => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
    message: "Enter a valid PAN card number (e.g., ABCDE1234F)."
  }),
  otherDocumentsDetails: z.string().max(500, { message: "Details too long, max 500 characters."}).optional(),
});

export default function ProviderRegistrationForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof providerFormSchema>>({
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
      aadhaarNumber: "",
      panNumber: "",
      otherDocumentsDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof providerFormSchema>) {
    // Simulate form submission
    console.log("Provider Registration Data:", values);
    toast({
      title: "Registration Submitted (Simulated)",
      description: "Thank you for registering! Your profile and documents will be reviewed for verification.",
    });
    // form.reset(); // Optionally reset form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="h-4 w-4 mr-2 text-primary" />Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Priya Sharma" {...field} />
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
                    <FormLabel className="flex items-center"><Mail className="h-4 w-4 mr-2 text-primary" />Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., priya.sharma@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary" />Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="e.g., +91 XXXXXXXXXX" {...field} />
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
                    <FormLabel className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2 text-primary" />Primary Service Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bangalore, Karnataka" {...field} />
                    </FormControl>
                    <FormDescription>City, State where you primarily offer services.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="serviceTypes"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center"><Settings className="h-4 w-4 mr-2 text-primary" />Services You Offer</FormLabel>
                  <FormDescription>Select all services you are proficient in.</FormDescription>
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
                              className="flex flex-row items-center space-x-3 space-y-0 p-3 bg-secondary/30 rounded-md"
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
                              <FormLabel className="font-normal text-sm text-foreground">
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

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Briefcase className="h-4 w-4 mr-2 text-primary" />Years of Experience</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} />
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
                    <FormLabel className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-primary" />Typical Hourly Rate (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., ₹300-₹500 or 'Contact for quote'" {...field} />
                    </FormControl>
                    <FormDescription>Provide a range or indicate custom quotes.</FormDescription>
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
                  <FormLabel className="flex items-center"><Info className="h-4 w-4 mr-2 text-primary" />About You / Your Services</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your skills, experience, and what makes your service stand out."
                      className="resize-y min-h-[100px]"
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
                  <FormLabel className="flex items-center"><ImageIcon className="h-4 w-4 mr-2 text-primary" />Profile Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/your-image.png or https://placehold.co/..." {...field} />
                  </FormControl>
                  <FormDescription>Link to your professional photo. If blank, a placeholder will be used.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl">Identity & Document Verification</CardTitle>
            <UiCardDescription className="text-muted-foreground">
              This information is required for verification purposes and will be kept confidential.
              Actual document upload functionality would be part of a full implementation.
            </UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary" />Aadhaar Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXX XXXX XXXX" {...field} />
                  </FormControl>
                  <FormDescription>Enter your 12-digit Aadhaar number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2 text-primary" />PAN Card Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="ABCDE1234F" {...field} />
                  </FormControl>
                  <FormDescription>Enter your 10-character PAN number.</FormDescription>
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
                      placeholder="e.g., Trade license details, previous work certifications, etc. Mention any documents you can provide for verification."
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
            Register as a Provider
          </Button>
        </div>
      </form>
    </Form>
  );
}

    