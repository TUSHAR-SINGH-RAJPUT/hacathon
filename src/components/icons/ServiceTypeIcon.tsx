
// @ts-nocheck comment to disable all type checking in a file
// Remove the @ts-nocheck comment above after you have fixed all the type errors in this file
import type { ServiceProvider } from '@/types';
import { Paintbrush, Sprout, Wrench, Sparkles, Zap, Users, Briefcase } from 'lucide-react';
import React from 'react';

// Define the icon mapping carefully, ensure ServiceProvider['serviceTypes'][0] is compatible with the keys
// Typically, ServiceCategory from types/index.ts would be used here if it's a union of literals
const serviceIconMap: Record<ServiceProvider['serviceTypes'][0], React.ReactNode> = {
  Painting: <Paintbrush className="h-full w-full" />,
  Gardening: <Sprout className="h-full w-full" />,
  Plumbing: <Wrench className="h-full w-full" />,
  Cleaning: <Sparkles className="h-full w-full" />,
  Electrical: <Zap className="h-full w-full" />,
  Handyman: <Users className="h-full w-full" />,
  Landscaping: <Sprout className="h-full w-full" />, // Landscaping can use Sprout or a different icon if available
  Other: <Briefcase className="h-full w-full" />,
};

interface ServiceTypeIconProps {
  type: ServiceProvider['serviceTypes'][0];
  className?: string; // Allow className to be passed for sizing and styling
}

const ServiceTypeIcon = ({ type, className = "h-5 w-5" }: ServiceTypeIconProps) => {
  const iconElement = serviceIconMap[type] || <Briefcase className="h-full w-full" />;
  
  // Clone the element to apply the className prop.
  // Check if iconElement is a valid React element before cloning.
  if (React.isValidElement(iconElement)) {
    return React.cloneElement(iconElement, { className });
  }
  return <Briefcase className={className} />; // Fallback
};

export default ServiceTypeIcon;
