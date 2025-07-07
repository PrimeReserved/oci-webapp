import AboutUs from '@/components/Cards/AboutUs';
import DiscoverPropCard from '@/components/Cards/DiscoverPropCard';
import WhyChooseUs from '@/components/Cards/WhyChooseUs';
import HeroSection from '@/components/Hero/HeroSection';
import React from 'react';

const page = () => {
  return (
    <main className="space-y-8">
      <div className="px-8 space-y-4">
        <HeroSection
          title="About Us"
          // subtitle="Find your perfect home where comfort meets convenience. Browse our curated collection of premium properties in the most desirable neighborhoods."
          backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
          textColor="text-white"
          overlayOpacity={0.4}
          height="h-80"
          borderRadius="rounded-xl"
        />
        <AboutUs />
        <WhyChooseUs />
      </div>
      <DiscoverPropCard />
    </main>
  );
};

export default page;
