import React from 'react';
import SectionHeader from './SectionHeader';
import HowItWorksCard from './HowItWorksCard';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeader
          title="How It works? Find a perfect home"
          subtitle="Find your perfect home in just a few steps; simple, fast, and stress free"
        />
        {/* How It Works Cards */}
        <HowItWorksCard />
      </div>
    </section>
  );
};

export default HowItWorks;
