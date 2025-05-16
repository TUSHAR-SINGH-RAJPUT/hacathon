"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, Phone, LifeBuoy } from "lucide-react"; 
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDictionary } from '@/lib/dictionaries';
import { useParams } from "next/navigation";

export default function SupportPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const [t, setT] = useState<any>({});
  const [faqItems, setFaqItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchDict = async () => {
      const dict = await getDictionary(locale);
      // Assuming translations for this page are under a key like "SupportPage"
      const pageDict = dict.SupportPage || {
        customerSupportFAQ: "Customer Support & FAQ",
        helpIntro: "We're here to help! Find answers to common questions or reach out to our support team.",
        faqTitle: "Frequently Asked Questions",
        contactUs: "Contact Us",
        contactUsDescription: "Can't find an answer? Get in touch with our support team.",
        emailSupport: "Email: support@karigaar.example.com (Simulated)",
        phoneSupport: "Phone: +91-XXX-XXXXXXX (Simulated)",
        supportHours: "Support hours: Mon-Fri, 9 AM - 6 PM IST.",
        visitPlatformGuide: "Visit our Full Platform Guide",
        faqItems: [ // Default FAQ items if not in dictionary
          { question: "How do I post a job?", answer: "Navigate to the 'Post a Job' page from the header. Fill in the details..." },
          { question: "How do I find a service provider?", answer: "Go to the 'Browse Services' page. You can search by keywords..." },
        ]
      };
      setT(pageDict);
      setFaqItems(pageDict.faqItems || []);
    };
    fetchDict();
  }, [locale]);

  if (Object.keys(t).length === 0) {
    return <div>Loading translations...</div>; 
  }

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-10">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
          <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold text-card-foreground">
            {t.customerSupportFAQ}
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-xl mx-auto">
            {t.helpIntro}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-background shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground flex items-center">
             <HelpCircle className="h-6 w-6 mr-3 text-primary" /> {t.faqTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:text-primary">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="bg-background shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">{t.contactUs}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.contactUsDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <Mail className="h-5 w-5" /> {t.emailSupport}
          </Button>
           <Button variant="outline" className="w-full justify-start text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <Phone className="h-5 w-5" /> {t.phoneSupport}
          </Button>
          <p className="text-xs text-muted-foreground text-center pt-2">{t.supportHours}</p>
        </CardContent>
      </Card>

      <div className="text-center">
         <Link href={`/${locale}/about/guide`} passHref>
          <Button variant="link" className="text-primary text-lg">
            <LifeBuoy className="mr-2 h-5 w-5" /> {t.visitPlatformGuide}
          </Button>
        </Link>
      </div>
    </div>
  );
}
