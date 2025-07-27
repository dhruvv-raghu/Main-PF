'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar' 

export default function Tiptap() {
  const editor = useEditor({
    element: null,
    extensions: [StarterKit],
    content: '<p>Hello World! </p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 px-3 py-2",
      },
    },
  })

  return (
    <div>
      <MenuBar editor={editor} />    
      <EditorContent editor={editor} />
    </div>
  )
}
