
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const { login } = useAuth(); // Use login for simulated signup as well
  const router = useRouter();

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    // Add actual signup logic here if needed
    login(); // Call the login function from AuthContext to simulate session start
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500 py-8">
      <Card className="w-full max-w-md shadow-xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join kariGaar today to connect with service providers or offer your skills.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center text-card-foreground"><User className="h-4 w-4 mr-2 text-primary" />Full Name</Label>
              <Input id="fullName" type="text" placeholder="Priya Sharma" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-card-foreground"><Mail className="h-4 w-4 mr-2 text-primary" />Email Address</Label>
              <Input id="email" type="email" placeholder="priya.sharma@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Sign Up
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
