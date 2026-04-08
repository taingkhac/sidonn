'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  value?: string // Existing URL
  onChange: (url: string) => void // Clear or update URL
  onFileSelect?: (file: File | null) => void // Emit the local file object
  bucket?: string
  accept?: string
}

export function ImageUploader({
  value,
  onChange,
  onFileSelect,
  bucket = 'media',
  accept = 'image/*,video/*',
}: ImageUploaderProps) {
  const [localPreview, setLocalPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a local blob URL for immediate preview
    const previewUrl = URL.createObjectURL(file)
    setLocalPreview(previewUrl)

    // Notify parent of the file selection
    if (onFileSelect) {
      onFileSelect(file)
    }

    // Clear any existing database URL since we have a new selection
    onChange('')
  }

  const handleRemove = () => {
    setLocalPreview(null)
    onChange('')
    if (onFileSelect) {
      onFileSelect(null)
    }
  }

  const displayUrl = localPreview || value

  return (
    <div className="space-y-4">
      {displayUrl ? (
        <div className="relative inline-block border rounded-lg p-2 bg-slate-50">
          <div className="relative">
            {displayUrl.match(/\.(mp4|webm|ogg)$/i) || displayUrl.startsWith('blob:') ? (
              // Note: blob urls might need special handling if they are videos,
              // but for now we assume video/image based on file type.
              displayUrl.startsWith('blob:') &&
              localPreview?.includes('video') ? ( // Simple heuristic
                <video src={displayUrl} className="max-h-40 rounded" controls muted />
              ) : (
                <img src={displayUrl} className="max-h-40 rounded object-contain" />
              )
            ) : (
              <img src={displayUrl} alt="Preview" className="max-h-40 rounded object-contain" />
            )}

            {localPreview && (
              <div className="absolute top-0 left-0 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-br font-bold">
                Mới (Chưa lưu)
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-primary" />
            <p className="text-sm text-gray-500 font-medium">Bấm vào đây để chọn file</p>
            <p className="text-[10px] text-gray-400 mt-1">File sẽ được tải lên khi bạn nhấn Lưu</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  )
}

