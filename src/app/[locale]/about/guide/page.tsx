import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Home, PlusSquare, Search, UserCircle, Briefcase, InfoIcon as LucideInfoIcon, ArrowRight, HelpCircle } from 'lucide-react'; // Renamed InfoIcon to LucideInfoIcon to avoid conflict
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries'; // Assuming you'll create a dictionary for this page

type Props = {
  params: { locale: string };
};

// Placeholder for dictionary - replace with actual dictionary loading
const getPlatformGuideDictionary = (dict: any) => {
  // In a real scenario, dict.PlatformGuidePage would contain these.
  // For now, using hardcoded English strings for structure.
  return {
    appName: dict.appName || "kariGaar",
    platformGuideTitle: dict.PlatformGuidePage?.platformGuideTitle || "kariGaar Platform Guide",
    platformGuideIntro: dict.PlatformGuidePage?.platformGuideIntro || "Welcome to your comprehensive guide for using kariGaar! Whether you're a customer looking for services or a professional offering them, these guides will help you navigate our platform effectively.",
    stillHaveQuestions: dict.PlatformGuidePage?.stillHaveQuestions || "Still Have Questions?",
    contactSupportComingSoon: dict.PlatformGuidePage?.contactSupportComingSoon || "Contact Support (Coming Soon)",
    contactSupportDescription: dict.PlatformGuidePage?.contactSupportDescription || "If you can't find what you're looking for in our guides, please feel free to reach out to our support team (contact details coming soon)."
  };
};


export default async function PlatformGuidePage({ params: { locale } }: Props) {
  const commonDict = await getDictionary(locale); // Load common dictionary
  const t = getPlatformGuideDictionary(commonDict); // Get specific section, or use common if not specific

  const createGuideSections = (currentLocale: string) => [ 
    { 
      title: "Getting Started: Homepage Overview", 
      description: "Understand the main features accessible from our homepage.", 
      link: `/${currentLocale}/about/guide/homepage`, 
      icon: <Home className="h-6 w-6 text-primary" /> 
    },
    { 
      title: "Posting a New Job", 
      description: "Learn how to create effective job posts to attract the right professionals.", 
      link: `/${currentLocale}/about/guide/posting-a-job`, 
      icon: <PlusSquare className="h-6 w-6 text-primary" /> 
    },
    { 
      title: "Browsing Services & Provider Profiles", 
      description: "Find out how to search for services and understand provider profiles.", 
      link: `/${currentLocale}/about/guide/browsing-services`, 
      icon: <Search className="h-6 w-6 text-primary" /> 
    },
    { 
      title: "Using Your Job List (Cart) & Booking", 
      description: "Manage your shortlisted providers and understand the booking process.", 
      link: `/${currentLocale}/about/guide/job-list-booking`, 
      icon: <UserCircle className="h-6 w-6 text-primary" />
    },
    { 
      title: "Joining as a Professional", 
      description: "A step-by-step guide for service providers to register and get started.", 
      link: `/${currentLocale}/about/guide/joining-as-pro`, 
      icon: <Briefcase className="h-6 w-6 text-primary" /> 
    },
    { 
      title: "Managing Your Account", 
      description: "Information on login, signup, and managing your user settings (for customers and pros).", 
      link: `/${currentLocale}/about/guide/managing-account`, 
      icon: <UserCircle className="h-6 w-6 text-primary" /> 
    },
  ];
  const guideSections = createGuideSections(locale);


  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-12 md:py-16 bg-card rounded-xl shadow-lg">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-card-foreground">
          {t.platformGuideTitle}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.platformGuideIntro}
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideSections.map((section) => (
          <Card key={section.title} className="flex flex-col bg-background hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto"> 
              <Link href={section.link} passHref>
                <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
               <p className="text-xs text-muted-foreground mt-2 text-center">(Content for this guide is coming soon)</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="text-center py-10">
        <HelpCircle className="mx-auto h-10 w-10 text-primary mb-3" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">{t.stillHaveQuestions}</h2>
        <p className="text-muted-foreground mb-4">{t.contactSupportDescription}</p>
        <Button variant="link" className="text-primary">{t.contactSupportComingSoon}</Button>
      </section>
    </div>
  );
}
