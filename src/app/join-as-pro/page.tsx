
import ProviderRegistrationForm from './ProviderRegistrationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';

export default function JoinAsProPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-10 bg-card rounded-xl shadow-lg">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          Showcase Your Skills on kariGaar
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Become a valued professional on our platform. Connect with clients actively seeking your expertise, grow your business, and manage your work efficiently. Start by creating your profile below.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Create Your Professional Profile</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill in your details to build a compelling profile. Accuracy and completeness will help you attract more clients and opportunities. This is the first step towards getting verified and listed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProviderRegistrationForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-primary" /> Why Join kariGaar?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p><Users className="inline h-4 w-4 mr-1 text-primary" /> <strong>Wider Reach:</strong> Connect with a large pool of customers in your service area.</p>
              <p><MapPin className="inline h-4 w-4 mr-1 text-primary" /> <strong>Local Focus:</strong> Get matched with jobs specifically in your preferred locations.</p>
              <p><Award className="inline h-4 w-4 mr-1 text-primary" /> <strong>Build Reputation:</strong> Collect reviews and showcase your quality work to build trust.</p>
              <p><ShieldCheck className="inline h-4 w-4 mr-1 text-primary" /> <strong>Verified Platform:</strong> Benefit from being part of a trusted network of professionals.</p>
              <p>Manage job requests and your schedule with ease (future feature).</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-primary" /> Finding Job Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3 text-sm">
              <p>Once your profile is registered and successfully verified, you'll gain access to view and bid on job postings relevant to your skills and chosen service locations.</p>
              <p>Our platform aims to provide a steady stream of potential work, helping you grow your client base.</p>
              <p className="text-xs text-muted-foreground">(Full job browsing and bidding functionality for providers is currently under development and will be rolled out soon.)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
