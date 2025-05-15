
import type { ServiceProvider, ServiceCategory, Review } from '@/types';

export const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "Painting", label: "Painting" },
  { value: "Gardening", label: "Gardening" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Electrical", label: "Electrical" },
  { value: "Handyman", label: "General Handyman" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Other", label: "Other" },
];

const generateReviews = (providerName: string, baseRating: number): Review[] => {
  const reviews: Review[] = [];
  const reviewCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 reviews
  const names = ["Rajesh K.", "Priya S.", "Amit V.", "Deepa M.", "Suresh G.", "Lakshmi R."];
  const comments = [
    `Great job by ${providerName}! Very professional.`,
    `${providerName} was excellent and finished on time.`,
    `Highly recommend ${providerName}. Very skilled.`,
    `Good work, satisfied with ${providerName}'s service.`,
    `A bit slow, but the quality from ${providerName} was good.`,
  ];

  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: `${providerName.replace(/\s+/g, '-')}-review-${i + 1}`,
      reviewerName: names[Math.floor(Math.random() * names.length)],
      rating: Math.min(5, Math.max(1, baseRating - 1 + Math.random() * 2)), // Rating around baseRating
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return reviews;
};


export const dummyProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    serviceTypes: ['Painting', 'Handyman'],
    rating: 4.8,
    location: 'Mandya, Karnataka', // Changed to Mandya
    profileImageUrl: 'https://placehold.co/400x300.png?text=Priya+S',
    bio: 'Experienced painter and general handyman with over 10 years in Mandya. Detail-oriented and committed to quality work. I specialize in residential and commercial painting, offering a range of finishes and techniques. Also proficient in minor plumbing, electrical fixes, and furniture assembly.',
    experienceYears: 10,
    hourlyRate: '350-500',
    reviewsCount: 120,
    portfolioImages: [
      'https://placehold.co/600x400.png?text=Painting+Project+1',
      'https://placehold.co/600x400.png?text=Handyman+Repair',
      'https://placehold.co/600x400.png?text=Interior+Work'
    ],
    reviews: generateReviews('Priya Sharma', 4.8),
  },
  {
    id: '2',
    name: 'Rohan Gowda', // Changed name
    serviceTypes: ['Gardening', 'Landscaping'],
    rating: 4.5,
    location: 'Mandya, Karnataka', // Changed to Mandya
    profileImageUrl: 'https://placehold.co/400x300.png?text=Rohan+G',
    bio: 'Passionate gardener and landscaper transforming outdoor spaces in Mandya and nearby areas. Specializes in sustainable gardening practices, landscape design, and regular garden maintenance. From lawn care to creating beautiful flower beds, I can help your garden thrive.',
    experienceYears: 7,
    hourlyRate: '300-450',
    reviewsCount: 85,
    portfolioImages: [
      'https://placehold.co/600x400.png?text=Garden+Makeover',
      'https://placehold.co/600x400.png?text=Lawn+Care',
    ],
    reviews: generateReviews('Rohan Gowda', 4.5),
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    serviceTypes: ['Plumbing'],
    rating: 4.9,
    location: 'Mysuru, Karnataka', // Changed location
    profileImageUrl: 'https://placehold.co/400x300.png?text=Ananya+R',
    bio: 'Licensed plumber based in Mysuru, providing reliable and efficient solutions. Emergency services available 24/7. Expertise in leak detection, pipe repairs, fixture installations, and drain cleaning.',
    experienceYears: 12,
    hourlyRate: '400-600',
    reviewsCount: 200,
    reviews: generateReviews('Ananya Reddy', 4.9),
  },
  {
    id: '4',
    name: 'Vikram Singh',
    serviceTypes: ['Cleaning', 'Handyman'],
    rating: 4.3,
    location: 'Hassan, Karnataka', // Changed location
    profileImageUrl: 'https://placehold.co/400x300.png?text=Vikram+S',
    bio: 'Dedicated to making your home spotless and functional in Hassan. Offering regular house cleaning, deep cleaning services, and minor repair tasks. I bring my own eco-friendly cleaning supplies.',
    experienceYears: 5,
    hourlyRate: '250-400',
    reviewsCount: 65,
     portfolioImages: [
      'https://placehold.co/600x400.png?text=Sparkling+Clean+Kitchen',
      'https://placehold.co/600x400.png?text=Odd+Job+Fixed',
    ],
    reviews: generateReviews('Vikram Singh', 4.3),
  },
   {
    id: '5',
    name: 'Susmita Banerjee',
    serviceTypes: ['Electrical'],
    rating: 4.7,
    location: 'Mandya, Karnataka', // Changed to Mandya
    profileImageUrl: 'https://placehold.co/400x300.png?text=Susmita+B',
    bio: 'Certified electrician in Mandya ensuring safety and quality for all electrical installations and repairs. Experienced in wiring, light fixture installation, circuit breaker issues, and smart home setups.',
    experienceYears: 8,
    hourlyRate: '380-550',
    reviewsCount: 92,
    reviews: generateReviews('Susmita Banerjee', 4.7),
  },
  {
    id: '6',
    name: 'Arjun Rao',
    serviceTypes: ['Handyman', 'Painting', 'Plumbing'],
    rating: 4.6,
    location: 'Mandya, Karnataka', // Changed to Mandya
    profileImageUrl: 'https://placehold.co/400x300.png?text=Arjun+R',
    bio: 'Versatile handyman skilled in various trades serving Mandya district. Your go-to for home maintenance and improvements. Proficient in painting, minor plumbing repairs, carpentry, and general upkeep tasks.',
    experienceYears: 15,
    hourlyRate: '320-480',
    reviewsCount: 150,
    reviews: generateReviews('Arjun Rao', 4.6),
  },
  {
    id: '7',
    name: 'Kavya Murthy',
    serviceTypes: ['Cleaning'],
    rating: 4.9,
    location: 'Bengaluru, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Kavya+M',
    bio: 'Top-rated cleaning professional in Bengaluru. Eco-friendly products, thorough deep cleaning, and regular maintenance plans available. Your satisfaction is my priority.',
    experienceYears: 6,
    hourlyRate: '300-500',
    reviewsCount: 110,
    reviews: generateReviews('Kavya Murthy', 4.9),
  },
  {
    id: '8',
    name: 'Manjunath Patil',
    serviceTypes: ['Electrical', 'Handyman'],
    rating: 4.4,
    location: 'Hubballi-Dharwad, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Manjunath+P',
    bio: 'Reliable electrician and handyman service for Hubballi-Dharwad. From fixing faulty wiring to assembling furniture, I handle a variety of tasks efficiently.',
    experienceYears: 9,
    hourlyRate: '280-420',
    reviewsCount: 75,
    reviews: generateReviews('Manjunath Patil', 4.4),
  },
  {
    id: '9',
    name: 'Lakshmi Narayan',
    serviceTypes: ['Gardening'],
    rating: 4.7,
    location: 'Mandya, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Lakshmi+N',
    bio: 'Expert gardener in Mandya with a green thumb. Specializing in organic vegetable gardening, flower bed design, and tree pruning. Let me bring your garden to life!',
    experienceYears: 12,
    hourlyRate: '350-550',
    reviewsCount: 95,
    reviews: generateReviews('Lakshmi Narayan', 4.7),
  },
  {
    id: '10',
    name: 'Siddharth Chavan',
    serviceTypes: ['Plumbing', 'Handyman'],
    rating: 4.2,
    location: 'Shivamogga, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Siddharth+C',
    bio: 'Your friendly neighborhood plumber and handyman in Shivamogga. Quick response for leaks, installations, and general repairs. Affordable and trustworthy.',
    experienceYears: 4,
    hourlyRate: '220-380',
    reviewsCount: 50,
    reviews: generateReviews('Siddharth Chavan', 4.2),
  },
  {
    id: '11',
    name: 'Divya Hegde',
    serviceTypes: ['Painting'],
    rating: 4.8,
    location: 'Udupi, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Divya+H',
    bio: 'Professional painter in Udupi known for meticulous work and creative solutions. Interior, exterior, and decorative painting services. Using high-quality, durable paints.',
    experienceYears: 7,
    hourlyRate: '400-600',
    reviewsCount: 130,
    reviews: generateReviews('Divya Hegde', 4.8),
  },
  {
    id: '12',
    name: 'Ganesh Bhat',
    serviceTypes: ['Landscaping', 'Handyman'],
    rating: 4.6,
    location: 'Mandya, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Ganesh+B',
    bio: 'Complete landscaping and handyman services in Mandya. From designing beautiful gardens to handling various home repairs, I offer comprehensive solutions with a smile.',
    experienceYears: 11,
    hourlyRate: '330-520',
    reviewsCount: 105,
    reviews: generateReviews('Ganesh Bhat', 4.6),
  },
   {
    id: '13',
    name: 'Meena Kumari',
    serviceTypes: ['Cleaning', 'Other'],
    rating: 4.5,
    location: 'Tumakuru, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Meena+K',
    bio: 'Specialized cleaning services and home organization expert in Tumakuru. Offering decluttering, move-in/move-out cleaning, and customized cleaning plans.',
    experienceYears: 5,
    hourlyRate: '280-450',
    reviewsCount: 70,
    reviews: generateReviews('Meena Kumari', 4.5),
  },
  {
    id: '14',
    name: 'Santosh Kumar',
    serviceTypes: ['Electrical'],
    rating: 4.7,
    location: 'Mandya, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Santosh+K',
    bio: 'Quick and reliable electrical services in Mandya. Available for emergency repairs, new installations, and safety inspections. Your safety is my top concern.',
    experienceYears: 9,
    hourlyRate: '350-500',
    reviewsCount: 88,
    reviews: generateReviews('Santosh Kumar', 4.7),
  },
  {
    id: '15',
    name: 'Bharathi Ranganath',
    serviceTypes: ['Handyman', 'Plumbing'],
    rating: 4.4,
    location: 'Chikkamagaluru, Karnataka',
    profileImageUrl: 'https://placehold.co/400x300.png?text=Bharathi+R',
    bio: 'All-round handyman and plumber serving Chikkamagaluru. No job too small, from leaky faucets to assembling flat-pack furniture. Dependable and fair pricing.',
    experienceYears: 6,
    hourlyRate: '250-420',
    reviewsCount: 60,
    reviews: generateReviews('Bharathi Ranganath', 4.4),
  }
];
