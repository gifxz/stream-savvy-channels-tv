
import { Channel, Category, SubscriptionPlan } from "@/types";

// Mock subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    billingCycle: "monthly",
    features: [
      "50+ Channels",
      "Standard Definition",
      "Watch on 1 device",
      "24/7 Customer Support"
    ],
    channelCount: 50,
  },
  {
    id: "standard",
    name: "Standard",
    price: 14.99,
    billingCycle: "monthly",
    features: [
      "100+ Channels",
      "High Definition",
      "Watch on 2 devices",
      "24/7 Customer Support",
      "45 days catch-up TV"
    ],
    channelCount: 100,
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    billingCycle: "monthly",
    features: [
      "150+ Channels",
      "4K Ultra HD",
      "Watch on 4 devices",
      "Premium Sports Channels",
      "24/7 Customer Support",
      "90 days catch-up TV",
      "Exclusive movie premieres"
    ],
    channelCount: 150,
  },
];

// Mock categories
export const categories: Category[] = [
  {
    id: "entertainment",
    name: "Entertainment",
    slug: "entertainment",
    description: "TV shows, movies, and general entertainment"
  },
  {
    id: "sports",
    name: "Sports",
    slug: "sports",
    description: "Live sports events and sports news"
  },
  {
    id: "news",
    name: "News",
    slug: "news",
    description: "Local and international news channels"
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    description: "Children's programming and cartoons"
  },
  {
    id: "documentary",
    name: "Documentary",
    slug: "documentary",
    description: "Educational and informational programming"
  },
  {
    id: "movies",
    name: "Movies",
    slug: "movies",
    description: "Movie channels"
  },
  {
    id: "music",
    name: "Music",
    slug: "music",
    description: "Music channels and programming"
  }
];

// Mock channels
export const channels: Channel[] = [
  {
    id: "ch1",
    name: "PPTV One",
    logo: "/placeholder.svg",
    category: ["entertainment"],
    description: "General entertainment channel",
    isLive: true,
    currentProgram: {
      id: "p1",
      name: "The Evening Show",
      description: "Talk show with celebrity guests",
      startTime: "20:00",
      endTime: "21:30",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch2",
    name: "PPTV Sports",
    logo: "/placeholder.svg",
    category: ["sports"],
    description: "24/7 sports coverage",
    isLive: true,
    currentProgram: {
      id: "p2",
      name: "World Cup Highlights",
      description: "Highlights from the latest World Cup matches",
      startTime: "19:00",
      endTime: "20:30",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch3",
    name: "PPTV News",
    logo: "/placeholder.svg",
    category: ["news"],
    description: "Breaking news and current events",
    isLive: true,
    currentProgram: {
      id: "p3",
      name: "Evening News",
      description: "Daily news roundup",
      startTime: "18:00",
      endTime: "19:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch4",
    name: "PPTV Kids",
    logo: "/placeholder.svg",
    category: ["kids"],
    description: "Children's programming",
    isLive: false,
    currentProgram: {
      id: "p4",
      name: "Adventure Time",
      description: "Animated series",
      startTime: "15:00",
      endTime: "16:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch5",
    name: "PPTV Cinema",
    logo: "/placeholder.svg",
    category: ["movies"],
    description: "Premium movie channel",
    isPremium: true,
    isLive: true,
    currentProgram: {
      id: "p5",
      name: "The Blockbuster",
      description: "Latest blockbuster movie",
      startTime: "21:00",
      endTime: "23:30",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch6",
    name: "PPTV Docs",
    logo: "/placeholder.svg",
    category: ["documentary"],
    description: "Documentary channel",
    isLive: true,
    currentProgram: {
      id: "p6",
      name: "Wild Planet",
      description: "Nature documentary series",
      startTime: "20:00",
      endTime: "21:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch7",
    name: "PPTV Music",
    logo: "/placeholder.svg",
    category: ["music"],
    description: "Music videos and performances",
    isLive: true,
    currentProgram: {
      id: "p7",
      name: "Top 20 Countdown",
      description: "Countdown of top 20 songs",
      startTime: "19:00",
      endTime: "20:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch8",
    name: "PPTV Comedy",
    logo: "/placeholder.svg",
    category: ["entertainment"],
    description: "Comedy shows and stand-up",
    isLive: false,
    currentProgram: {
      id: "p8",
      name: "Stand-up Special",
      description: "Comedy special",
      startTime: "22:00",
      endTime: "23:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch9",
    name: "PPTV Sports Plus",
    logo: "/placeholder.svg",
    category: ["sports"],
    description: "Premium sports channel",
    isPremium: true,
    isLive: true,
    currentProgram: {
      id: "p9",
      name: "Premier League Live",
      description: "Live Premier League match",
      startTime: "20:00",
      endTime: "22:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch10",
    name: "PPTV Drama",
    logo: "/placeholder.svg",
    category: ["entertainment"],
    description: "Drama series and shows",
    isLive: true,
    currentProgram: {
      id: "p10",
      name: "The Series",
      description: "Popular drama series",
      startTime: "21:00",
      endTime: "22:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch11",
    name: "PPTV Action",
    logo: "/placeholder.svg",
    category: ["movies"],
    description: "Action movies and shows",
    isLive: true,
    currentProgram: {
      id: "p11",
      name: "Action Heroes",
      description: "Action movie marathon",
      startTime: "20:00",
      endTime: "23:00",
      thumbnail: "/placeholder.svg"
    }
  },
  {
    id: "ch12",
    name: "PPTV Science",
    logo: "/placeholder.svg",
    category: ["documentary"],
    description: "Science and technology programming",
    isLive: false,
    currentProgram: {
      id: "p12",
      name: "Future Tech",
      description: "Technology documentary",
      startTime: "19:00",
      endTime: "20:00",
      thumbnail: "/placeholder.svg"
    }
  }
];

// Mock user data
export const mockUser = {
  id: "user1",
  email: "user@example.com",
  name: "Demo User",
  subscriptionPlan: subscriptionPlans[1],
  subscriptionStatus: "active" as const,
  billingInfo: {
    name: "Demo User",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
    cardLast4: "4242"
  }
};
