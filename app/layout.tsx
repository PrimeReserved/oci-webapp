import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Constants/Header';
import Footer from '@/components/Constants/Footer';
import ScrollAnimations from '@/components/Animations/ScrollAnimations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Premium Real Estate Properties - Buy, Sell, Rent',
    template: '%s | Premium Real Estate',
  },
  description:
    'Discover premium real estate properties in Nigeria. Buy, sell, and rent residential and commercial properties. Flexible payment options available.',
  keywords: [
    'real estate Nigeria',
    'properties for sale',
    'houses for rent',
    'commercial real estate',
    'residential properties',
    'property investment',
    'real estate agency',
    'buy property Nigeria',
    'rent apartment',
    'land for sale',
  ],
  authors: [{ name: 'Premium Real Estate' }],
  creator: 'Premium Real Estate Properties',
  publisher: 'Premium Real Estate Group',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://yourrealestate.com',
    siteName: 'Premium Real Estate Properties',
    title: 'Premium Real Estate Properties - Buy, Sell, Rent',
    description:
      'Discover premium real estate properties in Nigeria. Buy, sell, and rent with flexible payment options.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Real Estate Properties - Buy, Sell, Rent',
    description:
      'Discover premium real estate properties in Nigeria. Buy, sell, and rent with flexible payment options.',
  },
  verification: {
    // Add when you have these
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ScrollAnimations />
        <Header />
        <main className="pt-16 lg:pt-20 animate-in fade-in duration-500">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
