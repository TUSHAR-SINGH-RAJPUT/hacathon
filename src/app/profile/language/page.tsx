"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const languageOptions = [
  { value: 'english', label: 'English', description: 'Use English language' },
  { value: 'kannada', label: 'ಕನ್ನಡ', description: 'ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಬಳಸಿ' },
  { value: 'hindi', label: 'हिंदी', description: 'हिंदी भाषा का उपयोग करें' },
];

export default function LanguageSettingsPage() {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: 'english' | 'kannada' | 'hindi') => {
    setLanguage(newLanguage);
    toast({
      title: "Language Updated",
      description: "Your language preference has been saved.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <Card className="shadow-xl bg-card">
        <CardHeader>
          <Languages className="h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            Language Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Choose your preferred language for the platform interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={language} 
            onValueChange={(value: 'english' | 'kannada' | 'hindi') => handleLanguageChange(value)}
            className="space-y-4"
          >
            {languageOptions.map((option) => (
              <Label
                key={option.value}
                className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex-1">
                  <div className="text-sm font-medium leading-none">{option.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
          
          <div className="text-sm text-muted-foreground mt-6">
            <p>Note: This will change the language for the platform interface. Some content may remain in English.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}