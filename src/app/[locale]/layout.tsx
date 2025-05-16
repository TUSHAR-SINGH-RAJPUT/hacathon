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

// export const metadata: Metadata = { // Metadata can be dynamic based on locale
//   title: 'kariGaar - Your Local Service Solution',
//   description: 'Find reliable local service professionals for all your needs.',
// };

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  return {
    title: `${dict.appName} - ${dict.tagline}`,
    description: dict.tagline, // Or a more specific description from dict
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'kn' }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <AuthProvider>
          <CartProvider> 
            <Header locale={locale} dict={dict.Header} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {children}
            </main>
            <Toaster />
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
              © {new Date().getFullYear()} {dict.appName}. {dict.footerRights}
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
