import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: 'kariGaar - Your Local Service Solution',
  description: 'Find reliable local service professionals for all your needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <AuthProvider>
          <CartProvider> 
            <Header /> {/* Removed locale prop */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {children}
            </main>
            <Toaster />
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
              © {new Date().getFullYear()} kariGaar. All rights reserved. {/* Hardcoded footer */}
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
