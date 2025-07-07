// types/blog.ts
import { PortableTextBlock } from 'sanity';

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage: {
    url: string;
    alt?: string;
  };
  category: string;
  content: PortableTextBlock[];
  author: Author;
  publishedAt: string;
  featured: boolean;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    url: string;
    alt?: string;
  };
  bio?: string;
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}
