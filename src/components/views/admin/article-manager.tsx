'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileText, Plus, Edit2, Trash2 } from 'lucide-react'
import { ImageUploader } from '@/components/image-uploader'
import { RichTextEditor } from '@/components/rich-text-editor'

interface ArticleData {
  id: string
  category: string
  slug: string
  thumbnail_url: string | null
  icon_name: string | null
  title_translations: Record<string, string>
  desc_translations: Record<string, string>
  content_translations: Record<string, string>
  features_translations: Record<string, any>
  benefits_translations: Record<string, any>
  applications_translations: Record<string, any>
}

const LANGUAGES = ['en', 'vi', 'zh', 'ja', 'ko']
const CATEGORIES = ['solutions', 'products', 'news', 'career']

export function ArticleManager() {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<string>('solutions')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 10

  const [editingItem, setEditingItem] = useState<ArticleData | null>(null)
  const [pendingThumbnailFile, setPendingThumbnailFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeLang, setActiveLang] = useState<string>('en')

  const fetchArticles = async (cat: string, p: number) => {
    setLoading(true)
    const from = (p - 1) * pageSize
    const to = from + pageSize - 1

    const { data, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('category', cat)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (data) setArticles(data)
    if (count !== null) setTotalCount(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchArticles(category, page)
  }, [category, page])

  const handleEdit = (item: ArticleData) => {
    const safeItem = {
      ...item,
      title_translations: item.title_translations || {},
      desc_translations: item.desc_translations || {},
      content_translations: item.content_translations || {},
      features_translations: item.features_translations || {},
      benefits_translations: item.benefits_translations || {},
      applications_translations: item.applications_translations || {},
    }
    setEditingItem(JSON.parse(JSON.stringify(safeItem)))
    setPendingThumbnailFile(null)
    setIsDialogOpen(true)
  }

  const handleCreateNew = () => {
    const fresh: ArticleData = {
      id: '', // Empty means new
      category,
      slug: 'new-article-' + Date.now(),
      thumbnail_url: '',
      title_translations: {},
      desc_translations: {},
      content_translations: {},
      features_translations: {},
      benefits_translations: {},
      applications_translations: {},
      icon_name: 'Box',
    }
    setEditingItem(fresh)
    setPendingThumbnailFile(null)
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingItem) return
    const isNew = !editingItem.id
    let finalThumbnailUrl = editingItem.thumbnail_url

    // Nếu có file đang chờ upload, thực hiện upload ngay bây giờ
    if (pendingThumbnailFile) {
      try {
        console.log('[Saver] Uploading pending file:', pendingThumbnailFile.name)
        const fileExt = pendingThumbnailFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, pendingThumbnailFile)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from('media').getPublicUrl(filePath)
        finalThumbnailUrl = publicUrl
        console.log('[Saver] Upload successful! URL:', publicUrl)
      } catch (err: any) {
        alert('Lỗi upload ảnh: ' + err.message)
        return
      }
    }

    const payload = {
      category: editingItem.category,
      slug: editingItem.slug,
      thumbnail_url: finalThumbnailUrl,
      icon_name: editingItem.icon_name,
      title_translations: editingItem.title_translations,
      desc_translations: editingItem.desc_translations,
      content_translations: editingItem.content_translations,
      features_translations: editingItem.features_translations,
      benefits_translations: editingItem.benefits_translations,
      applications_translations: editingItem.applications_translations,
    }

    let response
    if (isNew) {
      response = await supabase.from('articles').insert([payload])
    } else {
      response = await supabase.from('articles').update(payload).eq('id', editingItem.id)
    }

    if (response.error) {
      alert('Lỗi:' + response.error.message)
    } else {
      setIsDialogOpen(false)
      fetchArticles(category, page)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa bài này?')) {
      await supabase.from('articles').delete().eq('id', id)
      fetchArticles(category, page)
    }
  }

  const handleChange = (field: keyof ArticleData, lang: string, val: any) => {
    if (!editingItem) return

    // Check if the value is actually different to prevent infinite re-renders
    const currentVal = (editingItem[field] as any)?.[lang]
    if (currentVal === val) return

    setEditingItem({
      ...editingItem,
      [field]: {
        ...(editingItem[field] as any),
        [lang]: val,
      },
    })
  }

  return (
    <div className="bg-white border border-border p-8 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" /> Quản lý Bài viết (Articles)
          </h2>
          <p className="text-sm text-slate-500">Thêm tin tức, giải pháp, chi tiết sản phẩm.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap">Danh mục:</Label>
            <Select
              value={category}
              onValueChange={(val) => {
                setCategory(val)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateNew} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" /> Tạo mới
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Đang tải...</p>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-slate-500 border border-dashed">
            Chưa có bài viết nào trong danh mục này.
          </div>
        ) : (
          articles.map((art) => (
            <div
              key={art.id}
              className="flex justify-between items-center bg-slate-50 p-4 border rounded shadow-sm"
            >
              <div className="flex items-center gap-4">
                {art.thumbnail_url && (
                  <img src={art.thumbnail_url} className="w-16 h-16 object-cover rounded" />
                )}
                <div>
                  <h4 className="font-bold">
                    {art.title_translations['vi'] || art.title_translations['en'] || art.slug}
                  </h4>
                  <p className="text-sm text-slate-500">Slug: {art.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(art)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(art.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination UI */}
      {!loading && articles.length > 0 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <p className="text-sm text-slate-500">
            Hiển thị {articles.length} / {totalCount} bài viết
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Trang trước
            </Button>
            <div className="flex items-center px-4 text-sm font-medium">
              Trang {page} / {Math.ceil(totalCount / pageSize)}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= Math.ceil(totalCount / pageSize)}
              onClick={() => setPage(page + 1)}
            >
              Trang sau
            </Button>
          </div>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? 'Sửa bài viết' : 'Tạo bài viết mới'}</DialogTitle>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-6">
              {/* Global Settings Section */}
              <div className="bg-slate-50 p-6 rounded-xl border border-border space-y-6">
                <h3 className="font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Thông tin chung (Global Settings)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">
                        Đường dẫn sạch (Slug - Chuẩn SEO)
                      </Label>
                      <Input
                        className="bg-white"
                        value={editingItem.slug}
                        onChange={(e) => {
                          const val = e.target.value
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '') // Remove accents
                            .replace(/đ/g, 'd')
                            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
                            .replace(/\s+/g, '-') // Spaces to dashes
                            .replace(/-+/g, '-') // Double dashes to single
                          setEditingItem({ ...editingItem, slug: val })
                        }}
                      />
                      <p className="text-[10px] text-slate-400">Ví dụ: kho-thong-minh-sidonn</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Tên Icon (Lucide)</Label>
                      <Input
                        className="bg-white"
                        value={editingItem.icon_name || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, icon_name: e.target.value })
                        }
                        placeholder="Vd: Bot, Box, Package"
                      />
                      <p className="text-[10px] text-slate-400">Xem tại lucide.dev/icons</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Ảnh Thumbnail / Cover</Label>
                    <ImageUploader
                      value={editingItem.thumbnail_url || ''}
                      onChange={(val) => setEditingItem({ ...editingItem, thumbnail_url: val })}
                      onFileSelect={(file) => setPendingThumbnailFile(file)}
                    />
                  </div>
                </div>
              </div>

              {/* Language Selection Tabs */}
              <div className="space-y-6">
                <div className="flex border-b border-border overflow-x-auto scrollbar-hide no-scrollbar whitespace-nowrap">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLang(lang)}
                      className={`px-6 py-3 text-sm font-bold transition-all relative flex-shrink-0 ${
                        activeLang === lang
                          ? 'text-primary'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {lang.toUpperCase()}
                      {activeLang === lang && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected Language Content Editor */}
                <div className="p-6 border rounded-xl bg-white shadow-sm space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      {activeLang}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">Nội dung chi tiết</h4>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Tiêu đề (Title)</Label>
                    <Input
                      value={editingItem.title_translations?.[activeLang] || ''}
                      onChange={(e) => handleChange('title_translations', activeLang, e.target.value)}
                      placeholder={`Tiêu đề bằng tiếng ${activeLang.toUpperCase()}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Mô tả ngắn (Description)</Label>
                    <Input
                      value={editingItem.desc_translations?.[activeLang] || ''}
                      onChange={(e) => handleChange('desc_translations', activeLang, e.target.value)}
                      placeholder="Mô tả tóm tắt cho bài viết"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Nội dung (Content)</Label>
                    <RichTextEditor
                      value={editingItem.content_translations?.[activeLang] || ''}
                      onChange={(val) => handleChange('content_translations', activeLang, val)}
                    />
                  </div>

                  {editingItem.category === 'solutions' && (
                    <div className="grid grid-cols-1 gap-6 pt-6 border-t border-dashed">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">
                          Tính năng (Features) - Mỗi dòng 1 tính năng
                        </Label>
                        <Textarea
                          className="min-h-[100px]"
                          placeholder="Tính năng 1\nTính năng 2..."
                          value={
                            Array.isArray(editingItem.features_translations?.[activeLang])
                              ? editingItem.features_translations?.[activeLang].join('\n')
                              : ''
                          }
                          onChange={(e) =>
                            handleChange(
                              'features_translations',
                              activeLang,
                              e.target.value.split('\n').filter((s) => s.trim()),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">
                          Lợi ích (Benefits) - Mỗi dòng 1 lợi ích
                        </Label>
                        <Textarea
                          className="min-h-[100px]"
                          placeholder="Lợi ích 1\nLợi ích 2..."
                          value={
                            Array.isArray(editingItem.benefits_translations?.[activeLang])
                              ? editingItem.benefits_translations?.[activeLang].join('\n')
                              : ''
                          }
                          onChange={(e) =>
                            handleChange(
                              'benefits_translations',
                              activeLang,
                              e.target.value.split('\n').filter((s) => s.trim()),
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4 z-10 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSave} className="px-8 shadow-lg shadow-primary/20">
                  Lưu Bài viết
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
