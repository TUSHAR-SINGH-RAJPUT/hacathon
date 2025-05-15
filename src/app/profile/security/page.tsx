
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, History, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SecurityPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <Shield className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            Security Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your account security preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* This is a placeholder form. Actual functionality requires backend. */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center"><Lock className="mr-2 h-5 w-5 text-primary" />Change Password</h3>
              <div className="space-y-4 p-4 border rounded-md bg-background">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input id="confirmNewPassword" type="password" placeholder="••••••••" />
                </div>
                <Button type="button" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  Update Password (Simulated)
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" />Notification Settings</h3>
              <div className="space-y-4 p-4 border rounded-md bg-background">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates about your bookings and platform news.</p>
                  </div>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                   <div>
                    <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">Get critical alerts via SMS (e.g., booking confirmations).</p>
                  </div>
                  <Switch id="smsNotifications" />
                </div>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center"><History className="mr-2 h-5 w-5 text-primary" />Login Activity</h3>
              <div className="p-4 border rounded-md bg-background">
                <p className="text-sm text-muted-foreground">
                  Last login: August 10, 2024, 10:00 AM from Bangalore, India (Chrome on Desktop).
                  <br />
                  (This is placeholder data. Actual login activity would be displayed here.)
                </p>
                <Button variant="link" className="p-0 h-auto text-primary mt-2">View Full Login History (Simulated)</Button>
              </div>
            </div>
             <p className="text-xs text-muted-foreground text-center pt-4">For any security concerns, please contact support immediately.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
