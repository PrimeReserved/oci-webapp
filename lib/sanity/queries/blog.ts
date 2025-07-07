// lib/sanity/queries/blog.ts
import { groq } from 'next-sanity';

// Author query fragment
export const authorQuery = groq`
  author->{
    _id,
    name,
    slug,
    image,
    bio,
    email,
    socialLinks
  }
`;

// Blog post query fragment
export const blogPostQuery = groq`
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  content,
  ${authorQuery},
  publishedAt,
  featured,
  tags,
  seo
`;

// Get all blog posts with pagination
export const getBlogPostsQuery = (page: number = 1, limit: number = 9) => {
  const offset = (page - 1) * limit;

  return groq`
    {
      "posts": *[_type == "blog"] | order(publishedAt desc) [${offset}...${offset + limit}] {
        ${blogPostQuery}
      },
      "total": count(*[_type == "blog"])
    }
  `;
};

// Get single blog post by slug
export const getBlogPostBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    ${blogPostQuery}
  }
`;

// Get featured blog posts
export const getFeaturedBlogPostsQuery = groq`
  *[_type == "blog" && featured == true] | order(publishedAt desc) [0...3] {
    ${blogPostQuery}
  }
`;

// Get related blog posts
export const getRelatedBlogPostsQuery = groq`
  *[_type == "blog" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...3] {
    ${blogPostQuery}
  }
`;

// Get blog posts by category
export const getBlogPostsByCategoryQuery = (
  category: string,
  page: number = 1,
  limit: number = 9
) => {
  const offset = (page - 1) * limit;

  return groq`
    {
      "posts": *[_type == "blog" && category == "${category}"] | order(publishedAt desc) [${offset}...${offset + limit}] {
        ${blogPostQuery}
      },
      "total": count(*[_type == "blog" && category == "${category}"])
    }
  `;
};

// Get all blog categories
export const getBlogCategoriesQuery = groq`
  array::unique(*[_type == "blog"].category)
`;

// Get recent blog posts
export const getRecentBlogPostsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    publishedAt,
    category
  }
`;
