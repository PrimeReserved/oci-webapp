import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Constants/Header';
import Footer from '@/components/Constants/Footer';
import ScrollAnimations from '@/components/Animations/ScrollAnimations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://deployfasterrealestate.netlify.app'),
  title: {
    default:
      'Premium Real Estate Properties Nigeria - Buy, Sell, Rent | DeployFaster Real Estate',
    template: '%s | Premium Real Estate Nigeria',
  },
  description:
    'Discover premium real estate properties in Nigeria. Buy, sell, and rent residential and commercial properties with flexible payment options. Expert real estate services in Lagos, Abuja, and major Nigerian cities.',
  keywords: [
    'real estate Nigeria',
    'properties for sale Nigeria',
    'houses for rent Lagos',
    'commercial real estate Abuja',
    'residential properties Nigeria',
    'property investment Nigeria',
    'real estate agency Lagos',
    'buy property Nigeria',
    'rent apartment Lagos',
    'land for sale Nigeria',
    'Nigerian real estate',
    'property management',
    'real estate consultant',
    'home buyers Nigeria',
    'property developers',
  ],
  authors: [
    {
      name: 'DeployFaster Real Estate',
      url: 'https://deployfasterrealestate.netlify.app',
    },
  ],
  creator: 'DeployFaster Real Estate Properties',
  publisher: 'DeployFaster Real Estate Group',
  category: 'Real Estate',
  classification: 'Business',
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
    url: 'https://deployfasterrealestate.netlify.app',
    siteName: 'DeployFaster Real Estate Properties',
    title: 'Premium Real Estate Properties Nigeria - Buy, Sell, Rent',
    description:
      'Discover premium real estate properties in Nigeria. Buy, sell, and rent residential and commercial properties with flexible payment options.',
    images: [
      {
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png',
        width: 1200,
        height: 630,
        alt: 'Premium Real Estate Properties Nigeria - Buy, Sell, Rent',
        type: 'image/png',
      },
      {
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png',
        width: 800,
        height: 600,
        alt: 'DeployFaster Real Estate - Premium Properties',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@deployfaster',
    creator: '@deployfaster',
    title: 'Premium Real Estate Properties Nigeria - Buy, Sell, Rent',
    description:
      'Discover premium real estate properties in Nigeria. Buy, sell, and rent residential and commercial properties with flexible payment options.',
    images: [
      'https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png',
    ],
  },
  alternates: {
    canonical: 'https://deployfasterrealestate.netlify.app',
    languages: {
      'en-NG': 'https://deployfasterrealestate.netlify.app',
      'en-US': 'https://deployfasterrealestate.netlify.app',
    },
  },
  verification: {
    // Add when you have these
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // other: {
    //   'facebook-domain-verification': 'your-facebook-verification-code',
    // },
  },
  other: {
    'geo.region': 'NG',
    'geo.placename': 'Nigeria',
    'geo.position': '9.0765;7.3986',
    ICBM: '9.0765, 7.3986',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'DeployFaster Real Estate Properties',
    url: 'https://deployfasterrealestate.netlify.app',
    logo: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png',
    image:
      'https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png',
    description:
      'Premium real estate properties in Nigeria. Buy, sell, and rent residential and commercial properties with flexible payment options.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressRegion: 'Nigeria',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://facebook.com/yourpage',
      // 'https://twitter.com/yourhandle',
      // 'https://instagram.com/yourhandle',
      // 'https://linkedin.com/company/yourcompany',
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    offers: {
      '@type': 'Offer',
      category: 'Real Estate Services',
      description: 'Buy, sell, and rent premium properties in Nigeria',
    },
  };

  return (
    <html lang="en-NG">
      <head>
        {/* CRITICAL: Mobile viewport meta tag - THIS IS THE FIX */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Additional Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DeployFaster Real Estate Properties',
              url: 'https://deployfasterrealestate.netlify.app',
              description:
                'Premium real estate properties in Nigeria. Buy, sell, and rent residential and commercial properties.',
              publisher: {
                '@type': 'Organization',
                name: 'DeployFaster Real Estate Properties',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://deployfasterrealestate.netlify.app/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DeployFaster Real Estate Properties',
              url: 'https://deployfasterrealestate.netlify.app',
              logo: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png',
              description:
                'Premium real estate agency in Nigeria specializing in residential and commercial properties.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'Nigeria',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: 'English',
              },
            }),
          }}
        />

        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/dzd51q99i/image/upload/v1751878557/deployfaster/websitetemplatethumbnails/primeestate/PrimeEstate_Real_Estate_Website_-_DeployFaster.PrimeReserved_o5cph5.png"
          as="image"
        />

        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
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
