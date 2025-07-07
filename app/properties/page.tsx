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
type SearchPosition = 'top' | 'left';

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
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false);
  const [searchPosition, setSearchPosition] = useState<SearchPosition>('top');

  // Check if we should show list view based on screen size
  const [showListView, setShowListView] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const shouldShowList = window.innerWidth >= 1280; // lg breakpoint
      setShowListView(shouldShowList);

      // If on mobile/tablet, force top position
      if (window.innerWidth < 1024) {
        setSearchPosition('top');
      }

      // If we're on mobile/tablet and current view is list, switch to grid
      if (!shouldShowList && viewType === 'list') {
        setViewType('grid');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [viewType]);
  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('[data-hero-section]');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Logic area of search parameters coming from the homepage hero component

  // Handle URL search parameters from homepage
  useEffect(() => {
    const handleURLParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const initialFilters: PropertyFilters = {};

      // Extract type parameter (sale/rent)
      const type = urlParams.get('type') as 'sale' | 'rent' | null;
      if (type && (type === 'sale' || type === 'rent')) {
        initialFilters.type = type;
      }

      // Extract search parameter
      const search = urlParams.get('search');
      if (search) {
        initialFilters.search = search;
      }

      // Extract other potential parameters
      const location = urlParams.get('location');
      if (location) {
        initialFilters.location = location;
      }

      const category = urlParams.get('category');
      if (category) {
        initialFilters.category = category;
      }

      const priceMin = urlParams.get('priceMin');
      if (priceMin) {
        initialFilters.priceMin = parseInt(priceMin);
      }

      const priceMax = urlParams.get('priceMax');
      if (priceMax) {
        initialFilters.priceMax = parseInt(priceMax);
      }

      const bedrooms = urlParams.get('bedrooms');
      if (bedrooms) {
        initialFilters.bedrooms = parseInt(bedrooms);
      }

      const bathrooms = urlParams.get('bathrooms');
      if (bathrooms) {
        initialFilters.bathrooms = parseInt(bathrooms);
      }

      // Only set filters if there are any parameters
      if (Object.keys(initialFilters).length > 0) {
        setFilters(initialFilters);
      }
    };

    // Handle initial load
    handleURLParams();

    // Listen for URL changes (if using client-side navigation)
    const handlePopState = () => {
      handleURLParams();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Optional: Update URL when filters change (to maintain shareable URLs)
  useEffect(() => {
    const updateURL = () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, value.toString());
        }
      });

      const newURL = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      // Only update if URL actually changed
      if (newURL !== window.location.pathname + window.location.search) {
        window.history.replaceState(null, '', newURL);
      }
    };

    // Don't update URL on initial load
    const hasFilters = Object.keys(filters).length > 0;
    if (hasFilters) {
      updateURL();
    }
  }, [filters]);

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
        <main className="px-4 sm:px-8">
          <div data-hero-section>
            <HeroSection
              title="Properties"
              backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
              textColor="text-white"
              overlayOpacity={0.4}
              height="h-80"
              borderRadius="rounded-xl"
            />
          </div>
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
        <main className="px-4 sm:px-8">
          <div data-hero-section>
            <HeroSection
              title="Properties"
              backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
              textColor="text-white"
              overlayOpacity={0.4}
              height="h-80"
              borderRadius="rounded-xl"
            />
          </div>
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

      <main className="px-4 sm:px-8">
        <div data-hero-section>
          <HeroSection
            title="Properties"
            backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
            textColor="text-white"
            overlayOpacity={0.4}
            height="h-80"
            borderRadius="rounded-xl"
          />
        </div>

        {/* Conditional Layout Based on Search Position */}
        {searchPosition === 'top' ? (
          <>
            {/* TOP POSITION LAYOUT - Your existing layout */}
            {/* Sticky Search Container */}
            <div
              className={`${
                isSticky
                  ? 'fixed top-12 left-0 right-0 z-50 bg-white shadow-lg px-4 sm:px-8 transition-all duration-300'
                  : 'relative py-4'
              }`}
            >
              {isSticky && (
                <div className="flex justify-between px-12 items-center py-2 border-b border-red-200">
                  <span className="text-sm font-medium text-gray-700">
                    {filteredProperties.length} properties found
                  </span>
                  <button
                    onClick={() => setIsSearchCollapsed(!isSearchCollapsed)}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
                  >
                    <span className="text-sm font-medium">
                      {isSearchCollapsed ? 'Show Filters' : 'Hide Filters'}
                    </span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isSearchCollapsed ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <div
                className={`${isSticky && isSearchCollapsed ? 'hidden' : 'block'} ${isSticky ? 'py-3' : ''}`}
              >
                <div className="container mx-auto">
                  <PropertySearch
                    onFiltersChange={handleFiltersChange}
                    totalProperties={filteredProperties.length}
                    isSticky={isSticky}
                    position={searchPosition}
                    onPositionChange={setSearchPosition}
                  />
                </div>
              </div>
            </div>

            {/* Add padding when sticky to prevent content jump */}
            {isSticky && (
              <div className={isSearchCollapsed ? 'h-12' : 'h-20'}></div>
            )}

            <div className="min-h-screen bg-white pt-2 pb-12">
              <div className="container mx-auto px-4 pt-1 pb-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Our Properties
                  </h1>
                  <p className="text-gray-600">
                    Find your perfect property from our extensive collection
                  </p>
                </div>

                {/* View Toggle and Results Count */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredProperties.length)} of{' '}
                    {filteredProperties.length} properties
                  </div>

                  {/* View Toggle - Only show list option on desktop */}
                  <div className="flex items-center space-x-4">
                    {/* Layout Toggle - Only show on desktop */}
                    {typeof window !== 'undefined' &&
                      window.innerWidth >= 1024 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Layout:</span>
                          <div className="flex rounded-md border border-gray-300 overflow-hidden">
                            <button
                              onClick={() => setSearchPosition('top')}
                              className={`px-3 py-2 text-sm ${
                                searchPosition === 'top'
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
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => setSearchPosition('left')}
                              className={`px-3 py-2 text-sm ${
                                searchPosition === 'left'
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
                                  d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM13 4a1 1 0 011-1h4a1 1 0 011 1v16a1 1 0 01-1 1h-4a1 1 0 01-1-1V4z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                    {/* View Toggle - Only show list option on desktop */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 mr-2">View:</span>
                      <div className="flex rounded-md border border-gray-300 overflow-hidden">
                        {showListView && (
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
                        )}
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
                </div>

                {/* Properties Display */}
                {currentProperties.length > 0 ? (
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      viewType === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-6'
                    }`}
                  >
                    {currentProperties.map((property: Property) =>
                      viewType === 'grid' ? (
                        // Grid View - Vertical Card
                        <div
                          key={property.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        >
                          {/* Property Image */}
                          <div className="relative h-48">
                            <img
                              src={
                                property.images[0] ||
                                '/placeholder-property.jpg'
                              }
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
                                  {formatPrice(
                                    property.price,
                                    property.currency
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
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
                        // List View - Responsive Horizontal Card
                        <div
                          key={property.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102"
                        >
                          <div className="flex flex-col lg:flex-row">
                            {/* Image Section */}
                            <div className="w-full lg:w-96 lg:flex-shrink-0 relative">
                              <img
                                src={
                                  property.images[0] ||
                                  '/placeholder-property.jpg'
                                }
                                alt={property.title}
                                className="w-full h-64 lg:h-80 object-cover lg:rounded-l-lg"
                              />
                              {/* Stats overlay on image */}
                              <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <svg
                                      className="w-5 lg:w-6 h-5 lg:h-6 mr-2"
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
                                    <span className="font-medium text-base lg:text-lg">
                                      {property.bedrooms}
                                    </span>
                                  </div>
                                  <div className="flex items-center border-l border-r border-white/30 px-4 lg:px-6">
                                    <svg
                                      className="w-5 lg:w-6 h-5 lg:h-6 mr-2"
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
                                    <span className="font-medium text-base lg:text-lg">
                                      {property.bathrooms}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      className="w-5 lg:w-6 h-5 lg:h-6 mr-2"
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
                                    <span className="font-medium text-base lg:text-lg">
                                      {property.area}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-6 lg:px-8 lg:py-6 flex flex-col justify-between border-0 lg:border-2 lg:border-red-200 lg:rounded-r-lg">
                              {/* Top Section */}
                              <div>
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 lg:mb-6">
                                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-0">
                                    {property.title}
                                  </h3>
                                  <div className="text-lg lg:text-xl font-bold text-red-600">
                                    {formatPrice(
                                      property.price,
                                      property.currency
                                    )}
                                  </div>
                                </div>

                                {/* Description */}
                                <div className="py-4">
                                  <p className="text-gray-700 text-sm lg:text-base leading-relaxed line-clamp-3">
                                    {property.description}
                                  </p>
                                </div>
                              </div>

                              {/* Bottom Section */}
                              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                                {/* Location */}
                                <div className="flex items-center text-gray-600">
                                  <svg
                                    className="w-6 lg:w-8 h-6 lg:h-8 mr-2 lg:mr-3 flex-shrink-0"
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
                                  <span className="text-md lg:text-lg font-bold">
                                    {property.location}, {property.state}
                                  </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/properties/${property.slug}`
                                      )
                                    }
                                    className="bg-red-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-md hover:bg-red-700 transition-colors text-sm lg:text-base font-medium"
                                  >
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleContactClick(property)}
                                    className="border border-red-600 text-red-600 px-4 lg:px-6 py-2 lg:py-3 rounded-md hover:bg-red-50 transition-colors text-sm lg:text-base font-medium"
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
          </>
        ) : (
          /* LEFT SIDEBAR LAYOUT - New layout */
          <div className="min-h-screen bg-white py-8">
            <div className="container mx-auto px-4">
              {/* Page Title */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Our Properties
                </h1>
                <p className="text-gray-600">
                  Find your perfect property from our extensive collection
                </p>
              </div>

              {/* Mobile Search - Only show on mobile when position is 'left' */}
              <div className="block lg:hidden mb-6">
                <PropertySearch
                  onFiltersChange={handleFiltersChange}
                  totalProperties={filteredProperties.length}
                  isSticky={false}
                  position="top"
                  onPositionChange={setSearchPosition}
                />
              </div>

              <div className="flex gap-8"></div>

              <div className="flex gap-8">
                {/* Left Sidebar - Search */}
                <div className="w-80 flex-shrink-0 hidden lg:block">
                  <div className="sticky top-20">
                    <PropertySearch
                      onFiltersChange={handleFiltersChange}
                      totalProperties={filteredProperties.length}
                      isSticky={false}
                      position="left"
                      onPositionChange={setSearchPosition}
                    />
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1">
                  {/* View Toggle and Results Count */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-
                      {Math.min(endIndex, filteredProperties.length)} of{' '}
                      {filteredProperties.length} properties
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Layout Toggle - Only show on desktop */}
                      {typeof window !== 'undefined' &&
                        window.innerWidth >= 1024 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              Layout:
                            </span>
                            <div className="flex rounded-md border border-gray-300 overflow-hidden">
                              <button
                                onClick={() => setSearchPosition('top')}
                                className={`px-3 py-2 text-sm ${
                                  searchPosition === 'top'
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => setSearchPosition('left')}
                                className={`px-3 py-2 text-sm ${
                                  searchPosition === 'left'
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
                                    d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM13 4a1 1 0 011-1h4a1 1 0 011 1v16a1 1 0 01-1 1h-4a1 1 0 01-1-1V4z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}

                      {/* View Toggle - Only show list option on desktop */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 mr-2">
                          View:
                        </span>
                        <div className="flex rounded-md border border-gray-300 overflow-hidden">
                          {showListView && (
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
                          )}
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
                  </div>

                  {/* Properties Display */}
                  {currentProperties.length > 0 ? (
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        viewType === 'grid'
                          ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                          : 'space-y-6'
                      }`}
                    >
                      {currentProperties.map((property: Property) =>
                        viewType === 'grid' ? (
                          // Grid View - Vertical Card
                          <div
                            key={property.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                          >
                            {/* Property Image */}
                            <div className="relative h-48">
                              <img
                                src={
                                  property.images[0] ||
                                  '/placeholder-property.jpg'
                                }
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
                                    {formatPrice(
                                      property.price,
                                      property.currency
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
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
                          // List View - Responsive Horizontal Card
                          <div
                            key={property.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102"
                          >
                            <div className="flex flex-col lg:flex-row">
                              {/* Image Section */}
                              <div className="w-full lg:w-96 lg:flex-shrink-0 relative">
                                <img
                                  src={
                                    property.images[0] ||
                                    '/placeholder-property.jpg'
                                  }
                                  alt={property.title}
                                  className="w-full h-64 lg:h-80 object-cover lg:rounded-l-lg"
                                />
                                {/* Stats overlay on image */}
                                <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <svg
                                        className="w-5 lg:w-6 h-5 lg:h-6 mr-2"
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
                                      <span className="font-medium text-base lg:text-lg">
                                        {property.bedrooms}
                                      </span>
                                    </div>
                                    <div className="flex items-center border-l border-r border-white/30 px-4 lg:px-6">
                                      <svg
                                        className="w-5 lg:w-6 h-5 lg:h-6 mr-2"
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
                                      <span className="font-medium text-base lg:text-lg">
                                        {property.bathrooms}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <svg
                                        className="w-5 lg:w-6 h-5 lg:h-6 mr-2"
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
                                      <span className="font-medium text-base lg:text-lg">
                                        {property.area}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Content Section */}
                              <div className="flex-1 p-6 lg:px-8 lg:py-6 flex flex-col justify-between border-0 lg:border-2 lg:border-red-200 lg:rounded-r-lg">
                                {/* Top Section */}
                                <div>
                                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 lg:mb-6 gap-4">
                                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-0">
                                      {property.title}
                                    </h3>
                                    <div className="text-lg lg:text-xl font-bold text-red-600">
                                      {formatPrice(
                                        property.price,
                                        property.currency
                                      )}
                                    </div>
                                  </div>

                                  {/* Description */}
                                  <div className="py-4">
                                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed line-clamp-3">
                                      {property.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Bottom Section */}
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                                  {/* Location */}
                                  <div className="flex items-center text-gray-600">
                                    <svg
                                      className="w-6 lg:w-8 h-6 lg:h-8 mr-2 lg:mr-3 flex-shrink-0"
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
                                    <span className="text-sm lg:text-md font-bold">
                                      {property.location}, {property.state}
                                    </span>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                      onClick={() =>
                                        router.push(
                                          `/properties/${property.slug}`
                                        )
                                      }
                                      className="bg-red-600 text-white px-4 lg:px-2 py-2 lg:py-3 rounded-md hover:bg-red-700 transition-colors text-sm lg:text-sm font-medium"
                                    >
                                      View Details
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleContactClick(property)
                                      }
                                      className="border border-red-600 text-red-600 px-4 lg:px-2 py-2 lg:py-3 rounded-md hover:bg-red-50 transition-colors text-sm lg:text-sm font-medium"
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
            </div>
          </div>
        )}

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
