// components/Blog/BlogCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCardProps } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  // No need for urlForImage anymore - use direct URL
  const imageUrl = post.mainImage?.url;

  // Format category for display
  const formatCategory = (category: string) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
    );
  };

  return (
    <article
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div
          className={`relative ${featured ? 'h-64 lg:h-80' : 'h-48'} w-full`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={
                featured
                  ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            {formatCategory(post.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-3">
          {/* Title */}
          <h3
            className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}
          >
            <Link
              href={`/blog/${post.slug.current}`}
              className="hover:underline"
            >
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {post.author.image?.url && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image.url}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>

            {/* Read More Link */}
            <Link
              href={`/blog/${post.slug.current}`}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200 text-sm font-medium"
            >
              <span>Read More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
