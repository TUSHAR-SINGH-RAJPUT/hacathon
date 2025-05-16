
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { estimateJobPrice, EstimateJobPriceInput, EstimateJobPriceOutput } from "@/ai/flows/estimate-job-price";
import React, { useState } from "react";
import { Loader2, Wand2, Users, Briefcase, MessageSquare, MapPin, Clock, CalendarCheck2, Tag, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription as UiCardDescription } from "@/components/ui/card";
import type { ServiceCategory } from "@/types";

const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "Painting", label: "Painting" },
  { value: "Gardening", label: "Gardening" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Electrical", label: "Electrical" },
  { value: "Handyman", label: "General Handyman" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Other", label: "Other" },
];

const urgencyLevels = ["Urgent (ASAP)", "Within a week", "Flexible (within a month)"];
const jobSizes = ["Small (e.g., minor repair, single room)", "Medium (e.g., multiple rooms, larger task)", "Large (e.g., full renovation, extensive work)"];

const formSchema = z.object({
  jobTitle: z.string().min(5, { message: "Job title must be at least 5 characters." }).max(100),
  jobDescription: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000),
  serviceType: z.enum(serviceCategories.map(sc => sc.value) as [ServiceCategory, ...ServiceCategory[]], {
    errorMap: () => ({ message: "Please select a service type." }),
  }),
  location: z.string().min(3, { message: "Location is required." }).max(100),
  urgency: z.string().refine(value => urgencyLevels.includes(value), { message: "Please select an urgency level." }),
  size: z.string().refine(value => jobSizes.includes(value), { message: "Please select the job size." }),
  numberOfPeople: z.coerce.number().min(1, "At least 1 person required").optional(),
}).refine(data => {
  if ((data.size.startsWith("Medium") || data.size.startsWith("Large")) && (data.numberOfPeople === undefined || data.numberOfPeople < 1)) {
    return false;
  }
  return true;
}, {
  message: "Number of people is required for medium or large jobs.",
  path: ["numberOfPeople"], 
});

export default function JobPostingForm() {
  const { toast } = useToast();
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimationResult, setEstimationResult] = useState<EstimateJobPriceOutput | null>(null);
  const [estimationError, setEstimationError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      location: "",
      serviceType: undefined,
      urgency: undefined,
      size: undefined,
      numberOfPeople: undefined,
    },
  });

  const watchSize = form.watch("size");
  const showNumberOfPeople = watchSize && (watchSize.startsWith("Medium") || watchSize.startsWith("Large"));

  async function handleEstimatePrice() {
    const values = form.getValues();
    const parseResult = formSchema.safeParse(values);

    if (!parseResult.success) {
      form.trigger(); 
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly before estimating. Medium/Large jobs require number of people.",
        variant: "destructive",
      });
      return;
    }
    
    setIsEstimating(true);
    setEstimationResult(null);
    setEstimationError(null);

    try {
      const estimateInput: EstimateJobPriceInput = {
        jobDescription: values.jobDescription,
        location: values.location,
        serviceType: values.serviceType,
        urgency: values.urgency,
        size: values.size,
      };
      const result = await estimateJobPrice(estimateInput);
      setEstimationResult(result);
      toast({
        title: "Price Estimated!",
        description: `Suggested range: ${result.estimatedPriceRange}`,
      });
    } catch (error) {
      console.error("Error estimating price:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during estimation.";
      setEstimationError(errorMessage);
      toast({
        title: "Estimation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsEstimating(false);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    toast({
      title: "Job Posted (Simulated)",
      description: "Your job request has been successfully submitted. Professionals will be notified.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <Card className="bg-card/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><Info className="text-primary"/>Core Job Details</CardTitle>
            <UiCardDescription>Start by telling us the basics of what you need.</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Tag className="text-primary h-4 w-4"/>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Interior Wall Painting for 2BHK" {...field} />
                  </FormControl>
                  <FormDescription>A clear, concise title helps attract the right pros (max 100 characters).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Briefcase className="text-primary h-4 w-4"/>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceCategories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MessageSquare className="text-primary h-4 w-4"/>Detailed Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the work thoroughly: tasks, materials (yours or pro's), measurements, special instructions. More details mean better quotes!"
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Be specific for accurate understanding (min 20, max 1000 characters).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><MapPin className="text-primary"/>Location & Urgency</CardTitle>
             <UiCardDescription>Help us understand where and when the job needs to be done.</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MapPin className="text-primary h-4 w-4"/>Job Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Your Area, City, Pincode (India)" {...field} />
                  </FormControl>
                  <FormDescription>Specify where the service is needed (e.g., "Koramangala, Bangalore" or "560095").</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Clock className="text-primary h-4 w-4"/>Urgency Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How soon do you need it?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {urgencyLevels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="bg-card/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><CalendarCheck2 className="text-primary"/>Scope & Team</CardTitle>
            <UiCardDescription>Define the scale of the job.</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
             <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Users className="text-primary h-4 w-4"/>Estimated Job Size</FormLabel>
                  <Select onValueChange={(value) => {
                      field.onChange(value);
                      if (!value.startsWith("Medium") && !value.startsWith("Large")) {
                          form.setValue("numberOfPeople", undefined); 
                          form.clearErrors("numberOfPeople");
                      } else if (form.getValues("numberOfPeople") === undefined) {
                          form.setValue("numberOfPeople", 1); 
                      }
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Estimate the job size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobSizes.map(size => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showNumberOfPeople && (
              <FormField
                control={form.control}
                name="numberOfPeople"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Users className="text-primary h-4 w-4" />Number of Professionals Needed (Estimate)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="e.g., 1 or 2" {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)}
                      />
                    </FormControl>
                    <FormDescription>For medium or large jobs, how many people might be required?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {estimationResult && (
          <Alert variant="default" className="bg-secondary text-secondary-foreground border-primary/30 shadow-lg">
            <Wand2 className="h-6 w-6 text-primary" />
            <AlertTitle className="font-semibold text-lg text-primary">AI Price Estimation</AlertTitle>
            <AlertDescription className="space-y-1">
              <p className="font-medium text-xl">Estimated Range: {estimationResult.estimatedPriceRange}</p>
              <p className="text-md">Factors considered: {estimationResult.factorsConsidered}</p>
              <p className="text-xs mt-2 ">Note: This is an AI-generated estimate for budgetary purposes. Actual bids from professionals may vary.</p>
            </AlertDescription>
          </Alert>
        )}

        {estimationError && (
          <Alert variant="destructive">
            <AlertTitle>Estimation Error</AlertTitle>
            <AlertDescription>{estimationError}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleEstimatePrice}
            disabled={isEstimating}
            className="w-full sm:w-auto text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {isEstimating ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            Get AI Price Estimate (₹)
          </Button>
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isEstimating}>
            Post Job & Find Professionals
          </Button>
        </div>
      </form>
    </Form>
  );
}
