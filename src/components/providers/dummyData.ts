
import type { ServiceProvider, ServiceCategory } from '@/types';

export const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "Painting", label: "Painting" },
  { value: "Gardening", label: "Gardening" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Electrical", label: "Electrical" },
  { value: "Handyman", label: "General Handyman" },
  { value: "Landscaping", label: "Landscaping" }, // Added Landscaping
  { value: "Other", label: "Other" },
];

export const dummyProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    serviceTypes: ['Painting', 'Handyman'],
    rating: 4.8,
    location: 'Bangalore, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Priya+S',
    bio: 'Experienced painter and general handyman with over 10 years in the field. Detail-oriented and committed to quality work. I specialize in residential and commercial painting, offering a range of finishes and techniques. Also proficient in minor plumbing, electrical fixes, and furniture assembly.',
    experienceYears: 10,
    hourlyRate: '3500-5000',
    reviewsCount: 120,
    portfolioImages: [
      'https://placehold.co/600x400.png?text=Painting+Project+1',
      'https://placehold.co/600x400.png?text=Handyman+Repair',
      'https://placehold.co/600x400.png?text=Interior+Work'
    ]
  },
  {
    id: '2',
    name: 'Rohan Patel',
    serviceTypes: ['Gardening', 'Landscaping'],
    rating: 4.5,
    location: 'Mysore, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Rohan+P',
    bio: 'Passionate gardener and landscaper transforming outdoor spaces. Specializes in sustainable gardening practices, landscape design, and regular garden maintenance. From lawn care to creating beautiful flower beds, I can help your garden thrive.',
    experienceYears: 7,
    hourlyRate: '3000-4500',
    reviewsCount: 85,
    portfolioImages: [
      'https://placehold.co/600x400.png?text=Garden+Makeover',
      'https://placehold.co/600x400.png?text=Lawn+Care',
    ]
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    serviceTypes: ['Plumbing'],
    rating: 4.9,
    location: 'Mangalore, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Ananya+R',
    bio: 'Licensed plumber providing reliable and efficient solutions for all your plumbing needs. Emergency services available 24/7. Expertise in leak detection, pipe repairs, fixture installations, and drain cleaning.',
    experienceYears: 12,
    hourlyRate: '4000-6000',
    reviewsCount: 200,
  },
  {
    id: '4',
    name: 'Vikram Singh',
    serviceTypes: ['Cleaning', 'Handyman'],
    rating: 4.3,
    location: 'Hubli, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Vikram+S',
    bio: 'Dedicated to making your home spotless and functional. Offering regular house cleaning, deep cleaning services, and minor repair tasks. I bring my own eco-friendly cleaning supplies.',
    experienceYears: 5,
    hourlyRate: '2500-4000',
    reviewsCount: 65,
     portfolioImages: [
      'https://placehold.co/600x400.png?text=Sparkling+Clean+Kitchen',
      'https://placehold.co/600x400.png?text=Odd+Job+Fixed',
    ]
  },
   {
    id: '5',
    name: 'Susmita Banerjee',
    serviceTypes: ['Electrical'],
    rating: 4.7,
    location: 'Belgaum, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Susmita+B',
    bio: 'Certified electrician ensuring safety and quality for all electrical installations and repairs. Experienced in wiring, light fixture installation, circuit breaker issues, and smart home setups.',
    experienceYears: 8,
    hourlyRate: '3800-5500',
    reviewsCount: 92,
  },
  {
    id: '6',
    name: 'Arjun Rao',
    serviceTypes: ['Handyman', 'Painting', 'Plumbing'],
    rating: 4.6,
    location: 'Davanagere, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Arjun+R',
    bio: 'Versatile handyman skilled in various trades. Your go-to for home maintenance and improvements. Proficient in painting, minor plumbing repairs, carpentry, and general upkeep tasks.',
    experienceYears: 15,
    hourlyRate: '3200-4800',
    reviewsCount: 150,
  },
];
