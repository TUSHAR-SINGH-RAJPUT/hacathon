import type { ServiceProvider, ServiceCategory } from '@/types';

export const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "Painting", label: "Painting" },
  { value: "Gardening", label: "Gardening" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Electrical", label: "Electrical" },
  { value: "Handyman", label: "General Handyman" },
  { value: "Other", label: "Other" },
];

export const dummyProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    serviceTypes: ['Painting', 'Handyman'],
    rating: 4.8,
    location: 'New York, NY',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Alice+J',
    bio: 'Experienced painter and general handyman with over 10 years in the field. Detail-oriented and committed to quality work.',
    experienceYears: 10,
    hourlyRate: '3500-5000', // Updated to INR example range
    reviewsCount: 120,
  },
  {
    id: '2',
    name: 'Bob Williams',
    serviceTypes: ['Gardening', 'Landscaping'],
    rating: 4.5,
    location: 'San Francisco, CA',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Bob+W',
    bio: 'Passionate gardener transforming outdoor spaces. Specializes in sustainable gardening practices.',
    experienceYears: 7,
    hourlyRate: '3000-4500', // Updated
    reviewsCount: 85,
  },
  {
    id: '3',
    name: 'Carol Davis',
    serviceTypes: ['Plumbing'],
    rating: 4.9,
    location: 'Chicago, IL',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Carol+D',
    bio: 'Licensed plumber providing reliable and efficient solutions for all your plumbing needs. Emergency services available.',
    experienceYears: 12,
    hourlyRate: '4000-6000', // Updated
    reviewsCount: 200,
  },
  {
    id: '4',
    name: 'David Martinez',
    serviceTypes: ['Cleaning', 'Handyman'],
    rating: 4.3,
    location: 'Austin, TX',
    profileImageUrl: 'https://placehold.co/400x300.png?text=David+M',
    bio: 'Dedicated to making your home spotless and functional. Offering regular cleaning and minor repair services.',
    experienceYears: 5,
    hourlyRate: '2500-4000', // Updated
    reviewsCount: 65,
  },
   {
    id: '5',
    name: 'Eva Green',
    serviceTypes: ['Electrical'],
    rating: 4.7,
    location: 'Miami, FL',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Eva+G',
    bio: 'Certified electrician ensuring safety and quality for all electrical installations and repairs.',
    experienceYears: 8,
    hourlyRate: '3800-5500', // Updated
    reviewsCount: 92,
  },
  {
    id: '6',
    name: 'Frank Thomas',
    serviceTypes: ['Handyman', 'Painting', 'Plumbing'],
    rating: 4.6,
    location: 'Seattle, WA',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Frank+T',
    bio: 'Versatile handyman skilled in various trades. Your go-to for home maintenance and improvements.',
    experienceYears: 15,
    hourlyRate: '3200-4800', // Updated
    reviewsCount: 150,
  },
];
