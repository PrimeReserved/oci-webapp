'use client';
import React from 'react';
import { MapPin, Search } from 'lucide-react';

const HomepageHero = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Find Your <span className="text-red-600">Dream</span>
                <br />
                Home with <span className="text-red-600">Confidence</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Explore curated listings and make your next move stress-free.
              </p>
            </div>

            {/* Search Section - TODO: Replace with actual search functionality */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {/* Property Type Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                <button className="px-6 py-2 bg-white rounded-md shadow-sm font-medium text-gray-900 flex-1">
                  BUY
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 flex-1">
                  SELL
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 flex-1">
                  RENT
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search Location"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>

            {/* 
              TODO: Replace the above search section with actual search functionality
              This will include:
              - Property type filtering (Buy/Sell/Rent)
              - Location search with autocomplete
              - Integration with Sanity CMS properties schema
              - Search filters (price, bedrooms, bathrooms, etc.)
              - Search results routing
            */}
          </div>

          {/* Right Image */}
          <div className="relative overflow-visible">
            <div className="relative z-10">
              <div
                className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden"
                style={{
                  borderRadius: '100px 100px 0 0',
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
                  alt="Modern Building"
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: '100px 100px 0 0',
                  }}
                />
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
