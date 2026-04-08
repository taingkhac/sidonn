'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamic import for ReactQuill to support SSR in Next.js
const QuillDynamic = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-40 w-full animate-pulse bg-slate-100 rounded-md" />,
})

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'link',
    'color',
    'background',
  ]

  const handleInternalChange = (content: string) => {
    // Only trigger onChange if content has actually changed from the prop value
    // This prevents infinite render loops between Quill and Parent State
    if (content !== value) {
      onChange(content)
    }
  }

  return (
    <div className="bg-white rounded-md border border-input min-h-[200px]">
      <QuillDynamic
        theme="snow"
        value={value}
        onChange={handleInternalChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Bắt đầu soạn thảo...'}
        className="h-full"
      />
      <style jsx global>{`
        .ql-container {
          min-height: 150px;
          font-size: 16px;
        }
        .ql-editor {
          min-height: 150px;
        }
        .ql-toolbar {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-radius: 0.375rem 0.375rem 0 0;
        }
      `}</style>
    </div>
  )
}
