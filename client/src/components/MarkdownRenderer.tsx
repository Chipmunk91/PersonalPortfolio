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
          // Custom styling for code blocks
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Custom link styling
          a: ({ node, children, ...props }) => (
            <a className="text-primary hover:underline" {...props}>
              {children}
            </a>
          ),
          // Custom image styling
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-6 max-w-full" {...props} />
          )
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}