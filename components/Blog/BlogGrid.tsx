// components/Blog/BlogGrid.tsx
import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

interface BlogGridProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, showFeatured = false }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No blog posts found.</p>
      </div>
    );
  }

  // If showing featured, separate featured posts from regular posts
  const featuredPosts = showFeatured
    ? posts.filter((post) => post.featured)
    : [];
  const regularPosts = showFeatured
    ? posts.filter((post) => !post.featured)
    : posts;

  return (
    <div className="space-y-8">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Articles
            </h2>
            <div className="h-px bg-gray-200 flex-1 ml-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <BlogCard
                key={post._id}
                post={post}
                featured={index === 0} // Make first featured post larger
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts Section */}
      {regularPosts.length > 0 && (
        <div className="space-y-6">
          {featuredPosts.length > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <div className="h-px bg-gray-200 flex-1 ml-6"></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
