// lib/sanity.ts
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // Replace with your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: true, // Set to false if you want fresh data
});

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
  features,
  agent,
  createdAt
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
    features: sanityProperty.features || [],
    agent: sanityProperty.agent,
    createdAt: sanityProperty.createdAt,
    slug: sanityProperty.slug?.current || '',
  };
};
