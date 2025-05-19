import React from 'react';
import { BlogPostType } from '@/lib/types';

// Post metadata
export const metadata: Omit<BlogPostType, 'id'> = {
  title: 'How to Add New Blog Posts to This Website',
  excerpt: 'A quick guide explaining how to add new blog content to your portfolio site using the single-file approach.',
  imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
  category: 'tutorial',
  readTime: 3,
  author: 'Admin',
  date: 'May 19, 2023'
};

// Post content component
export default function BlogPostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <p className="lead text-xl">
        {metadata.excerpt}
      </p>
      
      <h2>The Single-File Blog Post System</h2>
      <p>
        This website uses a streamlined approach for blog posts. Each post is contained in a 
        single file that includes both the post's metadata (title, author, date, etc.) and the
        actual content. This makes it much easier to add, edit, or remove blog posts.
      </p>
      
      <h2>How to Add a New Blog Post</h2>
      <p>
        Follow these simple steps to add a new blog post to the website:
      </p>
      
      <h3>Step 1: Create a New File</h3>
      <p>
        Create a new file in the <code>client/src/content/blog-posts/</code> directory. 
        Name it using the pattern <code>XX-your-post-title.tsx</code> where XX is the next 
        available number (e.g., 03, 04, etc.).
      </p>
      <p>
        The easiest way to start is by copying the template file <code>template-new-blog-post.tsx</code> 
        that's already in the blog posts directory.
      </p>
      
      <h3>Step 2: Edit the Metadata</h3>
      <p>
        In your new file, update the metadata section with your post's information:
      </p>
      
      <pre><code>{`export const metadata: Omit<BlogPostType, 'id'> = {
  title: 'Your Blog Post Title',
  excerpt: 'A short description of your blog post...',
  imageUrl: 'https://images.unsplash.com/photo-XXXXX',
  category: 'tutorial',
  readTime: 5,
  author: 'Your Name',
  date: 'Month DD, YYYY'
};`}</code></pre>
      
      <h3>Step 3: Write Your Content</h3>
      <p>
        Add your blog post content to the <code>BlogPostContent</code> component. You can use 
        standard HTML elements and Markdown-style formatting:
      </p>
      <ul>
        <li>Use <code>h2</code>, <code>h3</code>, etc. for headings</li>
        <li>Use <code>p</code> for paragraphs</li>
        <li>Use <code>ul</code>/<code>li</code> for lists</li>
        <li>Use <code>pre</code>/<code>code</code> for code examples</li>
        <li>Use <code>img</code> for additional images</li>
      </ul>
      
      <h3>Step 4: Register Your Post</h3>
      <p>
        Open <code>client/src/content/blog-posts/index.ts</code> and:
      </p>
      <ol>
        <li>Import your post's metadata</li>
        <li>Add it to the <code>blogPostsWithIds</code> array with the next available ID</li>
      </ol>
      
      <pre><code>{`// Add this import
import { metadata as post3Metadata } from './03-your-post-title';

// Add your post to the array
const blogPostsWithIds: BlogPostType[] = [
  { id: 1, ...post1Metadata },
  { id: 2, ...post2Metadata },
  { id: 3, ...post3Metadata },
  // Add more posts here
];`}</code></pre>
      
      <h3>Step 5: Update the BlogPost Component</h3>
      <p>
        Finally, update <code>client/src/pages/BlogPost.tsx</code> to import and render your new post:
      </p>
      
      <pre><code>{`// Add this import near the top of the file
const Post3Content = lazy(() => import('@/content/blog-posts/03-your-post-title'));

// Then add a case for your post in the rendering logic:
{post.id === 1 ? (
  <Post1Content />
) : post.id === 2 ? (
  <Post2Content />
) : post.id === 3 ? (
  <Post3Content />
) : (
  // Default content...
)}`}</code></pre>
      
      <h2>That's It!</h2>
      <p>
        Your new blog post is now fully integrated into the website. It will appear in the blog listing 
        and have its own dedicated page.
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 my-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-2">Pro Tip</h3>
        <p className="text-blue-700 dark:text-blue-300">
          For large blogs with many posts, you could enhance this system by:
        </p>
        <ul className="list-disc ml-5 text-blue-700 dark:text-blue-300">
          <li>Adding tags for better categorization</li>
          <li>Implementing pagination for the blog listing</li>
          <li>Adding a search function</li>
          <li>Creating a dynamic routing system that doesn't require updating the BlogPost component</li>
        </ul>
      </div>
    </div>
  );
}