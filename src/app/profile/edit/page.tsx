// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
// For client components, translations should be passed as props or from context.
// For this example, we'll keep it simple.
// To fully internationalize, this page would need access to `dict` like other pages.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Mail, Phone } from "lucide-react";
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/../next.config';

type Props = {
  params: { locale: Locale };
};

// This page needs to be async to use getDictionary
export default async function EditProfilePage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale); // Fetch dictionary

  // Use translations from dict
  const t = {
    editYourProfile: dict.editProfile || "Edit Your Profile", // Fallback
    keepInfoUpToDate: dict.keepInfoUpToDate || "Keep your information up to date.",
    fullName: dict.fullName || "Full Name",
    emailAddress: dict.emailAddress || "Email Address",
    phoneNumber: dict.phoneNumber || "Phone Number",
    bio: dict.bio || "Bio",
    saveChanges: dict.saveChanges || "Save Changes (Simulated)"
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <UserCircle className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.editYourProfile}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.keepInfoUpToDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="flex items-center"><UserCircle className="inline h-4 w-4 mr-2 opacity-70" />{t.fullName}</Label>
              <Input id="fullName" defaultValue="Demo User Name" />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center"><Mail className="inline h-4 w-4 mr-2 opacity-70" />{t.emailAddress}</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center"><Phone className="inline h-4 w-4 mr-2 opacity-70" />{t.phoneNumber}</Label>
              <Input id="phone" type="tel" defaultValue="+91 9876543210" />
            </div>
            <div>
              <Label htmlFor="bio">{t.bio}</Label>
              <Textarea id="bio" defaultValue="This is a short bio about the user." className="min-h-[100px]" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {t.saveChanges}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
