// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
// For client components, translations should be passed as props or from context.
// To fully internationalize, this page would need access to `dict` like other pages.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, History, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/../next.config';

type Props = {
  params: { locale: Locale };
};

export default async function SecurityPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  const t = {
    securitySettings: dict.securitySettings || "Security Settings",
    manageSecurityPrefs: dict.manageSecurityPrefs || "Manage your account security preferences.",
    changePassword: dict.changePassword || "Change Password",
    currentPassword: dict.currentPassword || "Current Password",
    newPassword: dict.newPassword || "New Password",
    confirmNewPassword: dict.confirmNewPassword || "Confirm New Password",
    updatePasswordSimulated: dict.updatePasswordSimulated || "Update Password (Simulated)",
    notificationSettings: dict.notificationSettings || "Notification Settings",
    emailNotifications: dict.emailNotifications || "Email Notifications",
    emailNotificationsDesc: dict.emailNotificationsDesc || "Receive updates about your bookings and platform news.",
    smsNotifications: dict.smsNotifications || "SMS Notifications",
    smsNotificationsDesc: dict.smsNotificationsDesc || "Get critical alerts via SMS (e.g., booking confirmations).",
    loginActivity: dict.loginActivity || "Login Activity",
    lastLoginInfo: dict.lastLoginInfo || "Last login: August 10, 2024, 10:00 AM from Bangalore, India (Chrome on Desktop). (This is placeholder data. Actual login activity would be displayed here.)",
    viewFullLoginHistory: dict.viewFullLoginHistory || "View Full Login History (Simulated)",
    securityConcernsContact: dict.securityConcernsContact || "For any security concerns, please contact support immediately."
  };


  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <Shield className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            {t.securitySettings}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.manageSecurityPrefs}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center"><Lock className="mr-2 h-5 w-5 text-primary" />{t.changePassword}</h3>
              <div className="space-y-4 p-4 border rounded-md bg-background">
                <div>
                  <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="newPassword">{t.newPassword}</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">{t.confirmNewPassword}</Label>
                  <Input id="confirmNewPassword" type="password" placeholder="••••••••" />
                </div>
                <Button type="button" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  {t.updatePasswordSimulated}
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" />{t.notificationSettings}</h3>
              <div className="space-y-4 p-4 border rounded-md bg-background">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">{t.emailNotifications}</Label>
                    <p className="text-xs text-muted-foreground">{t.emailNotificationsDesc}</p>
                  </div>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                   <div>
                    <Label htmlFor="smsNotifications" className="font-medium">{t.smsNotifications}</Label>
                    <p className="text-xs text-muted-foreground">{t.smsNotificationsDesc}</p>
                  </div>
                  <Switch id="smsNotifications" />
                </div>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center"><History className="mr-2 h-5 w-5 text-primary" />{t.loginActivity}</h3>
              <div className="p-4 border rounded-md bg-background">
                <p className="text-sm text-muted-foreground">
                  {t.lastLoginInfo}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary mt-2">{t.viewFullLoginHistory}</Button>
              </div>
            </div>
             <p className="text-xs text-muted-foreground text-center pt-4">{t.securityConcernsContact}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
