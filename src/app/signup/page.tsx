
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] animate-in fade-in duration-500 py-8">
      <Card className="w-full max-w-md shadow-xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join kariGaar today to connect with service providers or offer your skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center text-card-foreground"><User className="h-4 w-4 mr-2 text-primary" />Full Name</Label>
            <Input id="fullName" type="text" placeholder="Priya Sharma" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center text-card-foreground"><Mail className="h-4 w-4 mr-2 text-primary" />Email Address</Label>
            <Input id="email" type="email" placeholder="priya.sharma@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center text-card-foreground"><Lock className="h-4 w-4 mr-2 text-primary" />Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
