import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onContactClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onContactClick,
}) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={property.images[0] || '/placeholder-property.jpg'}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {property.propertyType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-white text-gray-800 px-2 py-1 rounded-md text-xs font-semibold">
            {property.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(property.price, property.currency)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-gray-600 mb-3 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {property.location}, {property.state}
        </p>

        {/* Property Details */}
        <div className="flex items-center text-gray-600 mb-4 space-x-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            <span className="text-sm">{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            <span className="text-sm">{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span className="text-sm">{property.area} m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 bg-red-600 text-white text-center py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => onContactClick(property)}
            className="flex-1 border border-red-600 text-red-600 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
