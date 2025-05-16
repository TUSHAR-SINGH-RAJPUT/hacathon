
"use client"; // This page uses styled-jsx and client-side animations/interactions

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Lightbulb, Users, Target, MessageCircle, X as CloseIcon } from 'lucide-react'; // Added MessageCircle and CloseIcon
import Logo from '@/components/Logo';
import Script from 'next/script';
import React, { useState } from 'react'; // Added useState

// Hardcoded English strings since i18n was reverted
const t = {
  appName: "kariGaar",
  tagline: "Your Local Service Solution",
  getStarted: "Get Started",
  getStartedNow: "Get Started Now",
  explorePlatform: "Explore the Platform",
  ourMotivation: "Our Motivation",
  motivationText: "We believe finding reliable local services shouldn't be a chore. kariGaar was born from the desire to simplify this process, empowering both customers to find quality help and skilled professionals to grow their businesses and serve their communities.",
  efficiency: "Efficiency",
  efficiencyText: "Quickly post jobs, get estimates, and connect with pros without endless searching.",
  community: "Community",
  communityText: "Fostering connections between local customers and skilled karigaars (artisans).",
  trust: "Trust",
  trustText: "Building a platform where quality service and reliability are paramount.",
  readyToSimplify: "Ready to Simplify Your Service Needs?",
  joinCommunityText: "Join the kariGaar community today. Post a job or find a skilled professional in minutes.",
  chatWithUs: "Chat with Our Assistant", // This title might be less relevant now or can be removed
  openChat: "Open Chat",
  closeChat: "Close Chat"
};

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 px-4 bg-gradient-to-br from-background via-card/30 to-background overflow-hidden">
        <Image
          src="https://placehold.co/200x200.png"
          alt="Service Professional"
          data-ai-hint="worker professional"
          width={150}
          height={150}
          className="absolute top-10 left-10 opacity-10 animate-bounce-slow select-none"
        />
        <Image
          src="https://placehold.co/180x180.png"
          alt="Service Tool"
          data-ai-hint="tools equipment"
          width={120}
          height={120}
          className="absolute bottom-20 right-16 opacity-10 animate-bounce-slow-delay select-none"
        />
         <Image
          src="https://placehold.co/150x150.png"
          alt="Happy Client"
          data-ai-hint="happy client"
          width={100}
          height={100}
          className="absolute top-1/4 right-10 opacity-5 animate-pulse select-none"
        />
         <Image
          src="https://placehold.co/130x130.png"
          alt="Service Icon"
          data-ai-hint="gears process"
          width={130}
          height={130}
          className="absolute bottom-1/3 left-16 opacity-5 animate-pulse-delay select-none"
        />

        <div className="relative z-10">
          <Logo size="xlarge" className="mb-8 justify-center" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-foreground/80">
            {t.appName} <span className="text-primary">{t.getStarted}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.tagline}
          </p>
          <Link href="/platform-home" passHref>
            <Button size="lg" className="px-10 py-6 text-lg transform transition-transform hover:scale-105 active:scale-95 shadow-xl">
              {t.getStartedNow} <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-16 md:py-24 bg-card text-card-foreground">
        <div className="container mx-auto px-4 text-center">
          <Target className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.ourMotivation}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.motivationText}
          </p>
           <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-background rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Zap className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.efficiency}</h3>
              <p className="text-muted-foreground">{t.efficiencyText}</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Users className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.community}</h3>
              <p className="text-muted-foreground">{t.communityText}</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Lightbulb className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.trust}</h3>
              <p className="text-muted-foreground">{t.trustText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* This section for embedded chatbot is now replaced by the floating button */}
      {/* <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">{t.chatWithUs}</h2>
          <div className="max-w-3xl mx-auto bg-card p-4 sm:p-6 rounded-xl shadow-2xl">
            <iframe
              id="JotFormIFrame-0196db22d17d7cc8ab41c9dfabe188b64f9e"
              title="Tyrone: Job Application Assistant"
              onLoad={(e: any) => e.target.parentElement.scrollTo(0, 0)}
              allowtransparency="true"
              allow="geolocation; microphone; camera; fullscreen"
              src="https://agent.jotform.com/0196db22d17d7cc8ab41c9dfabe188b64f9e/voice?embedMode=iframe&background=1&shadow=1"
              frameBorder="0"
              style={{
                minWidth: '100%',
                maxWidth: '100%',
                height: '688px',
                border: 'none',
                width: '100%',
              }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </section> */}
      <Script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js' strategy="lazyOnload" />
      <Script id="jotform-init" strategy="lazyOnload">
        {`
          if (window.jotformEmbedHandler) {
            window.jotformEmbedHandler("iframe[id='JotFormIFrame-0196db22d17d7cc8ab41c9dfabe188b64f9e']", "https://www.jotform.com");
          } else {
            const iframe = document.getElementById('JotFormIFrame-0196db22d17d7cc8ab41c9dfabe188b64f9e');
            if (iframe) {
              const checkHandler = setInterval(() => {
                if (window.jotformEmbedHandler) {
                  clearInterval(checkHandler);
                  window.jotformEmbedHandler("iframe[id='JotFormIFrame-0196db22d17d7cc8ab41c9dfabe188b64f9e']", "https://www.jotform.com");
                }
              }, 100);
            }
          }
        `}
      </Script>

      <section className="py-16 md:py-20 text-center bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">{t.readyToSimplify}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            {t.joinCommunityText}
          </p>
          <Link href="/platform-home" passHref>
            <Button size="lg" className="px-10 py-6 text-lg transform transition-transform hover:scale-105 active:scale-95 shadow-xl">
              {t.explorePlatform} <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Chatbot Trigger Button */}
      {!isChatOpen && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground animate-bounce z-50"
          onClick={() => setIsChatOpen(true)}
          aria-label={t.openChat}
        >
          <MessageCircle size={32} />
        </Button>
      )}

      {/* Chatbot Iframe Container (conditionally rendered) */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 bg-card shadow-2xl rounded-t-lg md:rounded-lg overflow-hidden w-full max-w-md h-[70vh] md:h-[688px] flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex justify-between items-center p-3 bg-secondary text-secondary-foreground border-b">
            <h3 className="font-semibold">{t.chatWithUs}</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} aria-label={t.closeChat}>
              <CloseIcon size={20} />
            </Button>
          </div>
          <div className="flex-grow">
            <iframe
              id="JotFormIFrame-0196db22d17d7cc8ab41c9dfabe188b64f9e"
              title="Tyrone: Job Application Assistant"
              onLoad={(e: any) => {
                // Try to ensure parent is available before scrolling
                if (e.target && e.target.parentElement) {
                  e.target.parentElement.scrollTo(0, 0);
                }
              }}
              allowtransparency="true"
              allow="geolocation; microphone; camera; fullscreen"
              src="https://agent.jotform.com/0196db22d17d7cc8ab41c9dfabe188b64f9e/voice?embedMode=iframe&background=1&shadow=1"
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-bounce-slow {
          animation: bounce-slow 7s infinite;
        }
        .animate-bounce-slow-delay {
          animation: bounce-slow 7s infinite 1.5s; /* 1.5s delay */
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-3%);
            animation-timing-function: cubic-bezier(0.8,0,1,1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0,0,0.2,1);
          }
        }
        .animate-pulse {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-delay {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.7s;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.05; } /* Reduced default opacity for dark theme */
            50% { opacity: 0.2; }
        }
        .dark .animate-pulse, .dark .animate-pulse-delay {
             0%, 100% { opacity: 0.1; }
            50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}

    