import React from 'react';

interface TiptapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, any> }>;
}

interface TiptapJsonRendererProps {
  content: {
    type: 'doc';
    content: TiptapNode[];
  };
  className?: string;
}

const JsonContent: React.FC<TiptapJsonRendererProps> = ({ content, className = '' }) => {
  const renderNode = (node: TiptapNode, index: number): React.ReactNode => {
    // Recursively render child nodes, passing a unique key
    const children = node.content?.map((child, i) => renderNode(child, i));

    switch (node.type) {
      case 'paragraph':
        // FIX: Increased bottom margin for more space between paragraphs
        return (
          <p key={index} className="mb-6 text-black leading-relaxed">
            {children}
          </p>
        );

      case 'heading':
        const level = node.attrs?.level || 1;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        // FIX: Replaced custom theme classes with black/dark Tailwind classes
        const headingClasses = {
          1: "text-4xl font-bold mb-6 text-black",
          2: "text-3xl font-semibold mb-5 text-black",
          3: "text-2xl font-semibold mb-4 text-black"
        };
        
        return (
          <HeadingTag key={index} className={headingClasses[level as keyof typeof headingClasses]}>
            {children}
          </HeadingTag>
        );

      case 'bulletList':
        return (
          <ul key={index} className="list-disc list-inside mb-6 space-y-2 text-black">
            {children}
          </ul>
        );

      case 'orderedList':
        return (
          <ol key={index} className="list-decimal list-inside mb-6 space-y-2 text-black">
            {children}
          </ol>
        );

      case 'listItem':
        return (
          <li key={index} className="text-black list-style-none mx-0 px-0">{children}</li>
        );

      case 'blockquote':
        // FIX: Using black border, with gray background/text for contrast
        return (
          <blockquote key={index} className="border-l-4 border-black pl-6 py-2 mb-6 italic text-gray-700 bg-gray-100">
            {children}
          </blockquote>
        );

      case 'horizontalRule':
        // FIX: A standard <hr> with a black top border
        return (
          <hr key={index} className="my-8 border-t border-black" />
        );

      case 'hardBreak':
        // FIX: Using a single <br /> for a proper hard break
        return (<React.Fragment key={index}>
          <br />
          <br />
          </React.Fragment>);

      case 'image':
        return (
          <img
            key={index}
            src={node.attrs?.src}
            alt={node.attrs?.alt || ''}
            className="max-w-full h-auto my-6 rounded border border-black"
          />
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-black">
              <tbody>
                {children}
              </tbody>
            </table>
          </div>
        );

      case 'tableRow':
        return (
          <tr key={index} className="border-b border-black">
            {children}
          </tr>
        );

      case 'tableHeader':
        return (
          <th key={index} className="border border-black px-4 py-2 text-left font-semibold bg-gray-200 text-black">
            {children}
          </th>
        );

      case 'tableCell':
        return (
          <td key={index} className="border border-black px-4 py-2 text-black">
            {children}
          </td>
        );

      case 'youtube':
        const { src, width = 640, height = 480 } = node.attrs || {};
        return (
          <div key={index} className="my-6 flex justify-center">
            <div className="relative rounded overflow-hidden border border-black" style={{ maxWidth: width }}>
              <iframe
                src={src}
                width={width}
                height={height}
                frameBorder="0"
                allowFullScreen
                className="w-full"
              />
            </div>
          </div>
        );

      case 'text':
        const marks = node.marks || [];
        let textElement: React.ReactNode = node.text;

        marks.forEach(mark => {
          switch (mark.type) {
            case 'bold':
              textElement = <strong className="font-bold">{textElement}</strong>;
              break;
            case 'italic':
              textElement = <em className="italic">{textElement}</em>;
              break;
            case 'underline':
              textElement = <u className="underline">{textElement}</u>;
              break;
            case 'strike':
              textElement = <s className="line-through">{textElement}</s>;
              break;
            case 'code':
              textElement = (
                <code className="px-2 py-1 bg-gray-200 text-black rounded text-sm font-mono border border-gray-300">
                  {textElement}
                </code>
              );
              break;
          }
        });

        return textElement;

      default:
        // Using a Fragment to avoid adding extra divs for unknown node types.
        if (node.content) {
          return <React.Fragment key={index}>{children}</React.Fragment>;
        }
        return null;
    }
  };

  if (!content || !content.content) {
    return <div className="text-gray-500">No content to display</div>;
  }

  return (
    <div className={`max-w-none ${className}`}>
      {content.content.map(renderNode)}
    </div>
  );
};

export default JsonContent;