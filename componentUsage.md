import Button from './Button';
import { ArrowRight } from 'lucide-react';

// Primary button with default styling
<Button
text="View Properties"
href="/properties"
icon={<ArrowRight className="w-4 h-4" />}
/>

// Button with custom background color
<Button 
  text="Contact Us" 
  href="/contact" 
  backgroundColor="#10b981" 
  textColor="text-white" 
/>

// Button with onClick handler (no navigation)
<Button
text="Submit Form"
onClick={() => handleSubmit()}
type="submit"
/>

// Disabled button
<Button 
  text="Loading..." 
  disabled={true} 
/>

-------------------- button component -----------------------

-------------------- SectionHeader component -----------------------

import SectionHeader from './SectionHeader';

// Default usage (like in OurMission)
<SectionHeader 
  title="Our mission is to redefine real estate in the customer's favor."
  subtitle="Empowering smarter choices with trust, ease, and transparency"
/>

// Custom max widths
<SectionHeader 
  title="About Our Services"
  subtitle="We provide comprehensive real estate solutions"
  titleMaxWidth="max-w-3xl"
  subtitleMaxWidth="max-w-2xl"
/>

// Without subtitle
<SectionHeader 
  title="Featured Properties"
/>

// Custom styling
<SectionHeader 
  title="Contact Us Today"
  subtitle="Get in touch with our expert team"
  titleClassName="text-primary"
  subtitleClassName="text-gray-500"
  marginBottom="mb-12"
/>

-------------------- SectionHeader component -----------------------
