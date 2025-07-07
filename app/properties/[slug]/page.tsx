'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from '@/components/ContactForm/ContactModal';
import { Property } from '@/types/property';
import {
  sanityClient,
  PROPERTY_BY_SLUG_QUERY,
  transformSanityProperty,
} from '@/lib/sanity';
import VideoEmbed from '@/components/PropertyListing/VideoEmbed';

const PropertyDetailsPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch property by slug from Sanity
        const sanityProperty = await sanityClient.fetch(
          PROPERTY_BY_SLUG_QUERY,
          {
            slug: slug,
          }
        );

        if (sanityProperty) {
          const transformedProperty = transformSanityProperty(sanityProperty);
          setProperty(transformedProperty);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

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

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + property.images.length) % property.images.length
      );
    }
  };

  const nextGalleryImage = () => {
    if (property) {
      setCurrentGalleryIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevGalleryImage = () => {
    if (property) {
      setCurrentGalleryIndex(
        (prev) => (prev - 1 + property.images.length) % property.images.length
      );
    }
  };

  const getAmenityIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();

    if (featureLower.includes('gym') || featureLower.includes('fitness')) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.5 12.75l6 6 9-13.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12l2 2 4-4"
          />
        </svg>
      );
    } else if (featureLower.includes('pool') || featureLower.includes('swim')) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else if (
      featureLower.includes('parking') ||
      featureLower.includes('garage')
    ) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      );
    } else if (
      featureLower.includes('kitchen') ||
      featureLower.includes('dining')
    ) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      );
    } else if (
      featureLower.includes('living') ||
      featureLower.includes('room')
    ) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      );
    } else if (
      featureLower.includes('power') ||
      featureLower.includes('backup')
    ) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    } else if (
      featureLower.includes('location') ||
      featureLower.includes('ideal')
    ) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{error}</h3>
          <Link
            href="/properties"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Property not found
          </h3>
          <Link
            href="/properties"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{property.title} - Real Estate</title>
        <meta name="description" content={property.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-red-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
                <li>
                  <Link
                    href="/properties"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium">
                  {property.location}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2">
              {/* Main Image Gallery */}
              <div className="relative mb-8">
                <div className="relative h-96 md:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={
                      property.images[currentImageIndex] ||
                      '/placeholder-property.jpg'
                    }
                    alt={property.title}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-property.jpg';
                    }}
                  />

                  {/* Navigation Buttons */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Property Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                      {property.propertyType === 'sale'
                        ? 'For Sale'
                        : 'For Rent'}
                    </span>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {property.images.length > 1 && (
                  <div className="flex space-x-3 mt-6 overflow-x-auto pb-2">
                    {property.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-3 transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'border-red-600 scale-105 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`View ${index + 1}`}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-property.jpg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                    {property.title}
                  </h1>
                  <div className="text-2xl md:text-3xl font-bold text-red-600">
                    {formatPrice(property.price, property.currency)}
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-6">
                  <svg
                    className="w-6 h-6 mr-3"
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
                  <span className="text-lg md:text-xl font-medium">
                    {property.location}, {property.state}
                  </span>
                </div>

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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Ref: {property.id}
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>

                {/* Property Details Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {property.bedrooms}
                      </div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {property.bathrooms}
                      </div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {property.area}
                      </div>
                      <div className="text-sm text-gray-600">m²</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1 capitalize">
                        {property.category}
                      </div>
                      <div className="text-sm text-gray-600">Type</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Video */}
              {property.video && (
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Property Video
                  </h3>
                  <div className="w-full">
                    <VideoEmbed url={property.video} title={property.title} />
                  </div>
                </div>
              )}

              {/* Property Images Gallery - Fixed 3-image layout */}
              {property.images && property.images.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Property Highlight
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={prevGalleryImage}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={nextGalleryImage}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 3-Image Layout: Small-Big-Small */}
                  <div className="grid grid-cols-4 gap-4 h-80">
                    {/* Left Small Image */}
                    <div className="col-span-1">
                      <div
                        className="relative h-full bg-gray-200 hover:scale-105 rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() =>
                          setCurrentGalleryIndex(
                            currentGalleryIndex > 0
                              ? currentGalleryIndex - 1
                              : property.images.length - 1
                          )
                        }
                      >
                        <Image
                          src={
                            property.images[
                              currentGalleryIndex > 0
                                ? currentGalleryIndex - 1
                                : property.images.length - 1
                            ] || '/placeholder-property.jpg'
                          }
                          alt={`${property.title} - Previous`}
                          fill
                          className="object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-property.jpg';
                          }}
                        />
                        <div className="absolute inset-0 transition-all duration-300"></div>
                      </div>
                    </div>

                    {/* Center Big Image */}
                    <div className="col-span-2">
                      <div className="relative h-full hover:scale-105 bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={
                            property.images[currentGalleryIndex] ||
                            '/placeholder-property.jpg'
                          }
                          alt={`${property.title} - Featured`}
                          fill
                          className="object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-property.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-opacity-0 transition-all duration-300"></div>
                      </div>
                    </div>

                    {/* Right Small Image */}
                    <div className="col-span-1">
                      <div
                        className="relative h-full bg-gray-200 hover:scale-105 rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() =>
                          setCurrentGalleryIndex(
                            (currentGalleryIndex + 1) % property.images.length
                          )
                        }
                      >
                        <Image
                          src={
                            property.images[
                              (currentGalleryIndex + 1) % property.images.length
                            ] || '/placeholder-property.jpg'
                          }
                          alt={`${property.title} - Next`}
                          fill
                          className="object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-property.jpg';
                          }}
                        />
                        <div className="absolute inset-0 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 space-y-6">
                {/* Property Amenities - Reduced height */}
                {property.features && property.features.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Property Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {property.features
                        .slice(0, 6)
                        .map((feature: string, index: number) => (
                          <div key={index} className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors duration-300">
                              {getAmenityIcon(feature)}
                            </div>
                            <div className="text-xs text-gray-700 font-medium">
                              {feature}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Agent Info - Made sticky */}
                {property.agent && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      {property.agent.image && (
                        <Image
                          src={property.agent.image}
                          alt={property.agent.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-agent.jpg';
                          }}
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {property.agent.name}
                        </h3>
                        <p className="text-sm text-gray-600">Property Agent</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium"
                      >
                        Get an appointment
                      </button>

                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-300 font-medium"
                      >
                        Receive full documentation
                      </button>

                      {property.agent.phone && (
                        <a
                          href={`tel:${property.agent.phone}`}
                          className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-300 text-center block font-medium"
                        >
                          Call Us Now
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        property={property}
      />
    </>
  );
};

export default PropertyDetailsPage;
