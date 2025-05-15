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
import { Loader2, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ServiceCategory } from "@/types";

const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "Painting", label: "Painting" },
  { value: "Gardening", label: "Gardening" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Electrical", label: "Electrical" },
  { value: "Handyman", label: "General Handyman" },
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
    },
  });

  async function handleEstimatePrice() {
    const values = form.getValues();
    const validationResult = formSchema.safeParse(values);

    if (!validationResult.success) {
      // Trigger validation display for all fields
      form.trigger();
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly before estimating.",
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
    // Actual job posting logic is out of scope for this UI scaffold.
    // This would typically involve sending data to a backend API.
    console.log("Form submitted:", values);
    toast({
      title: "Job Posted (Simulated)",
      description: "Your job request has been successfully submitted.",
    });
    // form.reset(); // Optionally reset form
    // setEstimationResult(null); // Clear estimation
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Interior Wall Painting" {...field} />
              </FormControl>
              <FormDescription>A clear and concise title for your job.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
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
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide details about the job: tasks, materials, special requirements, etc."
                  className="resize-y min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>The more details you provide, the better the estimates and bids.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Your City, State or Zip Code" {...field} />
              </FormControl>
              <FormDescription>Where the job needs to be performed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency</FormLabel>
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

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        </div>

        {estimationResult && (
          <Alert variant="default" className="bg-secondary text-secondary-foreground">
            <Wand2 className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary">AI Price Estimation</AlertTitle>
            <AlertDescription>
              <p className="font-medium text-lg">Estimated Range: {estimationResult.estimatedPriceRange}</p>
              <p className="text-sm mt-1">Factors considered: {estimationResult.factorsConsidered}</p>
              <p className="text-xs mt-2 text-muted-foreground">Note: This is an AI-generated estimate. Actual bids may vary.</p>
            </AlertDescription>
          </Alert>
        )}

        {estimationError && (
          <Alert variant="destructive">
            <AlertTitle>Estimation Error</AlertTitle>
            <AlertDescription>{estimationError}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleEstimatePrice}
            disabled={isEstimating}
            className="w-full sm:w-auto text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {isEstimating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Get AI Price Estimate
          </Button>
          <Button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isEstimating}>
            Post Job
          </Button>
        </div>
      </form>
    </Form>
  );
}
