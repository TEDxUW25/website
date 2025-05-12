export type Speaker = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  talkTitle?: string;
  featured?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  topics?: string[];
};

export const SPEAKERS: Speaker[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Climate Scientist",
    bio: "Alex is a renowned climate scientist with over 15 years of experience studying global climate patterns and developing innovative solutions for climate change mitigation.",
    imageUrl: "/speakers/speaker1.jpg",
    talkTitle: "Rethinking Climate Solutions",
    featured: true,
    socialLinks: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
    },
    topics: ["Climate", "Sustainability", "Innovation"]
  },
  {
    id: 2,
    name: "Maya Patel",
    role: "AI Ethicist",
    bio: "Maya explores the ethical implications of artificial intelligence in modern society, focusing on fairness, transparency, and accountability in AI systems.",
    imageUrl: "/speakers/speaker2.jpg",
    talkTitle: "The Future of Ethical AI",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mayapatel",
      website: "https://mayapatel.com"
    },
    topics: ["AI", "Ethics", "Technology"]
  },
  {
    id: 3,
    name: "Dr. James Lee",
    role: "Neuroscientist",
    bio: "Dr. Lee researches brain plasticity and its implications for learning and recovery, with groundbreaking work on how the brain adapts to new information and experiences.",
    imageUrl: "/speakers/speaker3.jpg",
    talkTitle: "Unlocking Brain Potential",
    socialLinks: {
      twitter: "https://twitter.com/drjameslee",
      website: "https://jameslee-neuro.edu"
    },
    topics: ["Neuroscience", "Learning", "Health"]
  },
  {
    id: 4,
    name: "Sophia Rivera",
    role: "Social Entrepreneur",
    bio: "Sophia has launched multiple social enterprises focused on sustainable development and community empowerment across developing regions.",
    imageUrl: "/speakers/speaker4.jpg",
    talkTitle: "Business as a Force for Good",
    featured: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophiarivera",
      twitter: "https://twitter.com/sophiarivera"
    },
    topics: ["Entrepreneurship", "Sustainability", "Social Impact"]
  }
];
