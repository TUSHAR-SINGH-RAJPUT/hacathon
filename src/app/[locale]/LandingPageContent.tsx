"use client"; 

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Lightbulb, Users, Target } from 'lucide-react';
import Logo from '@/components/Logo';

interface LandingPageContentProps {
  dict: any; // Replace 'any' with a more specific type for your dictionary
  locale: string;
}

export default function LandingPageContent({ dict, locale }: LandingPageContentProps) {
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
          <Link href={`/${locale}/platform-home`} passHref>
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
          <Link href={`/${locale}/platform-home`} passHref>
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
