import ProviderRegistrationForm from './ProviderRegistrationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string };
};

export default async function JoinAsProPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const t = dict.JoinAsProPage;

  // These would ideally come from the dictionary as well.
  // For simplicity, assuming they are structured under dict.JoinAsProPage.formTranslations or similar
  const formTranslations = {
    fullName: t.formTranslations?.fullName || "Full Name",
    emailAddress: t.formTranslations?.emailAddress || "Email Address",
    phoneNumberOptional: t.formTranslations?.phoneNumberOptional || "Phone Number (Optional)",
    primaryServiceLocation: t.formTranslations?.primaryServiceLocation || "Primary Service Location",
    locationDescription: t.formTranslations?.locationDescription || "City, State where you primarily offer services.",
    servicesYouOffer: t.formTranslations?.servicesYouOffer || "Services You Offer",
    servicesDescription: t.formTranslations?.servicesDescription || "Select all services you are proficient in.",
    yearsOfExperience: t.formTranslations?.yearsOfExperience || "Years of Experience",
    typicalHourlyRateOptional: t.formTranslations?.typicalHourlyRateOptional || "Typical Hourly Rate (Optional)",
    rateDescription: t.formTranslations?.rateDescription || "Provide a range or indicate custom quotes.",
    aboutYouServices: t.formTranslations?.aboutYouServices || "About You / Your Services",
    bioPlaceholder: t.formTranslations?.bioPlaceholder || "Describe your skills, experience, and what makes your service stand out.",
    profileImageUrlOptional: t.formTranslations?.profileImageUrlOptional || "Profile Image URL (Optional)",
    profileImageDescription: t.formTranslations?.profileImageDescription || "Link to your professional photo. If blank, a placeholder will be used.",
    resumeOptionalPDF: t.formTranslations?.resumeOptionalPDF || "Resume (Optional, PDF only, max 5MB)",
    resumeDescription: t.formTranslations?.resumeDescription || "Upload your resume to showcase your qualifications.",
    nextDocumentVerification: t.formTranslations?.nextDocumentVerification || "Next: Document Verification",
    basicInformation: t.formTranslations?.basicInformation || "Basic Information",
    serviceDetails: t.formTranslations?.serviceDetails || "Service Details",
  };

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
              <ProviderRegistrationForm translations={formTranslations} locale={locale} />
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
