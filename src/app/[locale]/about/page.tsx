import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon, Users, Target, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';

type Props = {
  params: { locale: string };
};

export default async function AboutPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const t = dict.AboutPage;

  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-12 md:py-16 bg-card rounded-xl shadow-lg">
        <InfoIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-card-foreground">
          {t.aboutKariGaar}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t.aboutIntro}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://placehold.co/600x400.png"
            alt="Team working together"
            data-ai-hint="team collaboration"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-6">
          <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><Target className="h-7 w-7 mr-3" /> {t.ourMission}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t.missionText}
              </p>
            </CardContent>
          </Card>
           <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><Users className="h-7 w-7 mr-3" /> {t.whoWeServe}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong>{t.forCustomers}</strong> {t.forCustomersText}
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>{t.forProfessionals}</strong> {t.forProfessionalsText}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center py-10 bg-secondary rounded-xl shadow-lg">
        <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
          {t.needHelpNavigating}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          {t.platformGuideDescription}
        </p>
        <Link href={`/${locale}/about/guide`} passHref>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t.explorePlatformGuide} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
