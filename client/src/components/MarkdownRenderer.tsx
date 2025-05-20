import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for headings
          h1: ({children}) => (
            <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({children}) => (
            <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
          ),
          h3: ({children}) => (
            <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
          ),
          // Custom styling for code blocks
          code: ({className, children}) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                <code className={className}>{children}</code>
              </pre>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          // Custom styling for links
          a: ({children, href}) => (
            <a href={href} className="text-primary hover:underline">
              {children}
            </a>
          ),
          // Custom styling for images
          img: ({src, alt}) => (
            <img src={src} alt={alt} className="rounded-lg my-6 max-w-full" />
          )
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}