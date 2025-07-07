// app/blog/page.tsx
import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/Hero/HeroSection';
import BlogGrid from '@/components/Blog/BlogGrid';
import Pagination from '@/components/Blog/Pagination';
import { client } from '@/lib/sanity';
import { getBlogPostsQuery } from '@/lib/sanity/queries/blog';
import { BlogPost } from '@/types/blog';

// Updated interface for Next.js 15
interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Blog | Your Real Estate Company',
  description:
    'Stay updated with the latest real estate news, tips, and insights from our expert team.',
  openGraph: {
    title: 'Blog | Your Real Estate Company',
    description:
      'Stay updated with the latest real estate news, tips, and insights from our expert team.',
    type: 'website',
  },
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Await the searchParams
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  try {
    const { posts, total } = await client.fetch(
      getBlogPostsQuery(currentPage, POSTS_PER_PAGE)
    );
    const totalPages = Math.ceil(total / POSTS_PER_PAGE);

    return (
      <main className="space-y-8">
        {/* Hero Section */}
        <div className="px-8 space-y-4">
          <HeroSection
            title="Blog"
            subtitle="Stay updated with the latest real estate news, market insights, and expert tips to help you make informed decisions."
            backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
            textColor="text-white"
            overlayOpacity={0.4}
            height="h-80"
            borderRadius="rounded-xl"
          />
        </div>

        {/* Blog Content */}
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto py-8">
            {/* Blog Content */}
            <div className="px-8 space-y-8">
              {/* Blog Stats - updated styling */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Latest Articles
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Showing {posts.length} of {total} articles
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              {/* Blog Grid - use the updated BlogGrid component above */}
              <BlogGrid posts={posts} showFeatured={currentPage === 1} />

              {/* Pagination - use the updated Pagination component above */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl="/blog"
              />
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);

    return (
      <main className="space-y-8">
        <div className="px-8 space-y-4">
          <HeroSection
            title="Blog"
            subtitle="Stay updated with the latest real estate news, market insights, and expert tips to help you make informed decisions."
            backgroundImage="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
            textColor="text-white"
            overlayOpacity={0.4}
            height="h-80"
            borderRadius="rounded-xl"
          />
        </div>

        <div className="px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Unable to load blog posts
            </h2>
            <p className="text-gray-600">
              We're experiencing technical difficulties. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
