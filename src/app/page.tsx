// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
"use client"; // This page uses styled-jsx and client-side hooks for animations/interactions

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Lightbulb, Users, Target } from 'lucide-react';
import Logo from '@/components/Logo';
import { getDictionary } from '@/lib/dictionaries'; // Corrected import path
import type { Locale } from '@/../next.config'; // Assuming i18n type is exported

// This page component now needs to be async if getDictionary is async
// Or, translations need to be passed differently for client components.
// For a client component, we'd typically use a hook or context for translations.
// Let's assume for now this root page is simple and might become a language selector or redirect.
// Or, make it a server component and pass translations to a client sub-component.

// To use getDictionary, this page needs to be async and accept params
// However, the root page.tsx does not automatically get locale in params if you're using i18n routing
// where / maps to /defaultLocale.
// Let's assume this page will be simple and not directly use getDictionary for now.
// OR, we make the content part a server component and pass dict.

// Simplification: If this is a client component, use hardcoded text or a client-side i18n solution.
// Given the prompt focuses on i18n setup, let's make this page structure ready for translations
// even if the full implementation for a root client page is more complex.

// For the sake of this exercise, and assuming this becomes src/app/[locale]/page.tsx in spirit:
// We need to handle how 'dict' is obtained.
// The prompt implies moving all pages under [locale], so this file would become src/app/[locale]/page.tsx

// Corrected structure for a page under [locale]
// This file WILL BE MOVED to src/app/[locale]/page.tsx effectively.
// So it will receive locale in params.

type Props = {
  params: { locale: Locale };
};

export default async function LandingPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center flex-grow text-center py-16 md:py-24 px-4 bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
        <Image 
          src="https://placehold.co/200x200.png?text=Pro+1" 
          alt="Service Professional"
          data-ai-hint="worker person"
          width={150} 
          height={150} 
          className="absolute top-10 left-10 opacity-20 animate-bounce-slow select-none" 
        />
        <Image 
          src="https://placehold.co/200x200.png?text=Tool+Icon" 
          alt="Service Tool" 
          data-ai-hint="tools"
          width={120} 
          height={120} 
          className="absolute bottom-20 right-16 opacity-20 animate-bounce-slow-delay select-none" 
        />
         <Image 
          src="https://placehold.co/150x150.png?text=Happy+Client" 
          alt="Happy Client"
          data-ai-hint="happy person"
          width={100} 
          height={100} 
          className="absolute top-1/4 right-10 opacity-10 animate-pulse select-none" 
        />
         <Image 
          src="https://placehold.co/180x180.png?text=Service+Icon" 
          alt="Service Icon"
          data-ai-hint="gears"
          width={130} 
          height={130} 
          className="absolute bottom-1/3 left-16 opacity-10 animate-pulse-delay select-none" 
        />

        <div className="relative z-10">
          <Logo size="xlarge" className="mb-8 justify-center" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
            {dict.appName} <span className="text-primary">{dict.getStarted}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {dict.tagline}
          </p>
          <Link href="/platform-home" passHref>
            <Button size="lg" className="px-10 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transform transition-transform hover:scale-105 active:scale-95 shadow-xl">
              {dict.getStartedNow} <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-16 md:py-24 bg-card text-card-foreground">
        <div className="container mx-auto px-4 text-center">
          <Target className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.ourMotivation}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {dict.motivationText}
          </p>
           <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-background rounded-lg shadow-md">
              <Zap className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{dict.efficiency}</h3>
              <p className="text-muted-foreground">{dict.efficiencyText}</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-md">
              <Users className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{dict.community}</h3>
              <p className="text-muted-foreground">{dict.communityText}</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-md">
              <Lightbulb className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{dict.trust}</h3>
              <p className="text-muted-foreground">{dict.trustText}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 text-center bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">{dict.readyToSimplify}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            {dict.joinCommunityText}
          </p>
          <Link href="/platform-home" passHref>
            <Button size="lg" className="px-10 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transform transition-transform hover:scale-105 active:scale-95 shadow-xl">
              {dict.explorePlatform} <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
      <style jsx global>{`
        .animate-bounce-slow {
          animation: bounce-slow 5s infinite;
        }
        .animate-bounce-slow-delay {
          animation: bounce-slow 5s infinite 1s; /* 1s delay */
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8,0,1,1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0,0,0.2,1);
          }
        }
        .animate-pulse {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-delay {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
