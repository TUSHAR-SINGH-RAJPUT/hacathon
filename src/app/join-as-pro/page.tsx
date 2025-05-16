
import ProviderRegistrationForm from './ProviderRegistrationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';

// Hardcoded English strings
const t = {
  showcaseSkills: "Showcase Your Skills on kariGaar",
  joinAsProIntro: "Become a valued professional on our platform. Connect with clients actively seeking your expertise, grow your business, and manage your work efficiently. Start by creating your profile below.",
  createProfessionalProfile: "Create Your Professional Profile",
  createProfileDescription: "Fill in your details to build a compelling profile. Accuracy and completeness will help you attract more clients and opportunities. This is the first step towards getting verified and listed.",
  whyJoinKariGaar: "Why Join kariGaar?",
  widerReach: "Wider Reach:",
  widerReachText: "Connect with a large pool of customers in your service area.",
  localFocus: "Local Focus:",
  localFocusText: "Get matched with jobs specifically in your preferred locations.",
  buildReputation: "Build Reputation:",
  buildReputationText: "Collect reviews and showcase your quality work to build trust.",
  verifiedPlatform: "Verified Platform:",
  verifiedPlatformText: "Benefit from being part of a trusted network of professionals.",
  manageJobRequestsFuture: "Manage job requests and your schedule with ease (future feature).",
  findingJobOpportunities: "Finding Job Opportunities",
  findingJobOpportunitiesText1: "Once your profile is registered and successfully verified, you'll gain access to view and bid on job postings relevant to your skills and chosen service locations.",
  findingJobOpportunitiesText2: "Our platform aims to provide a steady stream of potential work, helping you grow your client base.",
  findingJobOpportunitiesNote: "(Full job browsing and bidding functionality for providers is currently under development and will be rolled out soon.)"
};

// Form translations (hardcoded English)
const formTranslations = {
    fullName: "Full Name",
    fullNamePlaceholder: "e.g., Priya Sharma",
    emailAddress: "Email Address",
    emailPlaceholder: "e.g., priya.sharma@example.com",
    phoneNumberOptional: "Phone Number (Optional)",
    phoneNumberPlaceholder: "e.g., +91 XXXXXXXXXX",
    primaryServiceLocation: "Primary Service Location",
    locationPlaceholder: "e.g., Bangalore, Karnataka",
    locationDescription: "City, State where you primarily offer services.",
    servicesYouOffer: "Services You Offer",
    servicesDescription: "Select all services you are proficient in.",
    yearsOfExperience: "Years of Experience",
    experiencePlaceholder: "e.g., 5",
    typicalHourlyRateOptional: "Typical Hourly Rate (Optional, INR)",
    ratePlaceholder: "e.g., ₹300-₹500 or 'Contact for quote'",
    rateDescription: "Provide a range or indicate custom quotes.",
    aboutYouServices: "About You / Your Services",
    bioPlaceholder: "Describe your skills, experience, and what makes your service stand out.",
    profileImageUrlOptional: "Profile Image URL (Optional)",
    profileImageUrlPlaceholder: "https://example.com/your-image.png or https://placehold.co/...",
    profileImageDescription: "Link to your professional photo. If blank, a placeholder will be used.",
    resumeOptionalPDF: "Resume (Optional, PDF only, max 5MB)",
    resumeDescription: "Upload your resume to showcase your qualifications.",
    nextDocumentVerification: "Next: Document Verification",
    basicInformation: "Basic Information",
    serviceDetails: "Service Details",
    validationMessages: {
        fullNameMin: "Full name must be at least 3 characters.",
        emailInvalid: "Please enter a valid email address.",
        locationRequired: "Location is required.",
        serviceTypeRequired: "Please select at least one service type.",
        experiencePositive: "Experience must be a positive number.",
        bioMin: "Bio must be at least 20 characters.",
        profileImageInvalidUrl: "Please enter a valid URL for profile image or leave blank for placeholder.",
        resumeMustBeFileList: "Resume must be a FileList",
        resumeSinglePDF: "Please upload a single PDF file.",
        resumeMaxSize: "Resume file size should be less than 5MB."
    }
};

export default function JoinAsProPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-10 bg-card rounded-xl shadow-lg">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          {t.showcaseSkills}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.joinAsProIntro}
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">{t.createProfessionalProfile}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.createProfileDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProviderRegistrationForm translations={formTranslations} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-primary" /> {t.whyJoinKariGaar}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p><Users className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.widerReach}</strong> {t.widerReachText}</p>
              <p><MapPin className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.localFocus}</strong> {t.localFocusText}</p>
              <p><Award className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.buildReputation}</strong> {t.buildReputationText}</p>
              <p><ShieldCheck className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.verifiedPlatform}</strong> {t.verifiedPlatformText}</p>
              <p>{t.manageJobRequestsFuture}</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-primary" /> {t.findingJobOpportunities}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p>{t.findingJobOpportunitiesText1}</p>
              <p>{t.findingJobOpportunitiesText2}</p>
              <p className="text-xs text-muted-foreground">{t.findingJobOpportunitiesNote}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
