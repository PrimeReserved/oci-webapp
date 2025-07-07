// lib/sanity.ts
import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

// Environment variables
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Create the main client
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

// Export as 'client' as well for compatibility with blog code
export const client = sanityClient;

// Image URL builder setup
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: any) => {
  return builder.image(source);
};

// Helper function to get optimized image URL
export const getImageUrl = (
  source: any,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }
) => {
  if (!source) return null;

  let imageBuilder = urlForImage(source);

  if (options?.width) {
    imageBuilder = imageBuilder.width(options.width);
  }

  if (options?.height) {
    imageBuilder = imageBuilder.height(options.height);
  }

  if (options?.quality) {
    imageBuilder = imageBuilder.quality(options.quality);
  }

  if (options?.format) {
    imageBuilder = imageBuilder.format(options.format);
  }

  return imageBuilder.url();
};

// GROQ query to fetch all properties
export const PROPERTIES_QUERY = `*[_type == "property"] | order(createdAt desc) {
  _id,
  title,
  slug,
  description,
  price,
  currency,
  location,
  state,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  category,
  images,
  video,
  features,
  agent,
  createdAt
}`;

// GROQ query to fetch a single property by slug
export const PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  price,
  currency,
  location,
  state,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  category,
  images,
  video,
  features,
  agent,
  createdAt
}`;

// GROQ query to fetch all blog posts
export const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  author->{
    name,
    image
  },
  categories[]->
}`;

// GROQ query to fetch a single blog post by slug
export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  body,
  author->{
    name,
    image,
    bio
  },
  categories[]->,
  tags[]
}`;

// Function to transform Sanity data to match your Property interface
export const transformSanityProperty = (sanityProperty: any) => {
  // Handle location - ensure it's always a string
  const getLocationString = (location: any) => {
    if (typeof location === 'string') {
      return location;
    }
    if (typeof location === 'object' && location !== null) {
      return (
        location.city || location.address || location.name || 'Unknown location'
      );
    }
    return 'Unknown location';
  };

  return {
    id: sanityProperty._id,
    title: sanityProperty.title,
    description: sanityProperty.description,
    price: sanityProperty.price,
    currency: sanityProperty.currency,
    location: getLocationString(sanityProperty.location),
    state: sanityProperty.state,
    bedrooms: sanityProperty.bedrooms,
    bathrooms: sanityProperty.bathrooms,
    area: sanityProperty.area,
    propertyType: sanityProperty.propertyType,
    category: sanityProperty.category,
    images: sanityProperty.images || [],
    video: sanityProperty.video,
    features: sanityProperty.features || [],
    agent: sanityProperty.agent,
    createdAt: sanityProperty.createdAt,
    slug: sanityProperty.slug?.current || '',
  };
};
