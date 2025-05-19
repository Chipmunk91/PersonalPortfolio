import { BlogPostType } from '@/lib/types';

// BLOG POST REGISTRATION SYSTEM
// This is the only file that needs to be updated when adding a new blog post
// Just import your blog post's metadata and add an entry to the blogPostFiles array

// Import blog post metadata
import { metadata as post1Metadata } from './01-building-intuitive-ai-interfaces';
import { metadata as post2Metadata } from './02-future-of-ai-explainability';
import { metadata as post3Metadata } from './03-how-to-add-new-blog-posts';

// STEP 1: Import your blog post metadata here
// import { metadata as post4Metadata } from './04-your-new-post';

// Define all blog post files with their metadata and module paths
// This centralized registry makes it easy to locate all blog posts
export const blogPostFiles = [
  { 
    id: 1, 
    metadata: post1Metadata, 
    path: './01-building-intuitive-ai-interfaces'
  },
  { 
    id: 2, 
    metadata: post2Metadata, 
    path: './02-future-of-ai-explainability'
  },
  {
    id: 3,
    metadata: post3Metadata,
    path: './03-how-to-add-new-blog-posts'
  },
  // STEP 2: Add your new blog post here
  // { 
  //   id: 4, 
  //   metadata: post4Metadata, 
  //   path: './04-your-new-post' 
  // },
];

// Convert our metadata map to a properly formatted array of blog posts with IDs
const blogPostsWithIds: BlogPostType[] = Object.entries(metadataMap).map(
  ([fileNum, metadata]) => ({
    id: parseInt(fileNum, 10),
    ...metadata
  })
);

// Export the complete list of blog posts with metadata
export const blogPosts = blogPostsWithIds;

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// INSTRUCTIONS FOR ADDING NEW BLOG POSTS:
// 1. Create a new file in this directory with the pattern XX-your-post-title.tsx
//    - XX should be the next number in sequence (04, 05, etc.)
//    - The number becomes the post ID automatically
// 2. Copy the structure from template-new-blog-post.tsx
// 3. Add your content and metadata in that one file
// 4. That's it! Your post will automatically appear in the blog listings