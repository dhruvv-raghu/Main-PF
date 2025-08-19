import React from "react";

// A helper component to dynamically render heading tags (h1, h2, etc.)
// This component takes a 'tag' string (like "h1") and renders its children within that HTML tag.
const DynamicHeadingTag = ({ tag, children, ...props }) => {
  const Tag = tag; // Assigns the string tag name to a variable for use as a component
  return <Tag {...props}>{children}</Tag>; // Renders the specified HTML tag with its props and children
};

// Main component to render Tiptap JSON content
const JsonContent = ({ content, className = "" }) => {
  // Recursively renders a single Tiptap node and its children
  const renderNode = (node, index) => {
    // Recursively render children nodes if they exist
    const children = node.content?.map((child, i) => renderNode(child, i));

    // Handle different node types based on Tiptap's schema
    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-6 text-white leading-relaxed text-lg text-center">
            {children}
          </p>
        );

      case "heading": {
        const level = node.attrs?.level ?? 1; // Get heading level, default to 1
        // Define Tailwind CSS classes for different heading levels
        const headingClasses = {
          1: "text-4xl font-bold mb-8 text-[#38aecc] text-center",
          2: "text-3xl font-semibold mb-6 text-[#38aecc] text-center",
          3: "text-2xl font-semibold mb-4 text-[#38aecc] text-center",
        };

        // Use the DynamicHeadingTag component to render the correct heading (h1, h2, etc.)
        return (
          <DynamicHeadingTag
            key={index}
            tag={`h${level}`} // Pass the dynamic tag name
            className={headingClasses[level] ?? ""} // Apply appropriate styling
          >
            {children}
          </DynamicHeadingTag>
        );
      }

      case "bulletList":
        return (
          <ul
            key={index}
            className="list-disc list-inside mb-6 space-y-2 text-white max-w-3xl mx-auto text-left"
          >
            {children}
          </ul>
        );

      case "orderedList":
        return (
          <ol
            key={index}
            className="list-decimal list-inside mb-6 space-y-2 text-white max-w-3xl mx-auto text-left"
          >
            {children}
          </ol>
        );

      case "listItem":
        return <li key={index}>{children}</li>;

      case "blockquote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-[#38aecc] pl-6 py-4 mb-8 italic bg-[#046e8f]/20 text-gray-200 rounded-lg max-w-3xl mx-auto"
          >
            {children}
          </blockquote>
        );

      case "horizontalRule":
        return <hr key={index} className="my-10 border-t border-[#046e8f]/60" />;

      case "hardBreak":
        return (
          // React.Fragment is used to group multiple elements without adding an extra DOM node
          <React.Fragment key={index}>
            <br />
            <br />
          </React.Fragment>
        );

      case "image":
        return (
          <div key={index} className="flex justify-center my-8">
            <img
              src={node.attrs?.src}
              alt={node.attrs?.alt || ""}
              className="max-w-full h-auto rounded-lg border border-[#046e8f]/50 shadow-md"
            />
          </div>
        );

      case "table":
        return (
          <div key={index} className="overflow-x-auto my-8 max-w-4xl mx-auto">
            <table className="w-full border-collapse border border-[#046e8f]/50">
              <tbody>{children}</tbody>
            </table>
          </div>
        );

      case "tableRow":
        return (
          <tr key={index} className="border-b border-[#046e8f]/50">
            {children}
          </tr>
        );

      case "tableHeader":
        return (
          <th
            key={index}
            className="border border-[#046e8f]/50 px-4 py-2 text-left font-semibold bg-[#183446] text-[#38aecc]"
          >
            {children}
          </th>
        );

      case "tableCell":
        return (
          <td key={index} className="border border-[#046e8f]/50 px-4 py-2 text-white">
            {children}
          </td>
        );

      case "youtube": {
        const { src, width = 640, height = 480 } = node.attrs || {};
        return (
          <div key={index} className="my-8 flex justify-center">
            <div
              className="relative rounded overflow-hidden border border-[#046e8f]/50 shadow-md"
              style={{ maxWidth: width }}
            >
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
      }

      case "text": {
        const marks = node.marks || [];
        let textElement = node.text; // Start with the raw text

        // Apply marks (bold, italic, etc.) in order
        marks.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              textElement = <strong className="font-bold">{textElement}</strong>;
              break;
            case "italic":
              textElement = <em className="italic">{textElement}</em>;
              break;
            case "underline":
              textElement = <u className="underline">{textElement}</u>;
              break;
            case "strike":
              textElement = <s className="line-through">{textElement}</s>;
              break;
            case "code":
              textElement = (
                <code className="px-2 py-1 bg-[#183446] text-[#38aecc] rounded text-sm font-mono border border-[#046e8f]/40">
                  {textElement}
                </code>
              );
              break;
          }
        });

        // Wrap the textElement in a span with a unique key.
        // This is crucial for React to correctly track elements in lists, even plain text.
        return <span key={`${node.type}-${index}`}>{textElement}</span>;
      }

      default:
        // If a node type is not specifically handled, render its children
        if (node.content) {
          return <React.Fragment key={index}>{children}</React.Fragment>;
        }
        return null; // If no content, render nothing
    }
  };

  // Display a message if no content is provided
  if (!content || !content.content) {
    return <div className="text-gray-400 text-center">No content to display</div>;
  }

  // Render the top-level content by mapping through the content array
  return <div className={`max-w-4xl mx-auto ${className}`}>{content.content.map(renderNode)}</div>;
};

export default JsonContent;
