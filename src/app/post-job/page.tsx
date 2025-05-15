
import JobPostingForm from './JobPostingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, ListChecks } from 'lucide-react'; // Added icons

export default function PostJobPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-10">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
          <ListChecks className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold text-card-foreground">Describe Your Project</CardTitle>
          <CardDescription className="text-muted-foreground max-w-xl mx-auto">
            Tell us about the task you need help with. The more details you provide, the better we can connect you with the right professionals and assist with an initial AI-powered price estimation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobPostingForm />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-secondary shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
              <Lightbulb className="h-6 w-6 mr-3 text-primary" /> Tips for a Great Job Post
            </CardTitle>
          </CardHeader>
          <CardContent className="text-secondary-foreground space-y-3 text-sm">
            <p><strong>Be Specific:</strong> Clearly outline the tasks involved. Instead of "fix bathroom," try "replace leaking shower faucet and re-grout tiles around the tub."</p>
            <p><strong>Include Dimensions:</strong> For jobs like painting or flooring, mention room sizes or area measurements if possible.</p>
            <p><strong>Mention Materials:</strong> Specify if you'll provide materials or if the pro should include them in their quote.</p>
            <p><strong>Upload Photos (if applicable):</strong> While not supported in this form, photos greatly help pros understand the scope. (This feature can be added later)</p>
          </CardContent>
        </Card>
         <Card className="bg-secondary shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-secondary-foreground flex items-center">
              <Users className="h-6 w-6 mr-3 text-primary" /> What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-secondary-foreground space-y-3 text-sm">
            <p>1. Your job post will be shared with relevant professionals in your area.</p>
            <p>2. Interested pros may contact you with questions or provide quotes.</p>
            <p>3. You can review profiles, compare quotes, and choose the best pro for your job.</p>
            <p>4. Our AI price estimate gives you a ballpark idea, but final quotes come from pros.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
