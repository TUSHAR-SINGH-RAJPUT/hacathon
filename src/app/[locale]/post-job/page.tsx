import JobPostingForm from './JobPostingForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, ListChecks, Edit, AlertCircle } from 'lucide-react'; 
import { Alert, AlertTitle, AlertDescription as UiAlertDescription } from "@/components/ui/alert";
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string };
};

export default async function PostJobPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const t = dict.PostJobPage;
  const formTranslations = dict.JobPostingForm;

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
          <JobPostingForm translations={formTranslations} locale={locale} />
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
