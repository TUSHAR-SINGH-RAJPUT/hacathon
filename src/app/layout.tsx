
import type {Metadata} from 'next';
// import { Geist } from 'next/font/google'; // Temporarily removed for diagnostics
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
// import { cn } from "@/lib/utils"; // cn was only used for geistSans.variable

// const geistSans = Geist({ // Temporarily removed for diagnostics
//   subsets: ['latin'],
//   variable: '--font-geist-sans',
// });

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
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* <body className={cn(geistSans.variable, "antialiased flex flex-col min-h-screen bg-background")}> */}
      <body className={`antialiased flex flex-col min-h-screen bg-background`}> {/* Simplified body class, removed geistSans.variable */}
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {children}
            </main>
            <Toaster />
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
              © {new Date().getFullYear()} kariGaar. All rights reserved.
            </footer>
          </CartProvider>
        </AuthProvider>
        {/*
          Reminder: If you've added the Botpress script or any other third-party scripts,
          ensure they are placed INSIDE the <body> tag, ideally just before the closing </body> tag.
          Incorrect placement (e.g., directly under <html> or after </body>)
          can cause hydration errors like the one you're seeing.
        */}
      </body>
    </html>
  );
}
