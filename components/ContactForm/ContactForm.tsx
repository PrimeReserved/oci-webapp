'use client';

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-8 pb-4 px-2">
        <div className="text-sm text-gray-600 mb-4">Get Started</div>

        <div className="max-w-4xl">
          <h1 className="text-2xl lg:text-6xl font-bold text-black mb-2 ">
            Get in touch with us.
          </h1>
          <h2 className="text-2xl lg:text-6xl font-bold text-black mb-4 ">
            We're here to assist you.
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 max-w-full">
        {/* Leave us a Message Button */}
        <div className="mb-16">
          <button className="bg-red-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-red-700 transition-colors">
            Leave us a Message →
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Thank you! Your message has been sent successfully. We'll get back
            to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Sorry, there was an error sending your message. Please try again.
          </div>
        )}

        <div className="space-y-4">
          {/* Name, Email, Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-base font-medium text-black"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-red-600 focus:ring-0 bg-transparent text-black placeholder-gray-500 text-base"
                placeholder=""
                style={{ outline: 'none' }}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-base font-medium text-black"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-red-600 focus:ring-0 bg-transparent text-black placeholder-gray-500 text-base"
                placeholder=""
                style={{ outline: 'none' }}
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-base font-medium text-black"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-red-600 focus:ring-0 bg-transparent text-black placeholder-gray-500 text-base"
                placeholder=""
                style={{ outline: 'none' }}
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2 pt-8">
            <label
              htmlFor="message"
              className="block text-base font-medium text-black"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-red-600 focus:ring-0 bg-transparent text-black placeholder-gray-500 text-base resize-none"
              placeholder=""
              style={{ outline: 'none' }}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-8 pb-16">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-red-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
