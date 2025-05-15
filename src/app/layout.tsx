import type {Metadata} from 'next';
import { Geist } from 'next/font/google'; // Corrected import for Geist
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({ // Assuming Geist is a variable font, this setup is common
  subsets: ['latin'],
  variable: '--font-geist-sans',
});
// const geistMono = Geist_Mono({ ... }) // If you have Geist_Mono, include it similarly


export const metadata: Metadata = {
  title: 'HandyConnect - Your Local Service Solution',
  description: 'Find skilled professionals for your home and business needs. Post jobs, get estimates, and connect with local service providers easily.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {children}
        </main>
        <Toaster />
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} HandyConnect. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
