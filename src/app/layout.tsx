
"use client";

import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { MessageCircle, X as CloseIcon } from 'lucide-react';

// Hardcoded English translations for layout-specific elements
const layoutTranslations = {
  chatWithUsTitle: "Chat with Our Assistant",
  chatWithUs: "Chat with Us",
  closeChat: "Close Chat",
  pageTitle: "kariGaar - Your Local Service Solution",
  pageDescription: "Find reliable local service professionals for all your needs.",
  footerCopyright: (year: number) => `© ${year} kariGaar. All rights reserved.`
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  // Function to initialize Google Translate Element
  useEffect(() => {
    const existingScript = document.getElementById('google-translate-api');
    
    const initializeGoogleTranslate = () => {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          { 
            pageLanguage: 'en', 
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE 
          },
          'google_translate_element'
        );
      }
    };

    if (!existingScript) {
      const addScript = document.createElement('script');
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitGlobal');
      addScript.setAttribute('id', 'google-translate-api');
      document.body.appendChild(addScript);
      (window as any).googleTranslateElementInitGlobal = initializeGoogleTranslate;
    } else {
      // If script exists, ensure init function is called if element is present
      // This might be needed if the script loaded but element wasn't ready
      if (document.getElementById('google_translate_element')) {
        initializeGoogleTranslate();
      }
    }
  }, []);


  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>{layoutTranslations.pageTitle}</title>
        <meta name="description" content={layoutTranslations.pageDescription} />
      </head>
      <body className={cn("antialiased flex flex-col min-h-screen bg-background font-sans")}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {children}
            </main>
            <Toaster />
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
              {layoutTranslations.footerCopyright(currentYear)}
            </footer>
          </CartProvider>
        </AuthProvider>

        {/* Jotform Chatbot Trigger and Panel */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-xl hover:bg-primary/90 transition-all duration-300 z-[9999]"
            aria-label={layoutTranslations.chatWithUs}
          >
            <MessageCircle size={28} />
          </button>
        )}

        {isChatOpen && (
          <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[400px] sm:h-[calc(100%-4rem)] max-h-[700px] bg-card text-card-foreground shadow-2xl rounded-t-lg sm:rounded-lg flex flex-col z-[10000] overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b bg-secondary text-secondary-foreground">
              <h3 className="font-semibold text-lg">{layoutTranslations.chatWithUsTitle}</h3>
              <button onClick={() => setIsChatOpen(false)} className="p-1 rounded-md hover:bg-secondary/80" aria-label={layoutTranslations.closeChat}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              <iframe
                id="JotFormIFrame-0196db22d17d7cc8ab41c9dfabe188b64f9e"
                title="Tyrone: Job Application Assistant"
                onLoad={(e: any) => {
                   if (e.target && e.target.contentWindow && e.target.contentWindow.parent) {
                     try {
                      e.target.contentWindow.parent.scrollTo(0, 0);
                     } catch (err) {
                      console.warn("Could not scroll parent window from iframe onload:", err);
                     }
                  }
                }}
                allowtransparency="true"
                allow="geolocation; microphone; camera; fullscreen"
                src="https://agent.jotform.com/0196db22d17d7cc8ab41c9dfabe188b64f9e/voice?embedMode=iframe&background=1&shadow=1"
                frameBorder="0"
                style={{
                  minWidth: '100%',
                  maxWidth: '100%',
                  height: '100%',
                  border: 'none',
                  width: '100%',
                }}
                scrolling="no"
              ></iframe>
            </div>
          </div>
        )}
        
        {/* Google Translate Widget - Fixed Box at Bottom Left */}
        <div className="fixed bottom-4 left-4 bg-card p-2 rounded-md shadow-lg z-50 border border-border">
          <div id="google_translate_element"></div>
        </div>

        <Script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js' strategy="lazyOnload" />
        <Script id="jotform-init-layout" strategy="lazyOnload">
          {`
            if (typeof window !== 'undefined') { 
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
            }
          `}
        </Script>
      </body>
    </html>
  );
}
