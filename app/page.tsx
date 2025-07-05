import DiscoverDeals from '@/components/Cards/DiscoverDeals';
import ExploreProp from '@/components/Cards/ExploreProp';
import HowItWorks from '@/components/Cards/HowItWorks';
import OurMission from '@/components/Cards/OurMission';
import DiscoverPropCard from '@/components/Cards/DiscoverPropCard';
import HomepageHero from '@/components/Hero/HomepageHero';
import WhatWeOffer from '@/components/Cards/WhatWeOffer';

export default function Home() {
  return (
    <div>
      <HomepageHero />
      <OurMission />
      <ExploreProp />
      <DiscoverDeals />
      <HowItWorks />
      <DiscoverPropCard />
      <WhatWeOffer />
    </div>
  );
}
