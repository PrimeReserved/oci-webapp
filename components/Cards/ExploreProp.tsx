'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import {
  sanityClient,
  PROPERTIES_QUERY,
  transformSanityProperty,
} from '@/lib/sanity';
import { Property } from '@/types/property';

interface PropertyTypeCount {
  sale: number;
  rent: number;
}

const ExploreProp = () => {
  const [propertyCounts, setPropertyCounts] = useState<PropertyTypeCount>({
    sale: 0,
    rent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyCounts = async () => {
      try {
        const sanityProperties = await sanityClient.fetch(PROPERTIES_QUERY);
        const properties = sanityProperties.map(transformSanityProperty);

        const counts = properties.reduce(
          (acc: PropertyTypeCount, property: Property) => {
            if (property.propertyType === 'sale') {
              acc.sale += 1;
            } else if (property.propertyType === 'rent') {
              acc.rent += 1;
            }
            return acc;
          },
          { sale: 0, rent: 0 }
        );

        setPropertyCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchPropertyCounts();
  }, []);

  const handlePropertyTypeClick = (type: 'sale' | 'rent') => {
    // This will be handled by the Link component instead
  };

  const propertyTypes = [
    {
      id: 'sale',
      title: 'For Sale',
      count: propertyCounts.sale,
      type: 'sale' as const,
      gradient: 'from-blue-600/60 via-blue-500/50 to-purple-600/60',
    },
    {
      id: 'rent',
      title: 'For Rent',
      count: propertyCounts.rent,
      type: 'rent' as const,
      gradient: 'from-emerald-600/60 via-teal-500/50 to-cyan-600/60',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeader
          title="Explore Our Properties"
          subtitle="Find homes that fit your lifestyle, budget, and goals."
        />

        {/* Property Type Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl xs:max-w-2xl lg:max-w-3xl mx-8 md:mx-auto">
          {propertyTypes.map((propertyType) => (
            <Link
              key={propertyType.id}
              href={`/properties?type=${propertyType.type}`}
              className="block"
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.02]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
                    alt={propertyType.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${propertyType.gradient} transition-opacity duration-700 ease-out group-hover:opacity-70`}
                />

                {/* Content */}
                <div className="relative z-10 p-8 h-96 flex flex-col justify-start items-start text-center">
                  <h3 className="text-3xl font-normal text-white mb-2 transition-transform duration-500 ease-out group-hover:scale-105">
                    {propertyType.title}
                  </h3>

                  <div className="text-white/90 text-lg">
                    {loading ? (
                      <div className="animate-pulse">
                        <div className="h-7 bg-white/20 rounded w-32 mx-auto"></div>
                      </div>
                    ) : (
                      <span className="font-normal">
                        {propertyType.count}{' '}
                        {propertyType.count === 1 ? 'Property' : 'Properties'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-white/0 rounded-2xl transition-all duration-700 ease-out group-hover:border-white/20"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreProp;
