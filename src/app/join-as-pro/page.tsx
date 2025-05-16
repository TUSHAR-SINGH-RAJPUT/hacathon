// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file

import ProviderRegistrationForm from './ProviderRegistrationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string }; // Changed Locale to string
};

export default async function JoinAsProPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  
  // Simplified dictionary for the child form component
  // In a larger app, this might be part of dict or a separate form dictionary
  const formTranslations = {
    fullName: dict.fullName || "Full Name",
    emailAddress: dict.emailAddress || "Email Address",
    phoneNumberOptional: dict.phoneNumberOptional || "Phone Number (Optional)",
    primaryServiceLocation: dict.primaryServiceLocation || "Primary Service Location",
    locationDescription: dict.locationDescription || "City, State where you primarily offer services.",
    servicesYouOffer: dict.servicesYouOffer || "Services You Offer",
    servicesDescription: dict.servicesDescription || "Select all services you are proficient in.",
    yearsOfExperience: dict.yearsOfExperience || "Years of Experience",
    typicalHourlyRateOptional: dict.typicalHourlyRateOptional || "Typical Hourly Rate (Optional)",
    rateDescription: dict.rateDescription || "Provide a range or indicate custom quotes.",
    aboutYouServices: dict.aboutYouServices || "About You / Your Services",
    bioPlaceholder: dict.bioPlaceholder || "Describe your skills, experience, and what makes your service stand out.",
    profileImageUrlOptional: dict.profileImageUrlOptional || "Profile Image URL (Optional)",
    profileImageDescription: dict.profileImageDescription || "Link to your professional photo. If blank, a placeholder will be used.",
    nextDocumentVerification: dict.nextDocumentVerification || "Next: Document Verification",
    basicInformation: dict.basicInformation || "Basic Information",
    serviceDetails: dict.serviceDetails || "Service Details",
    // ... add more as needed by ProviderRegistrationForm
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-10 bg-card rounded-xl shadow-lg">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          {dict.showcaseSkills}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {dict.joinAsProIntro}
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">{dict.createProfessionalProfile}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {dict.createProfileDescription}
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
                <TrendingUp className="h-6 w-6 mr-3 text-primary" /> {dict.whyJoinKariGaar}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p><Users className="inline h-4 w-4 mr-1 text-primary" /> <strong>{dict.widerReach}</strong> {dict.widerReachText}</p>
              <p><MapPin className="inline h-4 w-4 mr-1 text-primary" /> <strong>{dict.localFocus}</strong> {dict.localFocusText}</p>
              <p><Award className="inline h-4 w-4 mr-1 text-primary" /> <strong>{dict.buildReputation}</strong> {dict.buildReputationText}</p>
              <p><ShieldCheck className="inline h-4 w-4 mr-1 text-primary" /> <strong>{dict.verifiedPlatform}</strong> {dict.verifiedPlatformText}</p>
              <p>{dict.manageJobRequestsFuture}</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-primary" /> {dict.findingJobOpportunities}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p>{dict.findingJobOpportunitiesText1}</p>
              <p>{dict.findingJobOpportunitiesText2}</p>
              <p className="text-xs text-muted-foreground">{dict.findingJobOpportunitiesNote}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
