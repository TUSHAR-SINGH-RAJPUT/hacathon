// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file

import JobPostingForm from './JobPostingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, ListChecks, Edit, AlertCircle } from 'lucide-react'; 
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/../next.config';

type Props = {
  params: { locale: Locale };
};

export default async function PostJobPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const formDict = { // Pass specific translations to the client form component
    jobTitle: "Job Title",
    jobTitlePlaceholder: "e.g., Interior Wall Painting for 2BHK",
    jobTitleDescription: "A clear, concise title helps attract the right pros (max 100 characters).",
    serviceType: "Service Type",
    selectServicePlaceholder: "Select a service category",
    detailedJobDescription: "Detailed Job Description",
    jobDescriptionPlaceholder: "Describe the work thoroughly: tasks, materials (yours or pro's), measurements, special instructions. More details mean better quotes!",
    jobDescriptionHint: "Be specific for accurate understanding (min 20, max 1000 characters).",
    jobLocation: "Job Location",
    locationPlaceholder: "e.g., Your Area, City, Pincode (India)",
    locationDescription: "Specify where the service is needed (e.g., \"Koramangala, Bangalore\" or \"560095\").",
    urgencyLevel: "Urgency Level",
    urgencyPlaceholder: "How soon do you need it?",
    estimatedJobSize: "Estimated Job Size",
    jobSizePlaceholder: "Estimate the job size",
    numberOfProfessionals: "Number of Professionals Needed (Estimate)",
    numberOfProfessionalsPlaceholder: "e.g., 1 or 2",
    numberOfProfessionalsDescription: "For medium or large jobs, how many people might be required?",
    getAIPriceEstimate: "Get AI Price Estimate (₹)",
    postJobAndFind: "Post Job & Find Professionals",
    coreJobDetails: "Core Job Details",
    coreJobDetailsDesc: "Start by telling us the basics of what you need.",
    locationAndUrgency: "Location & Urgency",
    locationAndUrgencyDesc: "Help us understand where and when the job needs to be done.",
    scopeAndTeam: "Scope & Team",
    scopeAndTeamDesc: "Define the scale of the job.",
    aiPriceEstimation: "AI Price Estimation",
    estimatedRange: "Estimated Range",
    factorsConsidered: "Factors considered",
    aiNote: "Note: This is an AI-generated estimate for budgetary purposes. Actual bids from professionals may vary.",
    validationError: "Validation Error",
    validationErrorDesc: "Please fill in all required fields correctly before estimating. Medium/Large jobs require number of people.",
    priceEstimated: "Price Estimated!",
    estimationFailed: "Estimation Failed",
    jobPostedSimulated: "Job Posted (Simulated)",
    jobPostedSimulatedDesc: "Your job request has been successfully submitted. Professionals will be notified."
    // Add more keys from JobPostingForm as needed
  };


  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <Card className="shadow-xl bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center p-8">
          <ListChecks className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
          <CardTitle className="text-3xl md:text-4xl font-bold text-card-foreground tracking-tight">
            {dict.letsGetProjectStarted}
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-2xl mx-auto text-lg mt-2">
            {dict.postJobIntro}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-8 pb-8">
          <JobPostingForm translations={formDict} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Alert className="bg-secondary border-secondary-foreground/10 shadow-lg">
          <Lightbulb className="h-6 w-6 text-primary" />
          <AlertTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
            {dict.tipsForEffectivePost}
          </AlertTitle>
          <AlertDescription className="text-secondary-foreground/90 space-y-2 text-base mt-2">
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>{dict.beSpecificClear}</strong> {dict.beSpecificClearText}</p>
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>{dict.mentionDimensionsMaterials}</strong> {dict.mentionDimensionsMaterialsText}</p>
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>{dict.futureFeatureUploadPhotos}</strong> {dict.futureFeatureUploadPhotosText}</p>
          </AlertDescription>
        </Alert>
        
        <Alert className="bg-secondary border-secondary-foreground/10 shadow-lg">
          <Users className="h-6 w-6 text-primary" />
          <AlertTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
            {dict.whatHappensAfterPost}
          </AlertTitle>
          <AlertDescription className="text-secondary-foreground/90 space-y-2 text-base mt-2">
            <p>{dict.whatHappens1}</p>
            <p>{dict.whatHappens2}</p>
            <p>{dict.whatHappens3}</p>
            <p><AlertCircle className="inline h-4 w-4 mr-2 text-primary" />{dict.whatHappensNote}</p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
