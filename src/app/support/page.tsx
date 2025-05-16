// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, Phone, LifeBuoy } from "lucide-react"; 
import Link from "next/link";
import { getDictionary } from '@/lib/dictionaries';

const createFaqItems = (dict: any) => [
  {
    question: dict.faqPostJobQ || "How do I post a job?",
    answer: dict.faqPostJobA || "Navigate to the 'Post a Job' page from the header. Fill in the details about your service needs, location, and urgency. The more details you provide, the better matches you'll get!"
  },
  {
    question: dict.faqFindProviderQ || "How do I find a service provider?",
    answer: dict.faqFindProviderA || "Go to the 'Browse Services' page. You can search by keywords, filter by service category, location, and ratings to find the perfect professional for your task."
  },
  {
    question: dict.faqPaymentSecureQ || "Is my payment secure?",
    answer: dict.faqPaymentSecureA || "Currently, we support Cash on Delivery. Online payment simulation is for demonstration. In a live system, online payments would be processed through secure, encrypted gateways."
  },
  {
    question: dict.faqBecomeProviderQ || "How can I become a service provider on kariGaar?",
    answer: dict.faqBecomeProviderA || "Click on 'Join as Pro' in the navigation. Fill out the registration form with your details and services offered. After submission and verification, your profile will be listed."
  },
];

type Props = {
  params: { locale: string }; // Changed Locale to string
};

export default async function SupportPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const faqItems = createFaqItems(dict); // Pass dict to create localized FAQs

  const t = {
    customerSupportFAQ: dict.customerSupportFAQ || "Customer Support & FAQ",
    helpIntro: dict.helpIntro || "We're here to help! Find answers to common questions or reach out to our support team.",
    faqTitle: dict.faqTitle || "Frequently Asked Questions",
    contactUs: dict.contactUs || "Contact Us",
    contactUsDescription: dict.contactUsDescription || "Can't find an answer? Get in touch with our support team.",
    emailSupport: dict.emailSupport || "Email: support@karigaar.example.com (Simulated)",
    phoneSupport: dict.phoneSupport || "Phone: +91-XXX-XXXXXXX (Simulated)",
    supportHours: dict.supportHours || "Support hours: Mon-Fri, 9 AM - 6 PM IST.",
    visitPlatformGuide: dict.visitPlatformGuide || "Visit our Full Platform Guide"
  };

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
