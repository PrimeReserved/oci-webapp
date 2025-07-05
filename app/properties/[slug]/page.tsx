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

const PropertyDetailsPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        <div className="bg-white border-b">
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
              {/* Image Gallery */}
              <div className="relative mb-8">
                <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={
                      property.images[currentImageIndex] ||
                      '/placeholder-property.jpg'
                    }
                    alt={property.title}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation Buttons */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
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
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
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
                    <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      {property.propertyType === 'sale'
                        ? 'For Sale'
                        : 'For Rent'}
                    </span>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {property.images.length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {property.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                          index === currentImageIndex
                            ? 'border-red-600'
                            : 'border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`View ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {property.bedrooms} rooms
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {property.area} m²
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
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
                  {property.location}, {property.state}
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
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Price */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {formatPrice(property.price, property.currency)}
                    </div>
                    <p className="text-gray-600">
                      {property.propertyType === 'sale'
                        ? 'Purchase Price'
                        : 'Monthly Rent'}
                    </p>
                  </div>
                </div>

                {/* Agent Info */}
                {property.agent && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-4">
                      {property.agent.image && (
                        <Image
                          src={property.agent.image}
                          alt={property.agent.name}
                          width={50}
                          height={50}
                          className="rounded-full mr-3"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {property.agent.name}
                        </h3>
                        <p className="text-sm text-gray-600">Property Agent</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Get an appointment
                      </button>

                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Receive full documentation
                      </button>

                      {property.agent.phone && (
                        <a
                          href={`tel:${property.agent.phone}`}
                          className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-center block"
                        >
                          Have someone call you asap
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area</span>
                      <span className="font-medium">{property.area} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium capitalize">
                        {property.category}
                      </span>
                    </div>
                  </div>
                </div>
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
