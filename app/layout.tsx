import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'OCI Homes & Properties - Premium Real Estate in Nigeria',
    template: '%s | OCI Homes & Properties',
  },
  description:
    'OCI Homes & Properties offers premium real estate in Lagos, Abuja, and Port Harcourt. Buy now, pay later options available. Corporate and residential properties.',
  keywords: [
    'real estate Nigeria',
    'Lagos properties',
    'Abuja real estate',
    'Port Harcourt properties',
    'buy now pay later',
    'OCI Homes',
    'Nigerian property investment',
  ],
  authors: [{ name: 'OCI Group' }],
  creator: 'OCI Homes & Properties',
  publisher: 'OCI Group',
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
    url: 'https://ocihomes.com',
    siteName: 'OCI Homes & Properties',
    title: 'OCI Homes & Properties - Premium Real Estate in Nigeria',
    description:
      'Premium real estate in Lagos, Abuja, and Port Harcourt. Buy now, pay later options available.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCI Homes & Properties - Premium Real Estate in Nigeria',
    description:
      'Premium real estate in Lagos, Abuja, and Port Harcourt. Buy now, pay later options available.',
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
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
