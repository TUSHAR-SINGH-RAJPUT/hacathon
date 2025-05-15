
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Mail, Phone } from "lucide-react";

export default function EditProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <UserCircle className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            Edit Your Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Keep your information up to date.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* This is a placeholder form. Actual functionality requires backend. */}
          <form className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="flex items-center"><Mail className="inline h-4 w-4 mr-2 opacity-70" />Full Name</Label>
              <Input id="fullName" defaultValue="Demo User Name" />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center"><UserCircle className="inline h-4 w-4 mr-2 opacity-70" />Email Address</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center"><Phone className="inline h-4 w-4 mr-2 opacity-70" />Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 9876543210" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue="This is a short bio about the user." className="min-h-[100px]" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes (Simulated)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
