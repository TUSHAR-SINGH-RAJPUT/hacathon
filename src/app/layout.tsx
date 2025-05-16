import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { getDictionary } from '@/lib/dictionaries'; // Import getDictionary

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

// Removed fixed metadata, can be generated per locale if needed
// export const metadata: Metadata = { ... };

export async function generateStaticParams() {
  // Locales from next.config.js
  const locales = ['en', 'hi', 'kn'];
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dict = await getDictionary(params.locale); // Load dictionary for the footer

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <AuthProvider>
          <CartProvider> 
            <Header locale={params.locale} /> {/* Pass locale to Header */}
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
