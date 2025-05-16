// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
// import { getDictionary } from '@/lib/dictionaries'; // Client component, cannot use getDictionary directly
// import type { Locale } from '@/../next.config';

// Dummy SVG for Google Icon
const GoogleIcon = () => (
  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

// Dummy SVG for Facebook Icon
const FacebookIcon = () => (
  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zm3.03 7.8H13.55v-1.3c0-.5.38-.62.7-.62h.75V6.05h-1.3c-1.62 0-2.18.88-2.18 2.18v1.53H9.96v1.88h1.57v5.82h1.92v-5.82h1.4l.18-1.88z" />
  </svg>
);

// For client components, translations need to be passed as props or via context.
// This example will use hardcoded English for simplicity as it's not a page getting `params.locale`.
// Or, we'd fetch translations client-side if needed.

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  // Placeholder translations, ideally pass from parent or use client-side i18n hook
  const t = {
    welcomeBack: "Welcome Back!",
    loginToAccess: "Log in to access your account and manage your services.",
    emailAddress: "Email Address",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    forgotPassword: "Forgot password?",
    or: "OR",
    loginWithGoogle: "Login with Google",
    loginWithFacebook: "Login with Facebook",
    logIn: "Log In",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up"
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login();
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500 py-8">
      <Card className="w-full max-w-md shadow-xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">{t.welcomeBack}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.loginToAccess}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-card-foreground"><User className="h-4 w-4 mr-2 text-primary" />{t.emailAddress}</Label>
              <Input id="email" type="email" placeholder={t.emailPlaceholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />{t.password}</Label>
              <Input id="password" type="password" placeholder={t.passwordPlaceholder} required />
            </div>
            <div className="flex items-center justify-between">
               <Link href="#" className="text-sm text-primary hover:underline">
                 {t.forgotPassword}
               </Link>
            </div>

            <div className="relative my-4">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                {t.or}
              </span>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full text-foreground" type="button" onClick={login}>
                <GoogleIcon /> {t.loginWithGoogle}
              </Button>
              <Button variant="outline" className="w-full text-foreground" type="button" onClick={login}>
                <FacebookIcon /> {t.loginWithFacebook}
              </Button>
            </div>

          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {t.logIn}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {t.dontHaveAccount}{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                {t.signUp}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
