import React from 'react';
import SectionHeader from './SectionHeader';

const ExploreProp = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeader
          title="Explore Our Properties"
          subtitle="Find homes that fit your lifestyle, budget, and goals."
        />
      </div>
    </section>
  );
};

export default ExploreProp;
