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
import { serviceCategories as allServiceCategories } from '@/components/providers/dummyData'; 

const urgencyLevels = ["Urgent (ASAP)", "Within a week", "Flexible (within a month)"];
const jobSizes = ["Small (e.g., minor repair, single room)", "Medium (e.g., multiple rooms, larger task)", "Large (e.g., full renovation, extensive work)"];

const createFormSchema = (translations: any) => {
  const t = translations.validationMessages || {};
  return z.object({
    jobTitle: z.string().min(5, { message: t.jobTitleMin || "Job title must be at least 5 characters." }).max(100),
    jobDescription: z.string().min(20, { message: t.jobDescriptionMin || "Description must be at least 20 characters." }).max(1000),
    serviceType: z.enum(allServiceCategories.map(sc => sc.value) as [ServiceCategory, ...ServiceCategory[]], { 
      errorMap: () => ({ message: t.serviceTypeRequired || "Please select a service type." }),
    }),
    location: z.string().min(3, { message: t.locationMin || "Location is required." }).max(100),
    urgency: z.string().refine(value => urgencyLevels.includes(value), { message: t.urgencyRequired || "Please select an urgency level." }),
    size: z.string().refine(value => jobSizes.includes(value), { message: t.sizeRequired || "Please select the job size." }),
    numberOfPeople: z.coerce.number().min(1, t.numberOfPeopleMin || "At least 1 person required").optional(),
  }).refine(data => {
    if ((data.size.startsWith("Medium") || data.size.startsWith("Large")) && (data.numberOfPeople === undefined || data.numberOfPeople < 1)) {
      return false;
    }
    return true;
  }, {
    message: t.numberOfPeopleRequiredForMediumLarge || "Number of people is required for medium or large jobs.",
    path: ["numberOfPeople"], 
  });
};


interface JobPostingFormProps {
  translations: any; 
  locale: string;
}

export default function JobPostingForm({ translations: t, locale }: JobPostingFormProps) {
  const { toast } = useToast();
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimationResult, setEstimationResult] = useState<EstimateJobPriceOutput | null>(null);
  const [estimationError, setEstimationError] = useState<string | null>(null);

  const formSchema = createFormSchema(t); 

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
        title: t.validationError || "Validation Error",
        description: t.validationErrorDesc || "Please fill in all required fields correctly.",
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
        title: t.priceEstimated || "Price Estimated!",
        description: `${t.estimatedRange || 'Estimated Range:'}: ${result.estimatedPriceRange}`,
      });
    } catch (error) {
      console.error("Error estimating price:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during estimation.";
      setEstimationError(errorMessage);
      toast({
        title: t.estimationFailed || "Estimation Failed",
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
      title: t.jobPostedSimulated || "Job Posted (Simulated)",
      description: t.jobPostedSimulatedDesc || "Your job request has been successfully submitted.",
    });
    form.reset();
    setEstimationResult(null);
    setEstimationError(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <Card className="bg-card/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><Info className="text-primary"/>{t.coreJobDetails || "Core Job Details"}</CardTitle>
            <UiCardDescription>{t.coreJobDetailsDesc || "Start by telling us the basics."}</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Tag className="text-primary h-4 w-4"/>{t.jobTitle || "Job Title"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.jobTitlePlaceholder || "e.g., Interior Wall Painting"} {...field} />
                  </FormControl>
                  <FormDescription>{t.jobTitleDescription || "A clear title attracts pros."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Briefcase className="text-primary h-4 w-4"/>{t.serviceType || "Service Type"}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectServicePlaceholder || "Select a service"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allServiceCategories.map(category => ( 
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
                  <FormLabel className="flex items-center gap-2"><MessageSquare className="text-primary h-4 w-4"/>{t.detailedJobDescription || "Detailed Description"}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.jobDescriptionPlaceholder || "Describe the work..."}
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t.jobDescriptionHint || "More details mean better quotes."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><MapPin className="text-primary"/>{t.locationAndUrgency || "Location & Urgency"}</CardTitle>
             <UiCardDescription>{t.locationAndUrgencyDesc || "Where and when?"}</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MapPin className="text-primary h-4 w-4"/>{t.jobLocation || "Job Location"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.locationPlaceholder || "e.g., Your Area, City"} {...field} />
                  </FormControl>
                  <FormDescription>{t.locationDescription || "Specify where service is needed."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Clock className="text-primary h-4 w-4"/>{t.urgencyLevel || "Urgency Level"}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.urgencyPlaceholder || "How soon?"} />
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
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><CalendarCheck2 className="text-primary"/>{t.scopeAndTeam || "Scope & Team"}</CardTitle>
            <UiCardDescription>{t.scopeAndTeamDesc || "Define job scale."}</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
             <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Users className="text-primary h-4 w-4"/>{t.estimatedJobSize || "Estimated Job Size"}</FormLabel>
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
                        <SelectValue placeholder={t.jobSizePlaceholder || "Estimate size"} />
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
                    <FormLabel className="flex items-center gap-2"><Users className="text-primary h-4 w-4" />{t.numberOfProfessionals || "No. of Professionals"}</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder={t.numberOfProfessionalsPlaceholder || "e.g., 1"} {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)}
                      />
                    </FormControl>
                    <FormDescription>{t.numberOfProfessionalsDescription || "For medium/large jobs."}</FormDescription>
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
            <AlertTitle className="font-semibold text-lg text-primary">{t.aiPriceEstimation || "AI Price Estimation"}</AlertTitle>
            <AlertDescription className="space-y-1">
              <p className="font-medium text-xl">{t.estimatedRange || "Estimated Range"}: {estimationResult.estimatedPriceRange}</p>
              <p className="text-md">{t.factorsConsidered || "Factors considered"}: {estimationResult.factorsConsidered}</p>
              <p className="text-xs mt-2 ">{t.aiNote || "Note: AI estimate."}</p>
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
            {t.getAIPriceEstimate || "Get AI Price Estimate (₹)"}
          </Button>
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isEstimating}>
            {t.postJobAndFind || "Post Job & Find Pros"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
