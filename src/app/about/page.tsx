
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon, Users, Target, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <section className="text-center py-12 md:py-16 bg-card rounded-xl shadow-lg">
        <InfoIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-card-foreground">
          About kariGaar
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Welcome to kariGaar, your trusted platform for connecting with skilled local service professionals. We aim to make finding reliable help for your home and business needs simple, transparent, and efficient.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://placehold.co/600x400.png"
            alt="Team working together"
            data-ai-hint="team collaboration"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-6">
          <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><Target className="h-7 w-7 mr-3" /> Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our mission is to empower communities by connecting individuals and businesses with skilled local artisans (karigaars) and service providers. We strive to create a seamless experience that fosters trust, quality, and convenience for everyone involved.
              </p>
            </CardContent>
          </Card>
           <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><Users className="h-7 w-7 mr-3" /> Who We Serve</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong>For Customers:</strong> Find vetted professionals for any task, from plumbing and electrical work to painting and gardening. Get fair estimates, read reviews, and book with confidence.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>For Professionals:</strong> Grow your business by showcasing your skills to a wider audience. Receive job leads, manage your profile, and build your reputation on a trusted platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center py-10 bg-secondary rounded-xl shadow-lg">
        <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
          Need Help Navigating kariGaar?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Our comprehensive platform guide provides step-by-step instructions and tips for using all of kariGaar's features, whether you're looking to hire or offer services.
        </p>
        <Link href="/about/guide" passHref>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Explore Our Platform Guide <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
