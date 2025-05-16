import ProviderRegistrationForm from './ProviderRegistrationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

export default async function JoinAsProPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.JoinAsProPage || {};
  const formTranslations = dict.ProviderRegistrationForm || {};

  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-10 bg-card rounded-xl shadow-lg">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          {t.showcaseSkills || "Showcase Your Skills on kariGaar"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.joinAsProIntro || "Become a valued professional on our platform. Connect with clients actively seeking your expertise, grow your business, and manage your work efficiently. Start by creating your profile below."}
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">{t.createProfessionalProfile || "Create Your Professional Profile"}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.createProfileDescription || "Fill in your details to build a compelling profile. Accuracy and completeness will help you attract more clients and opportunities. This is the first step towards getting verified and listed."}
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
                <TrendingUp className="h-6 w-6 mr-3 text-primary" /> {t.whyJoinKariGaar || "Why Join kariGaar?"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p><Users className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.widerReach || "Wider Reach:"}</strong> {t.widerReachText || "Connect with a large pool of customers in your service area."}</p>
              <p><MapPin className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.localFocus || "Local Focus:"}</strong> {t.localFocusText || "Get matched with jobs specifically in your preferred locations."}</p>
              <p><Award className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.buildReputation || "Build Reputation:"}</strong> {t.buildReputationText || "Collect reviews and showcase your quality work to build trust."}</p>
              <p><ShieldCheck className="inline h-4 w-4 mr-1 text-primary" /> <strong>{t.verifiedPlatform || "Verified Platform:"}</strong> {t.verifiedPlatformText || "Benefit from being part of a trusted network of professionals."}</p>
              <p>{t.manageJobRequestsFuture || "Manage job requests and your schedule with ease (future feature)."}</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-primary" /> {t.findingJobOpportunities || "Finding Job Opportunities"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p>{t.findingJobOpportunitiesText1 || "Once your profile is registered and successfully verified, you'll gain access to view and bid on job postings relevant to your skills and chosen service locations."}</p>
              <p>{t.findingJobOpportunitiesText2 || "Our platform aims to provide a steady stream of potential work, helping you grow your client base."}</p>
              <p className="text-xs text-muted-foreground">{t.findingJobOpportunitiesNote || "(Full job browsing and bidding functionality for providers is currently under development and will be rolled out soon.)"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
