
"use client";

import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from 'react'; // Ensure React is imported
import Script from 'next/script';
import { MessageCircle, X as CloseIcon } from 'lucide-react';

// For Leaflet icon fix - import these at the top
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';


// Hardcoded English translations for layout-specific elements
const layoutTranslations = {
  chatWithUsTitle: "Chat with Our Assistant",
  chatWithUs: "Chat with Us",
  closeChat: "Close Chat",
  pageTitle: "kariGaar - Your Local Service Solution",
  pageDescription: "Find reliable local service professionals for all your needs.",
  footerCopyright: (year: number) => `© ${year} kariGaar. All rights reserved.`,
  googleTranslateLabel: "Translate Page"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  // Effect for Leaflet global icon setup
  useEffect(() => {
    if (typeof window !== "undefined" && L && L.Icon && L.Icon.Default) {
      // Check if already configured to prevent re-configuration
      // Use a custom flag to ensure it's only configured once.
      if (!(L.Icon.Default.prototype as any)._iconInitialConfigured) {
          delete (L.Icon.Default.prototype as any)._getIconUrl; // Important for Webpack
          L.Icon.Default.mergeOptions({
              iconRetinaUrl: iconRetinaUrl.src,
              iconUrl: iconUrl.src,
              shadowUrl: shadowUrl.src,
          });
          (L.Icon.Default.prototype as any)._iconInitialConfigured = true;
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount


  // Function to initialize Google Translate Element
  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if ((window as any).google && (window as any).google.translate) {
        // Initialization will now be triggered from Header.tsx
        console.log("Google Translate API loaded from Layout, init function is ready.");
      }
    };

    // Check if the script already exists to avoid duplicates
    if (!document.getElementById('google-translate-api')) {
      const addScript = document.createElement('script');
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitGlobal');
      addScript.setAttribute('id', 'google-translate-api');
      document.body.appendChild(addScript);
      (window as any).googleTranslateElementInitGlobal = initializeGoogleTranslate;
    } else {
      // If script exists but element might not (e.g., due to HMR), re-check if init is needed
      if (document.getElementById('google_translate_element_header') && !(document.getElementById('google_translate_element_header') as any)._googleTranslateInitialized && (window as any).googleTranslateElementInitGlobal) {
        // (window as any).googleTranslateElementInitGlobal(); // Handled by Header.tsx
      }
    }
  }, []);


  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>{layoutTranslations.pageTitle}</title>
        <meta name="description" content={layoutTranslations.pageDescription} />
        {/* Leaflet CSS - critical for map display */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
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
               {/* Google Translate Element Container is now in Header */}
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
                      // console.warn("Could not scroll parent window from iframe onload:", err);
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
        
        <Script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js' strategy="lazyOnload" />
        <Script id="jotform-init-layout" strategy="lazyOnload">
          {`
            if (typeof window !== 'undefined') { 
              const initJotform = () => {
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
              };
              if (document.readyState === 'complete') {
                initJotform();
              } else {
                window.addEventListener('load', initJotform);
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
