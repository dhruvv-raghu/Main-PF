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
import { ChevronDown, Save, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
        {/* Text Formatting Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${
                activeStates.bold ||
                activeStates.italic ||
                activeStates.underline ||
                activeStates.strike
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
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

        {/* Headings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${
                activeStates.heading1 || activeStates.heading2 || activeStates.heading3
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
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

        {/* Lists Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${
                activeStates.bulletList || activeStates.orderedList
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
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

        {/* Blocks Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center gap-1 ${
                activeStates.code || activeStates.blockquote
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
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

        {/* Insert Dropdown */}
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

        {/* Table Dropdown */}
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

// NAMED EXPORT for the Navbar - Updated to match your design
export function BlogNavbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-black w-full">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <div>
              <span className="text-yellow-300 text-2xl font-bold tracking-wider">[Watchr]</span>
              <span className="block text-yellow-300 text-2xl font-bold tracking-wider">
                A Dhruvv Raghu Project
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog">
              <button className="text-yellow-300 hover:text-yellow-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                View Blog
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// DEFAULT EXPORT is now the enhanced editor component with post creation
export default function Tiptap() {
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

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
    content: `<h1>Welcome to the Blog Editor!</h1><p>Start writing your blog post here. Use the toolbar above to format your content, add images, videos, and more.</p>`,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl min-h-[500px] focus:outline-none p-4 w-full',
      },
    },
  });

  const handleSavePost = async () => {
    if (!title.trim() || !editor?.getHTML()) {
      setSaveStatus('Please enter a title and content');
      return;
    }

    setIsSaving(true);
    setSaveStatus('');

    try {
      console.log(editor.getJSON());
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: editor.getJSON(),
        }),
      });

      if (response.ok) {
        setSaveStatus('Post saved successfully!');
        setTitle('');
        editor?.commands.setContent(
          '<h1>Welcome to the Blog Editor!</h1><p>Start writing your next blog post here.</p>'
        );
        setIsPublishDialogOpen(false);
      } else {
        setSaveStatus('Failed to save post');
      }
    } catch (error) {
      setSaveStatus('Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-4">
      {/* Post Title Input */}
      <div className="bg-white border border-black rounded-lg p-4">
        <Input
          type="text"
          placeholder="Enter your blog post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-none p-0 focus-visible:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Editor */}
      <div className="border border-black rounded-lg overflow-hidden shadow-sm bg-white">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      {/* Save Controls */}
      <div className="flex items-center justify-between bg-white border border-black rounded-lg p-4">
        <div className="flex items-center gap-4">
          {saveStatus && (
            <Alert
              className={`${saveStatus.includes('successfully') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
            >
              <AlertDescription
                className={saveStatus.includes('successfully') ? 'text-green-800' : 'text-red-800'}
              >
                {saveStatus.includes('successfully') && (
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                )}
                {saveStatus}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Publish Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish Blog Post</DialogTitle>
              <DialogDescription>
                Are you ready to publish this post? Make sure you've reviewed the title and content.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Post Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsPublishDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePost}
                  disabled={isSaving || !title.trim()}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {isSaving ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
