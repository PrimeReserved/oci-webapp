import React from 'react';
import HeroSection from '../Hero/HeroSection';
import { ArrowRight, ChevronRight } from 'lucide-react';

const DiscoverPropCard = () => {
  return (
    <section>
      <HeroSection
        title="Discover a place you'll love to live"
        subtitle="From stunning homes to trusted agents we make your dream home a reality."
        backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
        textColor="text-white"
        overlayOpacity={0.3}
        height="h-130"
        // borderRadius="rounded-xl"
        button={{
          text: 'View Properties',
          href: '/properties',
          backgroundColor: '#dc2626',
          textColor: 'text-white',
          icon: <ArrowRight className="w-4 h-4" />,
        }}
      />
    </section>
  );
};

export default DiscoverPropCard;
