// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// For client components, translations need to be passed as props or via context.
// This example will use hardcoded English for simplicity.
export default function SignUpPage() {
  const { login } = useAuth(); 
  const router = useRouter();

  const t = {
    createYourAccount: "Create Your Account",
    joinKariGaar: "Join kariGaar today to connect with service providers or offer your skills.",
    fullName: "Full Name",
    fullNamePlaceholder: "Priya Sharma",
    emailAddress: "Email Address",
    emailPlaceholder: "priya.sharma@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    confirmPassword: "Confirm Password",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    logIn: "Log In"
  };


  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault(); 
    login(); 
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500 py-8">
      <Card className="w-full max-w-md shadow-xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">{t.createYourAccount}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.joinKariGaar}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center text-card-foreground"><User className="h-4 w-4 mr-2 text-primary" />{t.fullName}</Label>
              <Input id="fullName" type="text" placeholder={t.fullNamePlaceholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-card-foreground"><Mail className="h-4 w-4 mr-2 text-primary" />{t.emailAddress}</Label>
              <Input id="email" type="email" placeholder={t.emailPlaceholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />{t.password}</Label>
              <Input id="password" type="password" placeholder={t.passwordPlaceholder} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />{t.confirmPassword}</Label>
              <Input id="confirmPassword" type="password" placeholder={t.passwordPlaceholder} required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {t.signUp}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {t.alreadyHaveAccount}{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                {t.logIn}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
