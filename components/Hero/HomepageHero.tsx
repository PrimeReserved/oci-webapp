'use client';
import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomepageHero = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Build search parameters
    const params = new URLSearchParams();

    // Add property type filter
    params.set('type', activeTab);

    // Add search term if provided
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }

    // Navigate to properties page with filters
    router.push(`/properties?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-6 md:px-8 lg:px-8">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Find Your <span className="text-red-600">Dream</span>
              <br />
              Home with <span className="text-red-600">Confidence</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-xs md:max-w-md mx-auto">
              Explore curated listings and make your next move stress-free.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative overflow-visible mb-6 md:mb-8">
            <div className="relative z-10">
              <div
                className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden"
                style={{
                  borderRadius: '60px 60px 0 0',
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
                  alt="Modern Building"
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: '60px 60px 0 0',
                  }}
                />
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-24 h-24 md:w-32 md:h-32 bg-blue-100 rounded-full opacity-40"></div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
            {/* Property Type Tabs */}
            <div className="flex space-x-1 mb-4 md:mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-4 md:px-6 py-2 rounded-md font-medium flex-1 text-sm md:text-base transition-colors ${
                  activeTab === 'sale'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                FOR SALE
              </button>
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-4 md:px-6 py-2 rounded-md font-medium flex-1 text-sm md:text-base transition-colors ${
                  activeTab === 'rent'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                FOR RENT
              </button>
            </div>

            {/* Search Input */}
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search by location, features, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2 text-sm md:text-base"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
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

            {/* Search Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {/* Property Type Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('sale')}
                  className={`px-6 py-2 rounded-md font-medium flex-1 text-base transition-colors ${
                    activeTab === 'sale'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  FOR SALE
                </button>
                <button
                  onClick={() => setActiveTab('rent')}
                  className={`px-6 py-2 rounded-md font-medium flex-1 text-base transition-colors ${
                    activeTab === 'rent'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  FOR RENT
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by location, features, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2 text-base"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative overflow-visible">
            <div className="relative z-10">
              <div
                className="w-full h-[500px] bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden"
                style={{
                  borderRadius: '60px 60px 0 0',
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
                  alt="Modern Building"
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: '60px 60px 0 0',
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
