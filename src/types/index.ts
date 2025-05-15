export type ServiceCategory = "Painting" | "Gardening" | "Plumbing" | "Cleaning" | "Electrical" | "Handyman" | "Other";

export interface JobRequest {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  location: string;
  urgency: "Urgent" | "Within a week" | "Flexible";
  size: "Small" | "Medium" | "Large";
  budget?: string; // Optional
  postedDate: string;
  status: "Open" | "In Progress" | "Completed" | "Cancelled";
  customerId: string;
  images?: string[]; // URLs to images
}

export interface ServiceProvider {
  id: string;
  name: string;
  serviceTypes: ServiceCategory[];
  rating: number; // 0-5
  location: string;
  profileImageUrl?: string;
  bio: string;
  experienceYears: number;
  hourlyRate?: string;
  portfolioImages?: string[]; // URLs
  reviewsCount: number;
}
