'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import Gapcursor from '@tiptap/extension-gapcursor';
import Youtube from '@tiptap/extension-youtube';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import './styles.scss';

// Modal for Image URL
function ImageUrlPrompt({ onConfirm, onCancel }) {
  const [url, setUrl] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Enter Image URL</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
          placeholder="https://example.com/image.png"
          onKeyDown={(e) => e.key === 'Enter' && onConfirm(url)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(url)} className="bg-black text-white">
            Add Image
          </Button>
        </div>
      </div>
    </div>
  );
}

// Modal for YouTube Video
function YoutubeUrlPrompt({ onConfirm, onCancel }) {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(480);

  const handleSubmit = () => {
    if (url) {
      onConfirm({
        url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Embed YouTube Video</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
          placeholder="Enter YouTube URL"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
            className="border border-gray-300 rounded-md w-full p-2"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-black text-white">
            Add Video
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MenuBar({ editor }) {
  const [activeStates, setActiveStates] = useState({});
  const [isImagePromptOpen, setIsImagePromptOpen] = useState(false);
  const [isYoutubePromptOpen, setIsYoutubePromptOpen] = useState(false);
  const [isTableFocused, setIsTableFocused] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const updateStates = () => {
      setActiveStates({
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        strike: editor.isActive('strike'),
        code: editor.isActive('code'),
        blockquote: editor.isActive('blockquote'),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        heading1: editor.isActive('heading', { level: 1 }),
        heading2: editor.isActive('heading', { level: 2 }),
        heading3: editor.isActive('heading', { level: 3 }),
      });
      setIsTableFocused(editor.can().deleteTable());
    };

    editor.on('transaction', updateStates);
    editor.on('selectionUpdate', updateStates);

    return () => {
      editor.off('transaction', updateStates);
      editor.off('selectionUpdate', updateStates);
    };
  }, [editor]);

  const addImage = useCallback(
    (url) => {
      if (url) editor.chain().focus().setImage({ src: url }).run();
      setIsImagePromptOpen(false);
    },
    [editor]
  );

  const addYoutubeVideo = useCallback(
    ({ url, width, height }) => {
      if (url) editor.chain().focus().setYoutubeVideo({ src: url, width, height }).run();
      setIsYoutubePromptOpen(false);
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <>
      {isImagePromptOpen && (
        <ImageUrlPrompt onConfirm={addImage} onCancel={() => setIsImagePromptOpen(false)} />
      )}
      {isYoutubePromptOpen && (
        <YoutubeUrlPrompt
          onConfirm={addYoutubeVideo}
          onCancel={() => setIsYoutubePromptOpen(false)}
        />
      )}
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2">
        {/* Dropdown menus for the editor toolbar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${activeStates.bold || activeStates.italic || activeStates.underline || activeStates.strike ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              Text Formatting <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`cursor-pointer ${activeStates.bold ? 'bg-black text-white' : ''}`}
            >
              Bold {activeStates.bold && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`cursor-pointer ${activeStates.italic ? 'bg-black text-white' : ''}`}
            >
              Italic {activeStates.italic && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`cursor-pointer ${activeStates.underline ? 'bg-black text-white' : ''}`}
            >
              Underline {activeStates.underline && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`cursor-pointer ${activeStates.strike ? 'bg-black text-white' : ''}`}
            >
              Strikethrough {activeStates.strike && '✓'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${activeStates.heading1 || activeStates.heading2 || activeStates.heading3 ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              Headings <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`cursor-pointer ${activeStates.heading1 ? 'bg-black text-white' : ''}`}
            >
              H1 {activeStates.heading1 && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`cursor-pointer ${activeStates.heading2 ? 'bg-black text-white' : ''}`}
            >
              H2 {activeStates.heading2 && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`cursor-pointer ${activeStates.heading3 ? 'bg-black text-white' : ''}`}
            >
              H3 {activeStates.heading3 && '✓'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${activeStates.bulletList || activeStates.orderedList ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              Lists <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`cursor-pointer ${activeStates.bulletList ? 'bg-black text-white' : ''}`}
            >
              Bullet List {activeStates.bulletList && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`cursor-pointer ${activeStates.orderedList ? 'bg-black text-white' : ''}`}
            >
              Numbered List {activeStates.orderedList && '✓'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${activeStates.code || activeStates.blockquote ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              Blocks <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`cursor-pointer ${activeStates.code ? 'bg-black text-white' : ''}`}
            >
              Inline Code {activeStates.code && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`cursor-pointer ${activeStates.blockquote ? 'bg-black text-white' : ''}`}
            >
              Quote Block {activeStates.blockquote && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Horizontal Rule
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setHardBreak().run()}>
              Hard Break
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 bg-white text-black hover:bg-gray-100"
            >
              Insert <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsImagePromptOpen(true)}>
              Add Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsYoutubePromptOpen(true)}>
              Add YouTube Video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 bg-white text-black hover:bg-gray-100"
            >
              Table <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
              }
            >
              Insert Table
            </DropdownMenuItem>
            <div className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              disabled={!isTableFocused}
            >
              Add Column Before
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              disabled={!isTableFocused}
            >
              Add Column After
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteColumn().run()}
              disabled={!isTableFocused}
            >
              Delete Column
            </DropdownMenuItem>
            <div className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addRowBefore().run()}
              disabled={!isTableFocused}
            >
              Add Row Before
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addRowAfter().run()}
              disabled={!isTableFocused}
            >
              Add Row After
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteRow().run()}
              disabled={!isTableFocused}
            >
              Delete Row
            </DropdownMenuItem>
            <div className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
              disabled={!isTableFocused}
            >
              Merge/Split Cell
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
              disabled={!isTableFocused}
            >
              Toggle Header Row
            </DropdownMenuItem>
            <div className="my-1 h-px bg-gray-200" />
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteTable().run()}
              disabled={!isTableFocused}
            >
              Delete Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

// NAMED EXPORT for the Navbar
export function BlogNavbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-black w-full h-20">
      <div className="container mx-auto px-6 md:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/">
            <div>
              <span className="text-yellow-300 text-2xl font-bold tracking-wider">[Watchr]</span>
              <span className="block text-yellow-300 text-2xl font-bold tracking-wider">
                A Dhruvv Raghu Project
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// DEFAULT EXPORT is now just the editor component itself
export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        horizontalRule: false,
      }),
      Underline,
      HardBreak,
      HorizontalRule,
      Image,
      Dropcursor,
      Gapcursor,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ nocookie: true, controls: false }),
    ],
    content: `<h1>Welcome!</h1><p>This editor is now structured correctly. It starts below the main title and will only grow downwards as you type more content.</p><img src="https://placehold.co/1200x600/9333ea/white?text=This+Image+is+Centered" />`,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl min-h-[500px] focus:outline-none p-4 w-full',
      },
    },
  });

  // The component now only returns the editor box, not the whole page layout.
  return (
    <div className="border border-black rounded-lg overflow-hidden shadow-sm bg-white w-full max-w-4xl">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
