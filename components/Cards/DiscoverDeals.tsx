'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Property } from '@/types/property';
import {
  sanityClient,
  PROPERTIES_QUERY,
  transformSanityProperty,
} from '@/lib/sanity';
import SectionHeader from './SectionHeader';

// Assuming you have a Button component - replace this import with your actual Button component
const Button = ({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <button className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
        {text}
        {icon && <span className="ml-2">{icon}</span>}
      </button>
    </Link>
  );
};

const DiscoverDeals = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const sanityProperties = await sanityClient.fetch(PROPERTIES_QUERY);
        const transformedProperties = sanityProperties.map(
          transformSanityProperty
        );
        // Get 12 properties for 4 slides of 3 each
        setProperties(transformedProperties.slice(0, 12));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContactClick = (property: Property) => {
    console.log('Contact clicked for property:', property.id);
  };

  // Group properties into slides of 3
  const slides = [];
  for (let i = 0; i < properties.length; i += 3) {
    slides.push(properties.slice(i, i + 3));
  }

  const totalSlides = Math.min(slides.length, 4); // Maximum 4 slides

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeader
          title="Discover Our Best Deals"
          subtitle="Your next home might just be here"
        />

        {/* Properties Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <>
              {/* Properties Grid - Show current slide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {slides[currentSlide]?.map((property: Property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    {/* Property Image */}
                    <div className="relative h-48">
                      <img
                        src={property.images[0] || '/placeholder-property.jpg'}
                        alt={property.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>

                    {/* Property Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {property.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg
                          className="w-5 h-5 mr-2 flex-shrink-0"
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
                        <span className="text-base truncate">
                          {property.location}, {property.state}
                        </span>
                      </div>

                      {/* Property Stats and Price Row */}
                      <div className="border-t border-b border-gray-200 pt-1 mb-1">
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                              </svg>
                              <span className="font-medium text-sm">
                                {property.bedrooms}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 10h6v6H9z"
                                />
                              </svg>
                              <span className="font-medium text-sm">
                                {property.bathrooms}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-0.5"
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
                              <span className="font-medium text-sm">
                                {property.area}
                              </span>
                            </div>
                          </div>
                          <div className="text-md font-bold text-red-600">
                            {formatPrice(property.price, property.currency)}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <Link href={`/properties/${property.slug}`}>
                          <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium w-full">
                            View Details
                          </button>
                        </Link>
                        <button
                          onClick={() => handleContactClick(property)}
                          className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                          Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center space-x-2 mb-8">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-red-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">Check back later for new listings</p>
            </div>
          )}

          {/* View All Properties Button */}
          <div className="text-center">
            <Link href="/properties">
              <button className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors text-sm font-medium">
                <span className="flex items-center justify-center gap-2">
                  View All {<ArrowRight className="w-4 h-4" />}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverDeals;
