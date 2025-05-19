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
          // Add custom styling to code blocks
          code({ node, inline, className, children, ...props }) {
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
          // Style headings appropriately
          h1(props) {
            return <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />;
          },
          // Style links
          a(props) {
            return <a className="text-primary hover:underline" {...props} />;
          },
          // Style images
          img(props) {
            return <img className="rounded-lg my-6 max-w-full" {...props} />;
          },
          // Style lists
          ul(props) {
            return <ul className="my-6 ml-6 list-disc" {...props} />;
          },
          ol(props) {
            return <ol className="my-6 ml-6 list-decimal" {...props} />;
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}