
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquareQuestion, Mail, Phone, LifeBuoy } from "lucide-react";
import Link from "next/link";

const faqItems = [
  {
    question: "How do I post a job?",
    answer: "Navigate to the 'Post a Job' page from the header. Fill in the details about your service needs, location, and urgency. The more details you provide, the better matches you'll get!"
  },
  {
    question: "How do I find a service provider?",
    answer: "Go to the 'Browse Services' page. You can search by keywords, filter by service category, location, and ratings to find the perfect professional for your task."
  },
  {
    question: "Is my payment secure?",
    answer: "Currently, we support Cash on Delivery. Online payment simulation is for demonstration. In a live system, online payments would be processed through secure, encrypted gateways."
  },
  {
    question: "How can I become a service provider on kariGaar?",
    answer: "Click on 'Join as Pro' in the navigation. Fill out the registration form with your details and services offered. After submission and verification, your profile will be listed."
  },
];


export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 space-y-10">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
          <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold text-card-foreground">
            Customer Support & FAQ
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-xl mx-auto">
            We're here to help! Find answers to common questions or reach out to our support team.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-background shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground flex items-center">
             <MessageSquareQuestion className="h-6 w-6 mr-3 text-primary" /> Frequently Asked Questions
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
          <CardTitle className="text-xl font-semibold text-foreground">Contact Us</CardTitle>
          <CardDescription className="text-muted-foreground">
            Can't find an answer? Get in touch with our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <Mail className="h-5 w-5" /> Email: support@karigaar.example.com (Simulated)
          </Button>
           <Button variant="outline" className="w-full justify-start text-lg py-3 gap-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <Phone className="h-5 w-5" /> Phone: +91-XXX-XXXXXXX (Simulated)
          </Button>
          <p className="text-xs text-muted-foreground text-center pt-2">Support hours: Mon-Fri, 9 AM - 6 PM IST.</p>
        </CardContent>
      </Card>

      <div className="text-center">
         <Link href="/about/guide" passHref>
          <Button variant="link" className="text-primary text-lg">
            <LifeBuoy className="mr-2 h-5 w-5" /> Visit our Full Platform Guide
          </Button>
        </Link>
      </div>
    </div>
  );
}
