
import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import '../globals.css'; // Adjusted path
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { getDictionary } from '@/lib/dictionaries';
import { i18n as i18nConfig } from '../../../next.config'; // Import the named export

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const currentLocale = i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale;
  const dict = await getDictionary(currentLocale);
  return {
    title: (dict.Header?.appName || 'kariGaar') + ' - ' + (dict.LandingPage?.tagline || 'Your Local Service Solution'),
    description: dict.LandingPage?.tagline || 'Find reliable local service professionals for all your needs.',
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const currentLocale = i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale;
  const dict = await getDictionary(currentLocale); // dict is now guaranteed to be an object (at least {})

  const headerTranslations = (dict?.Header && typeof dict.Header === 'object') ? dict.Header : {};
  const footerTranslations = (dict?.Footer && typeof dict.Footer === 'object') ? dict.Footer : {};
  const landingPageTranslations = (dict?.LandingPage && typeof dict.LandingPage === 'object') ? dict.LandingPage : {};
  
  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <AuthProvider>
          <CartProvider> 
            <Header 
              locale={currentLocale} 
              translations={headerTranslations} 
            />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {children}
            </main>
            <Toaster />
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
               © {new Date().getFullYear()} {(landingPageTranslations.appName || 'kariGaar')}. {(footerTranslations.rights || 'All rights reserved.')}
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
