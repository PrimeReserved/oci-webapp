import React from 'react';
import SectionHeader from './SectionHeader';

const DiscoverDeals = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeader
          title="Discover Our Best Deals"
          subtitle="Your next home might just be here"
        />
      </div>
    </section>
  );
};

export default DiscoverDeals;
