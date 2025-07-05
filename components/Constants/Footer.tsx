'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-16 gap-8 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-5 sm:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749910278/oci/icons/ociLogo_efref5.png"
                alt="OCI Homes and Properties"
                width={280}
                height={140}
                className="h-24 lg:h-28 w-auto"
              />
            </Link>
            <p className="text-black text-sm leading-relaxed mb-6 max-w-sm">
              OCI is a trusted real estate company helping individuals and
              families find, buy, and sell properties with ease. With a focus on
              transparency, professionalism, and personalized service, we make
              every real estate journey a smooth one.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-black hover:text-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Discover */}
          <div className="lg:col-span-2 lg:flex lg:flex-col lg:justify-start pt-0 md:pt-20">
            <div>
              <h3 className="text-black font-semibold mb-4">Discover</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/port-harcourt"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Port Harcourt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lagos"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Lagos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ibadan"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Ibadan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delta"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Delta
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:flex lg:flex-col lg:justify-start pt-0 md:pt-20">
            <div>
              <h3 className="text-black font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-black hover:text-primary transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3 lg:flex lg:flex-col lg:justify-start pt-0 md:pt-20">
            <div>
              <h3 className="text-black font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <p className="text-black text-sm break-words">
                  <a
                    href="mailto:info@ocihomesandproperties.com"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    info@ocihomesandproperties.com
                  </a>
                </p>
                <p className="text-black text-sm">
                  <a
                    href="tel:07034443777"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    07034443777
                  </a>
                </p>
                <p className="text-black text-sm">
                  <a
                    href="tel:08033058782"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    08033058782
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Our Address */}
          <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-start pt-0 md:pt-20">
            <div>
              <h3 className="text-black font-semibold mb-4">Our Address</h3>
              <div className="text-black text-sm space-y-2">
                <p className="break-words">
                  12 Ebele Okeke street, wuye Abuja, Nigeria.
                </p>
                <p className="break-words">
                  378 Fola Osibo Street, Lekki phase 1 Lagos Nigeria.
                </p>
                <p className="break-words">
                  36 Trans Amadi Road Rumuobiakani Port Harcourt, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-center sm:justify-between items-center relative">
          <p className="text-black text-sm text-center mb-4 sm:mb-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            Copyright © 2025 OCI
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition-colors duration-200 sm:ml-auto"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
