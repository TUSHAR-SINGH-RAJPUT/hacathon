import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, Briefcase, Paintbrush, Sprout, Wrench, Sparkles, Zap } from 'lucide-react';

const featureCards = [
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Post Your Job Easily',
    description: 'Describe your task, set your location, and let skilled professionals come to you.',
    link: '/post-job',
    linkText: 'Get Started',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Find Trusted Pros',
    description: 'Browse a directory of vetted service providers for any job, big or small.',
    link: '/browse-providers',
    linkText: 'Browse Pros',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Quality Guaranteed',
    description: 'Connect with reliable experts committed to delivering top-notch service.',
    link: '#',
    linkText: 'Learn More',
  },
];

const serviceCategories = [
  { name: 'Painting', icon: <Paintbrush className="h-10 w-10 mx-auto text-accent-foreground group-hover:text-primary transition-colors" />, dataAiHint: "painting wall" },
  { name: 'Gardening', icon: <Sprout className="h-10 w-10 mx-auto text-accent-foreground group-hover:text-primary transition-colors" />, dataAiHint: "gardening tools" },
  { name: 'Plumbing', icon: <Wrench className="h-10 w-10 mx-auto text-accent-foreground group-hover:text-primary transition-colors" />, dataAiHint: "plumbing pipes" },
  { name: 'Cleaning', icon: <Sparkles className="h-10 w-10 mx-auto text-accent-foreground group-hover:text-primary transition-colors" />, dataAiHint: "cleaning supplies" },
  { name: 'Electrical', icon: <Zap className="h-10 w-10 mx-auto text-accent-foreground group-hover:text-primary transition-colors" />, dataAiHint: "electrical wires" },
  { name: 'Handyman', icon: <Users className="h-10 w-10 mx-auto text-accent-foreground group-hover:text-primary transition-colors" />, dataAiHint: "tools toolbox" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-12 md:space-y-16 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-card rounded-xl shadow-lg w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-card-foreground">
            Connect with Skilled Pros, <span className="text-primary">Effortlessly</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            HandyConnect is your one-stop platform to find reliable local service providers for all your needs. From home repairs to garden makeovers, get it done right.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/post-job" passHref>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-transform hover:scale-105">
                Post a Job <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/browse-providers" passHref>
              <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground shadow-md transition-transform hover:scale-105">
                Find a Pro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12">How HandyConnect Works</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link href={feature.link} passHref>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    {feature.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Featured Services Section */}
      <section className="w-full py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12">Explore Popular Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {serviceCategories.map((service) => (
            <Link key={service.name} href={`/browse-providers?service=${encodeURIComponent(service.name)}`} passHref>
              <Card className="group text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-secondary hover:bg-primary/10">
                <div className="mb-3 p-3 inline-block rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-md font-semibold text-secondary-foreground group-hover:text-primary transition-colors">{service.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial/Placeholder Section */}
      <section className="w-full py-12 md:py-16 text-center bg-card rounded-xl shadow-lg">
         <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-card-foreground">Join Thousands of Satisfied Customers</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Ready to tackle your to-do list? HandyConnect makes it simple.
          </p>
          <Image 
            src="https://placehold.co/800x400.png" 
            alt="Satisfied customer collage"
            data-ai-hint="happy people community" 
            width={800} 
            height={400} 
            className="rounded-lg mx-auto shadow-md" 
          />
        </div>
      </section>
    </div>
  );
}
