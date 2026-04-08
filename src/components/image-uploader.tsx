'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  bucket?: string
  accept?: string
}

export function ImageUploader({
  value,
  onChange,
  bucket = 'media',
  accept = 'image/*,video/*',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file) return

      // Tạo tên file ngẫu nhiên để tránh trùng
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Lấy public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (error: any) {
      alert('Lỗi upload file: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative inline-block border rounded-lg p-2 bg-slate-50">
          {value.match(/\.(mp4|webm|ogg)$/i) ? (
            <video src={value} className="max-h-40 rounded" controls muted />
          ) : (
            <img src={value} alt="Preview" className="max-h-40 rounded object-contain" />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-primary" />
                <p className="text-sm text-gray-500 font-medium">Bấm vào đây để tải file lên</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  )
}
