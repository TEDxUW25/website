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
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    talkTitle: "Business as a Force for Good",
    featured: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophiarivera",
      twitter: "https://twitter.com/sophiarivera"
    },
    topics: ["Entrepreneurship", "Sustainability", "Social Impact"]
  },
  {
    id: 5,
    name: "Daniel Wright",
    role: "Urban Designer",
    bio: "Daniel is revolutionizing urban spaces through human-centered design, creating sustainable city environments that prioritize community well-being and ecological harmony.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    talkTitle: "Cities of Tomorrow",
    socialLinks: {
      linkedin: "https://linkedin.com/in/danielwright",
      website: "https://wrightdesign.com"
    },
    topics: ["Urban Planning", "Sustainability", "Design"]
  },
  {
    id: 6,
    name: "Amara Khan",
    role: "Quantum Physicist",
    bio: "Amara is breaking new ground in quantum computing applications that could revolutionize everything from medicine to space exploration in the next decade.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop",
    talkTitle: "Quantum Leap: Computing's Next Frontier",
    featured: true,
    socialLinks: {
      twitter: "https://twitter.com/amarakhanphysics",
      linkedin: "https://linkedin.com/in/amarakhan"
    },
    topics: ["Quantum Computing", "Physics", "Future Tech"]
  }
];
