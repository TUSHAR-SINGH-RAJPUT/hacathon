// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon, Users, Target, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/../next.config';

type Props = {
  params: { locale: Locale };
};

export default async function AboutPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-12 md:py-16 bg-card rounded-xl shadow-lg">
        <InfoIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-card-foreground">
          {dict.aboutKariGaar}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {dict.aboutIntro}
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
              <CardTitle className="text-2xl text-primary flex items-center"><Target className="h-7 w-7 mr-3" /> {dict.ourMission}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {dict.missionText}
              </p>
            </CardContent>
          </Card>
           <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><Users className="h-7 w-7 mr-3" /> {dict.whoWeServe}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong>{dict.forCustomers}</strong> {dict.forCustomersText}
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>{dict.forProfessionals}</strong> {dict.forProfessionalsText}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center py-10 bg-secondary rounded-xl shadow-lg">
        <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
          {dict.needHelpNavigating}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          {dict.platformGuideDescription}
        </p>
        <Link href="/about/guide" passHref>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {dict.explorePlatformGuide} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
