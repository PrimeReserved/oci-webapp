import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Home,
  Settings,
  PanelLeft,
  SidebarOpen,
  Layout,
  PanelTop,
} from 'lucide-react';

// Define types
interface PropertyFilters {
  search?: string;
  type?: 'sale' | 'rent';
  category?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
}

interface PropertySearchProps {
  onFiltersChange: (filters: PropertyFilters) => void;
  totalProperties: number;
  isSticky?: boolean;
  position?: 'top' | 'left';
  onPositionChange?: (position: 'top' | 'left') => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({
  onFiltersChange,
  totalProperties,
  isSticky = false,
  position = 'top',
  onPositionChange,
}) => {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');

  // Slider states
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [areaRange, setAreaRange] = useState([0, 1000]);

  // Price formatting
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₦${(price / 1000).toFixed(0)}K`;
    }
    return `₦${price.toLocaleString()}`;
  };

  const nigerianStates = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTabChange = (tab: 'all' | 'sale' | 'rent') => {
    setActiveTab(tab);
    const typeFilter = tab === 'all' ? undefined : tab;
    handleFilterChange('type', typeFilter);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    handleFilterChange('priceMin', values[0] > 0 ? values[0] : undefined);
    handleFilterChange(
      'priceMax',
      values[1] < 100000000 ? values[1] : undefined
    );
  };

  const handleAreaChange = (values: number[]) => {
    setAreaRange(values);
    handleFilterChange('areaMin', values[0] > 0 ? values[0] : undefined);
    handleFilterChange('areaMax', values[1] < 1000 ? values[1] : undefined);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
    setActiveTab('all');
    setPriceRange([0, 100000000]);
    setAreaRange([0, 1000]);
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof PropertyFilters] && key !== 'search'
  );

  // Custom Range Slider Component
  const RangeSlider = ({
    min,
    max,
    values,
    onChange,
    formatValue,
    label,
  }: {
    min: number;
    max: number;
    values: number[];
    onChange: (values: number[]) => void;
    formatValue: (value: number) => string;
    label: string;
  }) => {
    const [localValues, setLocalValues] = useState(values);

    useEffect(() => {
      setLocalValues(values);
    }, [values]);

    const handleChange = (index: number, value: number) => {
      const newValues = [...localValues];
      newValues[index] = value;

      // Ensure min doesn't exceed max and vice versa
      if (index === 0 && value > localValues[1]) {
        newValues[1] = value;
      }
      if (index === 1 && value < localValues[0]) {
        newValues[0] = value;
      }

      setLocalValues(newValues);
      onChange(newValues);
    };

    const getPercentage = (value: number) =>
      ((value - min) / (max - min)) * 100;

    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">
          {label}
        </label>
        <div className="relative pt-2">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-red-500 rounded-full"
              style={{
                left: `${getPercentage(localValues[0])}%`,
                width: `${getPercentage(localValues[1]) - getPercentage(localValues[0])}%`,
              }}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={localValues[0]}
              onChange={(e) => handleChange(0, Number(e.target.value))}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              style={{ zIndex: 1 }}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={localValues[1]}
              onChange={(e) => handleChange(1, Number(e.target.value))}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              style={{ zIndex: 2 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatValue(localValues[0])}</span>
            <span>{formatValue(localValues[1])}</span>
          </div>
        </div>
      </div>
    );
  };

  const AdvancedFiltersContent = () => (
    <div className="space-y-4">
      <div
        className={`grid gap-4 ${position === 'left' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}
      >
        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Location (State)
          </label>
          <select
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.location || ''}
            onChange={(e) =>
              handleFilterChange('location', e.target.value || undefined)
            }
          >
            <option value="">All States</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Category
          </label>
          <select
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.category || ''}
            onChange={(e) =>
              handleFilterChange('category', e.target.value || undefined)
            }
          >
            <option value="">All Categories</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Bedrooms
          </label>
          <select
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.bedrooms || ''}
            onChange={(e) =>
              handleFilterChange(
                'bedrooms',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Bathrooms
          </label>
          <select
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.bathrooms || ''}
            onChange={(e) =>
              handleFilterChange(
                'bathrooms',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>

      {/* Price Range Slider */}
      <div
        className={`grid gap-4 ${position === 'left' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
      >
        <RangeSlider
          min={0}
          max={100000000}
          values={priceRange}
          onChange={handlePriceChange}
          formatValue={formatPrice}
          label="Price Range"
        />

        {/* Area Range Slider */}
        <RangeSlider
          min={0}
          max={1000}
          values={areaRange}
          onChange={handleAreaChange}
          formatValue={(value) => `${value} sqm`}
          label="Area Range"
        />
      </div>
    </div>
  );

  if (position === 'left') {
    return (
      <div
        className={`bg-white shadow-lg border border-gray-200 rounded-lg h-fit ${isSticky ? 'sticky top-20' : ''}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Filters
            </h3>
            {onPositionChange && (
              <button
                onClick={() => onPositionChange('top')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Switch to top position"
              >
                <PanelTop className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filters.search || ''}
              onChange={(e) =>
                handleFilterChange('search', e.target.value || undefined)
              }
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Property Type Tabs */}
          <div className="flex space-x-1 mb-4">
            {[
              { key: 'all', label: 'All' },
              { key: 'sale', label: 'Sale' },
              { key: 'rent', label: 'Rent' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  handleTabChange(tab.key as 'all' | 'sale' | 'rent')
                }
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4 text-red-500" />
            <span className="font-medium">
              {totalProperties.toLocaleString()} Properties
            </span>
            {hasActiveFilters && (
              <span className="text-gray-500">filtered</span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="p-4">
          <AdvancedFiltersContent />

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original top position layout
  return (
    <div
      className={`bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-4 ${isSticky ? 'transition-all duration-300' : ''}`}
    >
      {/* Main Search Row */}
      <div className={`border-b border-gray-200 ${isSticky ? 'p-2' : 'p-3'}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by location, features, or keywords..."
              className={`w-full pl-8 pr-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${isSticky ? 'py-1.5 text-xs' : 'py-2 text-sm'}`}
              value={filters.search || ''}
              onChange={(e) =>
                handleFilterChange('search', e.target.value || undefined)
              }
            />
            <Search
              className={`absolute left-2.5 text-gray-400 ${isSticky ? 'top-2 w-3 h-3' : 'top-2.5 w-3.5 h-3.5'}`}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Layout Toggle */}
            {onPositionChange && (
              <button
                onClick={() => onPositionChange('left')}
                className={`hidden lg:flex items-center space-x-1 px-3 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors duration-200 ${isSticky ? 'py-1.5' : 'py-2'}`}
                title="Switch to left sidebar"
              >
                <PanelLeft className="w-4 h-4 text-gray-500" />
              </button>
            )}

            {/* Filter Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center space-x-1 px-3 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap ${isSticky ? 'py-1.5' : 'py-2'}`}
            >
              <Filter className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-700">
                {showAdvancedFilters
                  ? 'Hide Advanced Filters'
                  : 'Show Advanced Filters'}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className={`px-3 bg-gray-100 hover:bg-red-50 text-red-600 text-xs font-medium rounded transition-colors duration-200 flex items-center space-x-1 ${isSticky ? 'py-1.5' : 'py-2'}`}
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Property Type Tabs */}
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All Properties' },
              { key: 'sale', label: 'For Sale' },
              { key: 'rent', label: 'For Rent' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  handleTabChange(tab.key as 'all' | 'sale' | 'rent')
                }
                className={`px-3 text-xs font-medium rounded transition-colors duration-200 whitespace-nowrap ${isSticky ? 'py-1.5' : 'py-2'} ${
                  activeTab === tab.key
                    ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div
        className={`bg-gray-50 border-b border-gray-200 ${isSticky ? 'px-2 py-1.5' : 'px-3 py-2'}`}
      >
        <div className="flex items-center space-x-2">
          <Home className="w-3 h-3 text-red-500" />
          <span
            className={`font-semibold text-gray-900 ${isSticky ? 'text-xs' : 'text-sm'}`}
          >
            {totalProperties.toLocaleString()} Properties
          </span>
          {hasActiveFilters && (
            <span className="text-xs text-gray-500">filtered</span>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div
          className={`border-b border-gray-200 bg-gray-50 ${isSticky ? 'p-2' : 'p-3'} max-h-96 overflow-y-auto md:max-h-none md:overflow-visible`}
        >
          <AdvancedFiltersContent />
        </div>
      )}

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #dc2626;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .range-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #dc2626;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default PropertySearch;
