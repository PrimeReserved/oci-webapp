export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'sale' | 'rent';
  category: 'house' | 'apartment' | 'land' | 'commercial';
  images: string[];
  video?: string; // Added video field
  features: string[];
  agent: {
    name: string;
    email: string;
    phone: string;
    image?: string;
  };
  createdAt: string;
  slug: string;
}

export interface PropertyFilters {
  type?: 'sale' | 'rent';
  category?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  areaMin?: number;
  areaMax?: number;
  search?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
}
