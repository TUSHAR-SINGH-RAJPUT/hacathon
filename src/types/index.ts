
export type ServiceCategory = "Painting" | "Gardening" | "Plumbing" | "Cleaning" | "Electrical" | "Handyman" | "Landscaping" | "Other";

export interface Review {
  id: string;
  reviewerName: string;
  rating: number; // 0-5
  comment: string;
  date: string; // ISO date string
}

export interface JobRequest {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  location: string;
  urgency: "Urgent" | "Within a week" | "Flexible";
  size: "Small" | "Medium" | "Large";
  numberOfPeople?: number; // Added
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
  reviews?: Review[]; // Added
}

// Added for Cart functionality
export interface CartItem extends ServiceProvider {
  // Potentially add job-specific details later, e.g., selected service
}

export interface BookingDetails {
  provider: ServiceProvider;
  customerAddress: string;
  paymentMethod: "Cash on Delivery" | "Online Payment";
  bookingDate: string; // ISO date string
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'provider';
  timestamp: Date;
  providerId?: string; // Optional: to associate message with a provider if needed globally
  userId?: string; // Optional: to associate message with a user
}
