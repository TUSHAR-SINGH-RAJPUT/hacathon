
import ProviderRegistrationForm from './ProviderRegistrationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Users } from 'lucide-react';

export default function JoinAsProPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-10 bg-card rounded-xl shadow-lg">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
          Join kariGaar as a Professional
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Offer your skills and services to a wide audience. Fill out the form below to get started and connect with customers seeking your expertise.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Your Professional Profile</CardTitle>
              <CardDescription className="text-muted-foreground">
                Provide your details to create your provider profile. The more complete your profile, the more likely you are to attract clients.
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
                <Users className="h-6 w-6 mr-3 text-primary" /> Why Join Us?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3">
              <p>Reach a wider customer base in your local area.</p>
              <p>Manage your job requests and schedule easily.</p>
              <p>Build your reputation with customer reviews.</p>
              <p>Get fair price estimates for jobs to guide your quotes.</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-primary" /> Finding Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary-foreground space-y-3">
              <p>Once registered and approved, you'll be able to browse job postings relevant to your skills and location.</p>
              <p className="text-sm text-muted-foreground">(Full job browsing functionality for providers is under development.)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
