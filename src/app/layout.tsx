
import type {Metadata} from 'next';
// import { GeistSans } from 'geist/font/sans'; // Assuming Geist is set up correctly
// import { GeistMono } from 'geist/font/mono'; // Assuming Geist is set up correctly
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { cn } from "@/lib/utils";

// If you are using Geist font, uncomment the imports above and the variables below
// const geistSansVariable = GeistSans.variable;
// const geistMonoVariable = GeistMono.variable;

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
      {/* Ensure no whitespace or invalid elements are direct children of <html> here */}
      {/* <body className={cn(geistSansVariable, geistMonoVariable, "antialiased flex flex-col min-h-screen bg-background")}> */}
      <body className={cn("antialiased flex flex-col min-h-screen bg-background font-sans")}> {/* Fallback font-sans if Geist is not used */}
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
          can cause hydration errors.
        */}
      </body>
    </html>
  );
}
