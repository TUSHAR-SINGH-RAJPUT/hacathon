"use client"; // This page uses client-side charts and interactions

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, Briefcase, Paintbrush, Sprout, Wrench, Sparkles, Zap, PieChart, UserCheck } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Pie, Cell, ResponsiveContainer as RechartsResponsiveContainer } from "recharts";
import React, { useState, useEffect } from 'react';

// Content from PlatformHomeContent.tsx is now directly here
// Hardcoded English strings
const dict = {
  welcomeToKariGaar: "Welcome to kariGaar!",
  platformDescription: "Your one-stop platform to find reliable local service providers for all your needs. From home repairs to garden makeovers, get it done right.",
  navPostJob: "Post a Job",
  findTrustedPros: "Find Trusted Pros",
  howItWorks: "How kariGaar Works",
  postYourJobEasily: "Post Your Job Easily",
  postJobDescription: "Describe your task, set your location, and let skilled professionals come to you.",
  navBrowseServices: "Browse Services",
  qualityGuaranteed: "Quality Guaranteed",
  qualityDescription: "Connect with reliable experts committed to delivering top-notch service.",
  learnMore: "Learn More",
  getStarted: "Get Started",
  explorePopularServices: "Explore Popular Services",
  ourImpact: "Our Impact",
  customerGrowth: "Customer Growth",
  jobConnections: "Job Connections",
  joinThousands: "Join Thousands of Satisfied Users",
  readyToTackle: "Ready to tackle your to-do list or find your next gig? kariGaar makes it simple."
};

const serviceCategories = [
  { name: 'Painting', icon: <Paintbrush className="h-10 w-10 mx-auto group-hover:text-primary/80 transition-colors" />, dataAiHint: "painting wall", bgColor: "bg-red-500/10", hoverBgColor: "hover:bg-red-500/20", iconColor: "text-red-500" },
  { name: 'Gardening', icon: <Sprout className="h-10 w-10 mx-auto group-hover:text-primary/80 transition-colors" />, dataAiHint: "gardening tools", bgColor: "bg-green-500/10", hoverBgColor: "hover:bg-green-500/20", iconColor: "text-green-500" },
  { name: 'Plumbing', icon: <Wrench className="h-10 w-10 mx-auto group-hover:text-primary/80 transition-colors" />, dataAiHint: "plumbing pipes", bgColor: "bg-blue-500/10", hoverBgColor: "hover:bg-blue-500/20", iconColor: "text-blue-500" },
  { name: 'Cleaning', icon: <Sparkles className="h-10 w-10 mx-auto group-hover:text-primary/80 transition-colors" />, dataAiHint: "cleaning supplies", bgColor: "bg-yellow-500/10", hoverBgColor: "hover:bg-yellow-500/20", iconColor: "text-yellow-500" },
  { name: 'Electrical', icon: <Zap className="h-10 w-10 mx-auto group-hover:text-primary/80 transition-colors" />, dataAiHint: "electrical wires", bgColor: "bg-purple-500/10", hoverBgColor: "hover:bg-purple-500/20", iconColor: "text-purple-500" },
  { name: 'Handyman', icon: <Users className="h-10 w-10 mx-auto group-hover:text-primary/80 transition-colors" />, dataAiHint: "tools toolbox", bgColor: "bg-orange-500/10", hoverBgColor: "hover:bg-orange-500/20", iconColor: "text-orange-500" },
];

const customerData = [
  { name: "Satisfied Customers", value: 1250, fill: "hsl(var(--primary))" },
  { name: "New Users This Month", value: 300, fill: "hsl(var(--secondary))" },
];

const jobsData = [
  { name: "Jobs Completed", value: 2800, fill: "hsl(var(--primary))" },
  { name: "Active Listings", value: 450, fill: "hsl(var(--accent))" },
];

const chartConfig = {
  value: { label: 'Count' },
  "Satisfied Customers": { label: "Satisfied Customers", color: "hsl(var(--primary))" },
  "New Users This Month": { label: "New Users This Month", color: "hsl(var(--secondary))" },
  "Jobs Completed": { label: "Jobs Completed", color: "hsl(var(--primary))" },
  "Active Listings": { label: "Active Listings", color: "hsl(var(--accent))" },
} satisfies ChartConfig;


export default function PlatformHomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const featureCards = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: dict.postYourJobEasily,
      description: dict.postJobDescription,
      link: `/post-job`, 
      linkText: dict.getStarted,
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: dict.findTrustedPros,
      description: dict.findProsDescription,
      link: `/browse-providers`, 
      linkText: dict.navBrowseServices,
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: dict.qualityGuaranteed,
      description: dict.qualityDescription,
      link: `/about`, 
      linkText: dict.learnMore,
    },
  ];


  return (
    <div className="flex flex-col items-center space-y-12 md:space-y-16 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-card rounded-xl shadow-lg w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-card-foreground">
            {dict.welcomeToKariGaar}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {dict.platformDescription}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/post-job" passHref>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-transform hover:scale-105">
                {dict.navPostJob} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/browse-providers" passHref>
              <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground shadow-md transition-transform hover:scale-105">
                {dict.findTrustedPros}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12 text-foreground">{dict.howItWorks}</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-semibold text-foreground">{feature.title}</CardTitle>
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
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12 text-foreground">{dict.explorePopularServices}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {serviceCategories.map((service) => (
            <Link key={service.name} href={`/browse-providers?service=${encodeURIComponent(service.name)}`} passHref>
              <Card className={`group text-center p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-background hover:bg-secondary/70 aspect-square flex flex-col justify-center items-center transform hover:scale-105`}>
                <div className={`mb-3 p-4 inline-block rounded-full ${service.bgColor} group-hover:scale-110 ${service.hoverBgColor} transition-all duration-300`}>
                  {React.cloneElement(service.icon as React.ReactElement, { className: `h-10 w-10 mx-auto ${service.iconColor} group-hover:scale-110 transition-transform duration-300` })}
                </div>
                <h3 className={`text-md font-semibold text-foreground group-hover:text-primary transition-colors`}>{service.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Platform Metrics Section */}
      {isClient ? (
        <section className="w-full py-12 md:py-16 bg-secondary rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-10 md:mb-12 text-secondary-foreground">{dict.ourImpact}</h2>
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <Card className="bg-background">
              <CardHeader className="items-center">
                <PieChart className="h-10 w-10 text-primary" />
                <CardTitle className="text-xl text-foreground">{dict.customerGrowth}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                  <RechartsResponsiveContainer width="100%" height="100%">
                    <Pie data={customerData} dataKey="value" nameKey="name" label>
                      {customerData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </RechartsResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader className="items-center">
                <UserCheck className="h-10 w-10 text-primary" />
                <CardTitle className="text-xl text-foreground">{dict.jobConnections}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                   <RechartsResponsiveContainer width="100%" height="100%">
                    <Pie data={jobsData} dataKey="value" nameKey="name" label>
                      {jobsData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </RechartsResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">(Numbers are illustrative)</p>
        </section>
      ) : (
        <section className="w-full py-12 md:py-16 bg-secondary rounded-xl shadow-lg">
           <h2 className="text-3xl font-bold text-center mb-10 md:mb-12 text-secondary-foreground">{dict.ourImpact}</h2>
           <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-background rounded-lg shadow p-6 aspect-square flex items-center justify-center text-muted-foreground min-h-[250px]">Loading chart...</div>
            <div className="bg-background rounded-lg shadow p-6 aspect-square flex items-center justify-center text-muted-foreground min-h-[250px]">Loading chart...</div>
           </div>
           <p className="text-center text-muted-foreground mt-8 text-sm">(Numbers are illustrative)</p>
        </section>
      )}


      {/* Testimonial/Placeholder Section */}
      <section className="w-full py-12 md:py-16 text-center bg-card rounded-xl shadow-lg">
         <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-card-foreground">{dict.joinThousands}</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            {dict.readyToTackle}
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
