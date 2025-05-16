
import JobPostingForm from './JobPostingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, ListChecks, Edit, AlertCircle } from 'lucide-react'; 
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function PostJobPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <Card className="shadow-xl bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center p-8">
          <ListChecks className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
          <CardTitle className="text-3xl md:text-4xl font-bold text-card-foreground tracking-tight">
            Let's Get Your Project Started!
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-2xl mx-auto text-lg mt-2">
            Provide clear details about your task. This helps us connect you with the perfect professionals and generates a helpful AI-powered price estimate to guide you.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-8 pb-8">
          <JobPostingForm />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Alert className="bg-secondary border-secondary-foreground/10 shadow-lg">
          <Lightbulb className="h-6 w-6 text-primary" />
          <AlertTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
            Tips for an Effective Job Post
          </AlertTitle>
          <AlertDescription className="text-secondary-foreground/90 space-y-2 text-base mt-2">
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>Be Specific & Clear:</strong> Instead of "fix bathroom," say "replace leaking shower faucet and re-grout tiles around the tub." The more precise, the better!</p>
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>Mention Dimensions/Materials:</strong> For tasks like painting or flooring, include room sizes or area details. Specify if you'll provide materials or if the pro should quote for them.</p>
            <p><Edit className="inline h-4 w-4 mr-2 text-primary" /><strong>Future Feature - Upload Photos:</strong> (While not in this form, imagine being able to upload photos – they greatly help pros assess the job!)</p>
          </AlertDescription>
        </Alert>
        
        <Alert className="bg-secondary border-secondary-foreground/10 shadow-lg">
          <Users className="h-6 w-6 text-primary" />
          <AlertTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
            What Happens After You Post?
          </AlertTitle>
          <AlertDescription className="text-secondary-foreground/90 space-y-2 text-base mt-2">
            <p>1. Your job request is shared with skilled professionals in your locality who match your needs.</p>
            <p>2. Interested experts may contact you for more details or provide their quotations.</p>
            <p>3. You can then review their profiles, compare offers, and select the best professional for your project.</p>
            <p><AlertCircle className="inline h-4 w-4 mr-2 text-primary" />The AI price estimate provides a general idea of costs, but final quotes will come directly from the professionals.</p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
