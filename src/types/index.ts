// Global Type Definitions
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  benefits?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export type Theme = 'light' | 'dark' | 'system';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}
