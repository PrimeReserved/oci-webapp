import React, { useState, useEffect, useRef } from 'react';
import { Property, ContactFormData } from '@/types/property';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const [inquiryType, setInquiryType] = useState<
    'appointment' | 'documentation'
  >('appointment');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyId: property?.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Update message based on inquiry type
  useEffect(() => {
    if (property) {
      const baseMessage =
        inquiryType === 'appointment'
          ? `I would like to get an appointment regarding the property advertised on your website N°${property.id}`
          : `I would like to receive full documentation regarding the property advertised on your website N°${property.id}`;

      setFormData((prev) => ({ ...prev, message: baseMessage }));
    }
  }, [inquiryType, property]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (modalContentRef.current) {
        const scrollTop = modalContentRef.current.scrollTop;
        setIsScrolled(scrollTop > 50);
      }
    };

    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          inquiryType,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
          });
          setInquiryType('appointment');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalContentRef}
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl scroll-smooth"
      >
        {/* Header - Now Sticky */}
        <div
          className={`sticky top-0 z-10 bg-gradient-to-r from-red-600 to-red-700 text-white transition-all duration-300 ${
            isScrolled ? 'p-3 rounded-t-xl' : 'p-6 rounded-t-2xl'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? 'w-8 h-8 mr-3' : 'w-12 h-12 mr-4'
                }`}
              >
                <svg
                  className={`text-white transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4' : 'w-6 h-6'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="transition-all duration-300">
                <h3
                  className={`font-bold transition-all duration-300 ${
                    isScrolled ? 'text-base' : 'text-xl'
                  }`}
                >
                  Contact Our Agency
                </h3>
                <p
                  className={`text-white/90 transition-all duration-300 ${
                    isScrolled ? 'text-xs' : 'text-sm'
                  }`}
                >
                  Get expert real estate assistance
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 ${
                isScrolled ? 'p-1' : 'p-2'
              }`}
            >
              <svg
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  How may we help you? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="inquiryType"
                      value="appointment"
                      checked={inquiryType === 'appointment'}
                      onChange={(e) =>
                        setInquiryType(e.target.value as 'appointment')
                      }
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        Get an appointment
                      </div>
                      <div className="text-sm text-gray-500">
                        Schedule a property viewing
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="inquiryType"
                      value="documentation"
                      checked={inquiryType === 'documentation'}
                      onChange={(e) =>
                        setInquiryType(e.target.value as 'documentation')
                      }
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        Receive full documentation
                      </div>
                      <div className="text-sm text-gray-500">
                        Get detailed property information
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 xxx xxx xxxx"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  `Send ${inquiryType === 'appointment' ? 'Appointment' : 'Documentation'} Request`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                <span className="text-red-500">*</span> Required fields
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
