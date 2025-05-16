
import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script'; 

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
    <html lang="en" className="dark" suppressHydrationWarning> {/* Ensure "dark" class is here */}
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
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
          BOTPRESS CHATBOT INTEGRATION:
          1. Go to your Botpress dashboard.
          2. Find your chatbot and go to its "Integrations" or "Channels" section.
          3. Look for "Web Chat" or a similar embed option.
          4. Copy the provided <script>...</script> tag.
          5. Replace this entire comment block with the script tag you copied from Botpress.
             It's generally recommended to place chat widget scripts just before the closing </body> tag.
          
          Example of what Botpress script might look like (DO NOT USE THIS, GET YOUR OWN):
          <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
          <script>
            window.botpressWebChat.init({
              "composerPlaceholder": "Chat with bot",
              "botConversationDescription": "This is a friendly chatbot",
              "botId": "YOUR_BOT_ID_HERE",
              "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
              "messagingUrl": "https://messaging.botpress.cloud",
              "clientId": "YOUR_CLIENT_ID_HERE",
              // ... other configuration options
            });
          </script>
        */}

      </body>
    </html>
  );
}
