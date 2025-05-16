
import JobPostingForm from './JobPostingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, ListChecks, Edit, AlertCircle } from 'lucide-react'; 
import { Alert, AlertTitle, AlertDescription as UiAlertDescription } from "@/components/ui/alert"; // Renamed to avoid conflict

// Hardcoded English strings
const t = {
  letsGetProjectStarted: "Let's Get Your Project Started!",
  postJobIntro: "Provide clear details about your task. This helps us connect you with the perfect professionals and generates a helpful AI-powered price estimate to guide you.",
  tipsForEffectivePost: "Tips for an Effective Job Post",
  beSpecificClear: "Be Specific & Clear:",
  beSpecificClearText: "Instead of \"fix bathroom,\" say \"replace leaking shower faucet and re-grout tiles around the tub.\" The more precise, the better!",
  mentionDimensionsMaterials: "Mention Dimensions/Materials:",
  mentionDimensionsMaterialsText: "For tasks like painting or flooring, include room sizes or area details. Specify if you'll provide materials or if the pro should quote for them.",
  futureFeatureUploadPhotos: "Future Feature - Upload Photos:",
  futureFeatureUploadPhotosText: "(While not in this form, imagine being able to upload photos – they greatly help pros assess the job!)",
  whatHappensAfterPost: "What Happens After You Post?",
  whatHappens1: "1. Your job request is shared with skilled professionals in your locality who match your needs.",
  whatHappens2: "2. Interested experts may contact you for more details or provide their quotations.",
  whatHappens3: "3. You can then review their profiles, compare offers, and select the best professional for your project.",
  whatHappensNote: "The AI price estimate provides a general idea of costs, but final quotes will come directly from the professionals."
};

// Form translations (hardcoded English)
const formTranslations = {
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
    jobPostedSimulatedDesc: "Your job request has been successfully submitted. Professionals will be notified.",
    validationMessages: { // Add this nested object for validation strings
        jobTitleMin: "Job title must be at least 5 characters.",
        jobDescriptionMin: "Description must be at least 20 characters.",
        serviceTypeRequired: "Please select a service type.",
        locationMin: "Location is required.",
        urgencyRequired: "Please select an urgency level.",
        sizeRequired: "Please select the job size.",
        numberOfPeopleMin: "At least 1 person required",
        numberOfPeopleRequiredForMediumLarge: "Number of people is required for medium or large jobs."
    }
};

export default function PostJobPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <Card className="shadow-xl bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center p-8">
          <ListChecks className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
          <CardTitle className="text-3xl md:text-4xl font-bold text-card-foreground tracking-tight">
            {t.letsGetProjectStarted}
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-2xl mx-auto text-lg mt-2">
            {t.postJobIntro}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-8 pb-8">
          <JobPostingForm translations={formTranslations} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Alert className="bg-secondary border-secondary-foreground/10 shadow-lg">
          <Lightbulb className="h-6 w-6 text-primary" />
          <AlertTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
            {t.tipsForEffectivePost}
          </AlertTitle>
          <UiAlertDescription className="text-secondary-foreground/90 space-y-2 text-base mt-2">
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>{t.beSpecificClear}</strong> {t.beSpecificClearText}</p>
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>{t.mentionDimensionsMaterials}</strong> {t.mentionDimensionsMaterialsText}</p>
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>{t.futureFeatureUploadPhotos}</strong> {t.futureFeatureUploadPhotosText}</p>
          </UiAlertDescription>
        </Alert>
        
        <Alert className="bg-secondary border-secondary-foreground/10 shadow-lg">
          <Users className="h-6 w-6 text-primary" />
          <AlertTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
            {t.whatHappensAfterPost}
          </AlertTitle>
          <UiAlertDescription className="text-secondary-foreground/90 space-y-2 text-base mt-2">
            <p>{t.whatHappens1}</p>
            <p>{t.whatHappens2}</p>
            <p>{t.whatHappens3}</p>
            <p><AlertCircle className="inline h-4 w-4 mr-2 text-primary" />{t.whatHappensNote}</p>
          </UiAlertDescription>
        </Alert>
      </div>
    </div>
  );
}
