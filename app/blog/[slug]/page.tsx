// app/blog/[slug]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';
import { client } from '@/lib/sanity';
import {
  getBlogPostBySlugQuery,
  getRelatedBlogPostsQuery,
} from '@/lib/sanity/queries/blog';
import { BlogPost } from '@/types/blog';
import { formatDate, readingTime } from '@/lib/utils';
import BlogCard from '@/components/Blog/BlogCard';
import ShareButtons from '@/components/Blog/ShareButtons';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

// Helper function to get image URL from URL-based image objects
const getImageUrl = (imageObj: any): string | null => {
  if (!imageObj) return null;

  // If it's a URL-based image object
  if (typeof imageObj === 'object' && imageObj.url) {
    return imageObj.url;
  }

  // If it's already a string URL
  if (typeof imageObj === 'string') {
    return imageObj;
  }

  return null;
};

// Custom components for PortableText
const components = {
  types: {
    contentImage: ({ value }: any) => {
      const imageUrl = getImageUrl(value);
      return (
        <div className="my-8">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={value.alt || 'Blog image'}
                fill
                className="object-cover"
              />
            )}
          </div>
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-3 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-700 my-6 bg-gray-50 py-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-red-600 hover:text-red-700 underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post: BlogPost = await client.fetch(getBlogPostBySlugQuery, {
    slug: params.slug,
  });

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const imageUrl = getImageUrl(post.mainImage);

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post: BlogPost = await client.fetch(getBlogPostBySlugQuery, {
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts: BlogPost[] = await client.fetch(
    getRelatedBlogPostsQuery,
    {
      category: post.category,
      slug: params.slug,
    }
  );

  const imageUrl = getImageUrl(post.mainImage);
  const authorImageUrl = getImageUrl(post.author.image);

  // Calculate reading time from content
  const contentText =
    post.content
      ?.filter((block) => block._type === 'block')
      .map((block) => {
        // Type assertion for block children
        const blockWithChildren = block as any;
        return (
          blockWithChildren.children
            ?.filter((child: any) => child._type === 'span')
            ?.map((span: any) => span.text)
            ?.join(' ') || ''
        );
      })
      .join(' ') || '';

  const estimatedReadingTime = readingTime(contentText);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white pb-8">
        <div className="max-w-4xl mx-auto px-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
              {post.category.charAt(0).toUpperCase() +
                post.category.slice(1).replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{estimatedReadingTime}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4 pb-6">
            <span className="text-sm font-medium text-gray-700">Share:</span>
            <ShareButtons url={`/blog/${params.slug}`} title={post.title} />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-8 mb-8">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-8 pb-12">
        <div className="bg-white rounded-xl p-8 md:p-12">
          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content} components={components} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-start space-x-4">
              {authorImageUrl && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={authorImageUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {post.author.name}
                </h3>
                {post.author.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-8 pb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
