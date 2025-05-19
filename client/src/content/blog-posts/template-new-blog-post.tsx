import React from 'react';
import { BlogPostType } from '@/lib/types';

// Post metadata - Replace this with your post information
export const metadata: Omit<BlogPostType, 'id'> = {
  title: 'Your Blog Post Title',
  excerpt: 'A short description of your blog post that will appear in summaries and previews.',
  imageUrl: 'https://images.unsplash.com/photo-XXXXX', // Replace with your image URL
  category: 'tutorial', // Options: tutorial, insight, case-study, review, opinion, etc.
  readTime: 5, // Approximate time to read in minutes
  author: 'Your Name',
  date: 'Month DD, YYYY' // Format: May 15, 2023
};

// To add this post to the blog:
// 1. Save this file with a name format: XX-your-post-title.tsx (where XX is the next number in sequence)
// 2. Register it in /client/src/content/blog-posts/index.ts

// Post content component - This will be rendered when someone views your blog post
export default function BlogPostContent() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Lead paragraph - usually repeats or expands on the excerpt */}
      <p className="lead text-xl">
        {metadata.excerpt}
      </p>
      
      {/* Main content sections - Use h2 for main sections, h3 for subsections */}
      <h2>Introduction</h2>
      <p>
        Start with an engaging introduction that explains what the article will cover 
        and why it matters to the reader.
      </p>
      
      <h2>First Main Section</h2>
      <p>
        Develop your first main point here. Break complex ideas into paragraphs.
        Include examples, stories, or explanations that make your point clear.
      </p>
      
      <h3>A Subsection</h3>
      <p>
        Dive deeper into a specific aspect of your main section.
      </p>
      
      {/* Lists - Use ordered or unordered lists as needed */}
      <h2>Key Points to Remember</h2>
      <ul>
        <li>First important point</li>
        <li>Second important point</li>
        <li>Third important point</li>
      </ul>
      
      {/* Code examples - Use pre and code tags with template literals */}
      <h2>Code Example</h2>
      <p>
        If your post includes code, format it like this:
      </p>
      
      <pre><code>{`// Example code
function example() {
  const data = [1, 2, 3, 4];
  return data.map(item => item * 2);
}`}</code></pre>
      
      {/* Images - Use the img tag with appropriate alt text */}
      <h2>Visual Elements</h2>
      <p>
        You can include additional images in your content:
      </p>
      
      {/* 
      <img 
        src="https://images.unsplash.com/photo-XXXXX" 
        alt="Description of the image" 
        className="rounded-lg my-6"
      />
      */}
      
      <h2>Conclusion</h2>
      <p>
        Summarize the key points from your article and provide a closing thought or call to action.
      </p>
      
      {/* Optional further reading section */}
      <h3>Further Reading</h3>
      <ul>
        <li>Author, A. (Year). Title of the reference.</li>
        <li>Author, B. (Year). Another helpful resource.</li>
      </ul>
    </div>
  );
}