import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import '../globals.css'; // Adjusted path for CSS
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { getDictionary } from '@/lib/dictionaries';

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Ensure locale is valid before fetching dictionary, default to 'en'
  const currentLocale = (params?.locale && ['en', 'kn'].includes(params.locale)) ? params.locale : 'en';
  const dict = await getDictionary(currentLocale);
  const appName = (dict && typeof dict.appName === 'string') ? dict.appName : "kariGaar";
  const tagline = (dict && typeof dict.tagline === 'string') ? dict.tagline : "Your Local Service Solution";
  return {
    title: `${appName} - ${tagline}`,
    description: tagline,
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'kn' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string }; // Locale can be optional here for robustness
}>) {
  // Ensure locale is valid before fetching dictionary, default to 'en'
  const currentLocale = (params?.locale && ['en', 'kn'].includes(params.locale)) ? params.locale : 'en';
  const dict = await getDictionary(currentLocale);

  // Prepare props for Header and Footer, ensuring they are always valid objects or strings
  const headerDictForProps = (dict && typeof dict.Header === 'object' && dict.Header !== null) ? dict.Header : {};
  const appNameForProps = (dict && typeof dict.appName === 'string') ? dict.appName : "kariGaar";
  const footerRightsForProps = (dict && typeof dict.footerRights === 'string') ? dict.footerRights : "All rights reserved.";

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <AuthProvider>
          <CartProvider> 
            <Header locale={currentLocale} fullDict={dict || {}} /> {/* Pass full dict, or empty obj if dict failed */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {children}
            </main>
            <Toaster />
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
              © {new Date().getFullYear()} {appNameForProps}. {footerRightsForProps}
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
