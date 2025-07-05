'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/Hero/HeroSection';
import PropertySearch from '@/components/PropertyListing/PropertySearch';
import PropertyCard from '@/components/PropertyListing/PropertyCard';
import ContactModal from '@/components/ContactForm/ContactModal';
import Pagination from '@/components/Constants/Pagination';
import { Property, PropertyFilters } from '@/types/property';
import {
  sanityClient,
  PROPERTIES_QUERY,
  transformSanityProperty,
} from '@/lib/sanity';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

type ViewType = 'list' | 'grid';

const PropertiesPage: React.FC = () => {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<
    Property | undefined
  >();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from Sanity
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const sanityProperties = await sanityClient.fetch(PROPERTIES_QUERY);
        const transformedProperties = sanityProperties.map(
          transformSanityProperty
        );

        setProperties(transformedProperties);
        setFilteredProperties(transformedProperties);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on filters
  useEffect(() => {
    let filtered = [...properties];

    if (filters.type) {
      filtered = filtered.filter(
        (property) => property.propertyType === filters.type
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (property) => property.category === filters.category
      );
    }

    if (filters.location) {
      filtered = filtered.filter(
        (property) =>
          property.location
            .toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          property.state.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.priceMin) {
      filtered = filtered.filter(
        (property) => property.price >= filters.priceMin!
      );
    }

    if (filters.priceMax) {
      filtered = filtered.filter(
        (property) => property.price <= filters.priceMax!
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= filters.bedrooms!
      );
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property) => property.bathrooms >= filters.bathrooms!
      );
    }

    if (filters.areaMin) {
      filtered = filtered.filter(
        (property) => property.area >= filters.areaMin!
      );
    }

    if (filters.areaMax) {
      filtered = filtered.filter(
        (property) => property.area <= filters.areaMax!
      );
    }

    if (filters.search) {
      filtered = filtered.filter(
        (property) =>
          property.title
            .toLowerCase()
            .includes(filters.search!.toLowerCase()) ||
          property.description
            .toLowerCase()
            .includes(filters.search!.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [filters, properties]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
  };

  const handleContactClick = (property: Property) => {
    setSelectedProperty(property);
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
    setSelectedProperty(undefined);
  };

  const formatPrice = (price: number, currency: string | null) => {
    if (!currency) {
      return new Intl.NumberFormat('en-NG').format(price);
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Properties - Real Estate</title>
          <meta
            name="description"
            content="Browse our collection of premium properties"
          />
        </Head>
        <main className="px-8">
          <HeroSection
            title="Properties"
            backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
            textColor="text-white"
            overlayOpacity={0.4}
            height="h-80"
            borderRadius="rounded-xl"
          />
          <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <span className="ml-4 text-lg text-gray-600">
                  Loading properties...
                </span>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Head>
          <title>Properties - Real Estate</title>
          <meta
            name="description"
            content="Browse our collection of premium properties"
          />
        </Head>
        <main className="px-8">
          <HeroSection
            title="Properties"
            backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
            textColor="text-white"
            overlayOpacity={0.4}
            height="h-80"
            borderRadius="rounded-xl"
          />
          <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {error}
                </h3>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Properties - Real Estate</title>
        <meta
          name="description"
          content="Browse our collection of premium properties"
        />
      </Head>

      <main className="px-8">
        <HeroSection
          title="Properties"
          backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
          textColor="text-white"
          overlayOpacity={0.4}
          height="h-80"
          borderRadius="rounded-xl"
        />

        <div className="min-h-screen bg-white py-12">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Our Properties
              </h1>
              <p className="text-gray-600">
                Find your perfect property from our extensive collection
              </p>
            </div>

            {/* Search and Filters */}
            <PropertySearch
              onFiltersChange={handleFiltersChange}
              totalProperties={filteredProperties.length}
            />

            {/* View Toggle and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredProperties.length)} of{' '}
                {filteredProperties.length} properties
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 mr-2">View:</span>
                <div className="flex rounded-md border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setViewType('list')}
                    className={`px-3 py-2 text-sm ${
                      viewType === 'list'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewType('grid')}
                    className={`px-3 py-2 text-sm ${
                      viewType === 'grid'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Display */}
            {currentProperties.length > 0 ? (
              <div
                className={
                  viewType === 'grid'
                    ? 'grid grid-cols-1 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {currentProperties.map((property: Property) =>
                  viewType === 'grid' ? (
                    // Grid View - Vertical Card
                    <div
                      key={property.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      {/* Property Image */}
                      <div className="relative h-64">
                        <img
                          src={
                            property.images[0] || '/placeholder-property.jpg'
                          }
                          alt={property.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>

                      {/* Property Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {property.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center text-gray-600 mb-6">
                          <svg
                            className="w-5 h-5 mr-2"
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
                          <span className="text-base">
                            {property.location}, {property.state}
                          </span>
                        </div>

                        {/* Property Stats and Price Row */}
                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5 mr-1"
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
                                <span className="font-medium text-base">
                                  {property.bedrooms}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5 mr-1"
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
                                <span className="font-medium text-base">
                                  {property.bathrooms}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5 mr-1"
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
                                <span className="font-medium text-base">
                                  {property.area}
                                </span>
                              </div>
                            </div>
                            <div className="text-xl font-bold text-red-600">
                              {formatPrice(property.price, property.currency)}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button
                            onClick={() =>
                              router.push(`/properties/${property.slug}`)
                            }
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleContactClick(property)}
                            className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                          >
                            Contact Us
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View - Horizontal Card with red border
                    <div
                      key={property.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex">
                        {/* Image Section */}
                        <div className="w-96 flex-shrink-0 relative">
                          <img
                            src={
                              property.images[0] || '/placeholder-property.jpg'
                            }
                            alt={property.title}
                            className="w-full h-80 object-cover rounded-l-lg"
                          />
                          {/* Stats overlay on image */}
                          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <svg
                                  className="w-6 h-6 mr-2"
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
                                <span className="font-medium text-lg">
                                  {property.bedrooms}
                                </span>
                              </div>
                              <div className="flex items-center border-l border-r border-white/30 px-6">
                                <svg
                                  className="w-6 h-6 mr-2"
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
                                <span className="font-medium text-lg">
                                  {property.bathrooms}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-6 h-6 mr-2"
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
                                <span className="font-medium text-lg">
                                  {property.area}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 px-8 py-6 flex flex-col justify-between border-2 border-red-200 rounded-r-lg">
                          {/* Top Section */}
                          <div>
                            <div className="flex justify-between items-start mb-6">
                              <h3 className="text-2xl font-semibold text-gray-900">
                                {property.title}
                              </h3>
                              <div className="text-3xl font-bold text-red-600">
                                {formatPrice(property.price, property.currency)}
                              </div>
                            </div>

                            {/* Description */}
                            <div className="py-4">
                              <p className="text-gray-700 text-base leading-relaxed">
                                {property.description}
                              </p>
                            </div>
                          </div>

                          {/* Bottom Section */}
                          <div className="flex justify-between items-center">
                            {/* Location */}
                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-8 h-8 mr-3"
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
                              <span className="text-xl font-bold">
                                {property.location}, {property.state}
                              </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                              <button
                                onClick={() =>
                                  router.push(`/properties/${property.slug}`)
                                }
                                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors text-base font-medium"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleContactClick(property)}
                                className="border border-red-600 text-red-600 px-6 py-3 rounded-md hover:bg-red-50 transition-colors text-base font-medium"
                              >
                                Contact Us
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
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
                <p className="text-gray-600">
                  Try adjusting your search filters
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleCloseModal}
          property={selectedProperty}
        />
      </main>
    </>
  );
};

export default PropertiesPage;
