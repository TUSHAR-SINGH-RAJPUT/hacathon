
// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
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
import { serviceCategories as allServiceCategories } from '@/components/providers/dummyData'; // Import from dummyData

const urgencyLevels = ["Urgent (ASAP)", "Within a week", "Flexible (within a month)"];
const jobSizes = ["Small (e.g., minor repair, single room)", "Medium (e.g., multiple rooms, larger task)", "Large (e.g., full renovation, extensive work)"];

const formSchema = z.object({
  jobTitle: z.string().min(5, { message: "Job title must be at least 5 characters." }).max(100),
  jobDescription: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000),
  serviceType: z.enum(allServiceCategories.map(sc => sc.value) as [ServiceCategory, ...ServiceCategory[]], { // Use imported categories
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

interface JobPostingFormProps {
  translations: any; // Simplified for this example
}

export default function JobPostingForm({ translations: t }: JobPostingFormProps) {
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
        title: t.validationError,
        description: t.validationErrorDesc,
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
        title: t.priceEstimated,
        description: `${t.estimatedRange}: ${result.estimatedPriceRange}`,
      });
    } catch (error) {
      console.error("Error estimating price:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during estimation.";
      setEstimationError(errorMessage);
      toast({
        title: t.estimationFailed,
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
      title: t.jobPostedSimulated,
      description: t.jobPostedSimulatedDesc,
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
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><Info className="text-primary"/>{t.coreJobDetails}</CardTitle>
            <UiCardDescription>{t.coreJobDetailsDesc}</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Tag className="text-primary h-4 w-4"/>{t.jobTitle}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.jobTitlePlaceholder} {...field} />
                  </FormControl>
                  <FormDescription>{t.jobTitleDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Briefcase className="text-primary h-4 w-4"/>{t.serviceType}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectServicePlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allServiceCategories.map(category => ( // Use imported categories
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
                  <FormLabel className="flex items-center gap-2"><MessageSquare className="text-primary h-4 w-4"/>{t.detailedJobDescription}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.jobDescriptionPlaceholder}
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t.jobDescriptionHint}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><MapPin className="text-primary"/>{t.locationAndUrgency}</CardTitle>
             <UiCardDescription>{t.locationAndUrgencyDesc}</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MapPin className="text-primary h-4 w-4"/>{t.jobLocation}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.locationPlaceholder} {...field} />
                  </FormControl>
                  <FormDescription>{t.locationDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Clock className="text-primary h-4 w-4"/>{t.urgencyLevel}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.urgencyPlaceholder} />
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
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2"><CalendarCheck2 className="text-primary"/>{t.scopeAndTeam}</CardTitle>
            <UiCardDescription>{t.scopeAndTeamDesc}</UiCardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
             <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Users className="text-primary h-4 w-4"/>{t.estimatedJobSize}</FormLabel>
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
                        <SelectValue placeholder={t.jobSizePlaceholder} />
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
                    <FormLabel className="flex items-center gap-2"><Users className="text-primary h-4 w-4" />{t.numberOfProfessionals}</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder={t.numberOfProfessionalsPlaceholder} {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)}
                      />
                    </FormControl>
                    <FormDescription>{t.numberOfProfessionalsDescription}</FormDescription>
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
            <AlertTitle className="font-semibold text-lg text-primary">{t.aiPriceEstimation}</AlertTitle>
            <AlertDescription className="space-y-1">
              <p className="font-medium text-xl">{t.estimatedRange}: {estimationResult.estimatedPriceRange}</p>
              <p className="text-md">{t.factorsConsidered}: {estimationResult.factorsConsidered}</p>
              <p className="text-xs mt-2 ">{t.aiNote}</p>
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
            {t.getAIPriceEstimate}
          </Button>
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isEstimating}>
            {t.postJobAndFind}
          </Button>
        </div>
      </form>
    </Form>
  );
}
