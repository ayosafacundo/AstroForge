
export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    creator: string;
    category: string;
    isPromotion: boolean;
    discount: number
}

export interface Promotion {
    id: number;
    title: string; 
    description: string;
    discount: number;
    itemCount: number;
    image: string;
    endsAt: string;
    category: string;
}

export interface categoryPromotion {
    name: string;
    count: number;
    discount: string;
    icon: string;
}

export interface category {
    id: string;
    name: string;
    description: string;
    icon: string;
    productCount: number;
    image: string;
}

export interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  cite?: Post;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
  isLiked: boolean;
}

export interface TrendingTopic {
  tag: string;
  posts: string;
}

export interface SuggestedUser {
  name: string;
  username: string;
  avatar: string;
}

export interface FullProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  creator: {
    name: string;
    avatar: string;
    followers: number;
    designs: number;
  }
  category: string;
  tags: string[];
  stats: {
    downloads: number;
    likes: number;
    views: number;
    comments: number;
  }
  rating: number;
  reviews: number;
  specifications: {
    printTime: string;
    material: string;
    supports: string;
    infill: string;
    resolution: string;
    dimensions: string;
    fileFormats: string[];
  }
  isPromotion: boolean;
  discount: number;
}