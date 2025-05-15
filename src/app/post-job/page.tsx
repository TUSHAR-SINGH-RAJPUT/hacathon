import JobPostingForm from './JobPostingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function PostJobPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-card-foreground">Post a New Job</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Describe your project, and let our AI help you estimate the cost.
            Connect with skilled professionals ready to get it done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobPostingForm />
        </CardContent>
      </Card>
    </div>
  );
}
