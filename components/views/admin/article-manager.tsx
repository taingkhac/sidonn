'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
      icon_name: 'Box'
    }
    setEditingItem(fresh)
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingItem) return
    const isNew = !editingItem.id

    const payload = {
      category: editingItem.category,
      slug: editingItem.slug,
      thumbnail_url: editingItem.thumbnail_url,
      icon_name: editingItem.icon_name,
      title_translations: editingItem.title_translations,
      desc_translations: editingItem.desc_translations,
      content_translations: editingItem.content_translations,
      features_translations: editingItem.features_translations,
      benefits_translations: editingItem.benefits_translations,
      applications_translations: editingItem.applications_translations
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
        [lang]: val
      }
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
            <Select value={category} onValueChange={(val) => { setCategory(val); setPage(1); }}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c.toUpperCase()}</SelectItem>)}
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
          <div className="p-8 text-center text-slate-500 border border-dashed">Chưa có bài viết nào trong danh mục này.</div>
        ) : (
          articles.map(art => (
            <div key={art.id} className="flex justify-between items-center bg-slate-50 p-4 border rounded shadow-sm">
              <div className="flex items-center gap-4">
                {art.thumbnail_url && <img src={art.thumbnail_url} className="w-16 h-16 object-cover rounded" />}
                <div>
                  <h4 className="font-bold">{art.title_translations['vi'] || art.title_translations['en'] || art.slug}</h4>
                  <p className="text-sm text-slate-500">Slug: {art.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(art)}><Edit2 className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(art.id)}><Trash2 className="w-4 h-4" /></Button>
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
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Đường dẫn sạch (Slug - Chuẩn SEO)</Label>
                  <Input 
                    value={editingItem.slug} 
                    onChange={e => {
                      const val = e.target.value
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "") // Remove accents
                        .replace(/đ/g, "d")
                        .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
                        .replace(/\s+/g, "-") // Spaces to dashes
                        .replace(/-+/g, "-"); // Double dashes to single
                      setEditingItem({...editingItem, slug: val})
                    }} 
                  />
                  <p className="text-[10px] text-slate-400">Ví dụ: kho-thong-minh-sidonn</p>
                </div>
                <div className="space-y-2">
                  <Label>Ảnh Thumbnail Cover</Label>
                  <ImageUploader value={editingItem.thumbnail_url || ''} onChange={val => setEditingItem({...editingItem, thumbnail_url: val})} />
                </div>
                <div className="space-y-2 border-l pl-6">
                  <Label>Tên Icon (từ Lucide, ví dụ: Bot, Package, Boxes, Factory, Plane, Ship)</Label>
                  <Input value={editingItem.icon_name || ''} onChange={e => setEditingItem({...editingItem, icon_name: e.target.value})} placeholder="Vd: Bot" />
                  <p className="text-[10px] text-slate-400">Xem tại lucide.dev/icons</p>
                </div>
              </div>

              {/* Ngôn ngữ tab (đơn giản hoá bằng cách liệt kê dọc theo từng field) */}
              <div className="space-y-6 pt-4 border-t">
                {LANGUAGES.map(lang => (
                  <div key={lang} className="p-4 border rounded bg-slate-50/50 space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded uppercase">{lang}</span>
                    </h4>
                    
                    <div className="space-y-1">
                      <Label>Tiêu đề</Label>
                      <Input value={editingItem.title_translations?.[lang] || ''} onChange={e => handleChange('title_translations', lang, e.target.value)} />
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Mô tả ngắn (Short description)</Label>
                      <Input value={editingItem.desc_translations?.[lang] || ''} onChange={e => handleChange('desc_translations', lang, e.target.value)} />
                    </div>

                    <div className="space-y-1">
                      <Label>Nội dung chi tiết (Rich Text Editor)</Label>
                      <RichTextEditor 
                        value={editingItem.content_translations?.[lang] || ''} 
                        onChange={val => handleChange('content_translations', lang, val)} 
                      />
                    </div>

                    {editingItem.category === 'solutions' && (
                      <div className="grid grid-cols-1 gap-4 pt-4 border-t border-dashed">
                         <div className="space-y-1">
                            <Label className="text-xs">Tính năng (Features) - Mỗi dòng 1 tính năng</Label>
                            <Textarea 
                              placeholder="Feature 1\nFeature 2..." 
                              value={Array.isArray(editingItem.features_translations?.[lang]) ? editingItem.features_translations?.[lang].join('\n') : ''}
                              onChange={e => handleChange('features_translations', lang, e.target.value.split('\n').filter(s => s.trim()))}
                            />
                         </div>
                         <div className="space-y-1">
                            <Label className="text-xs">Lợi ích (Benefits) - Mỗi dòng 1 lợi ích</Label>
                            <Textarea 
                              placeholder="Benefit 1\nBenefit 2..." 
                              value={Array.isArray(editingItem.benefits_translations?.[lang]) ? editingItem.benefits_translations?.[lang].join('\n') : ''}
                              onChange={e => handleChange('benefits_translations', lang, e.target.value.split('\n').filter(s => s.trim()))}
                            />
                         </div>
                         <div className="space-y-1">
                            <Label className="text-xs">Ứng dụng (Applications) - Phân cách bởi dấu phẩy</Label>
                            <Input 
                              placeholder="App 1, App 2..." 
                              value={Array.isArray(editingItem.applications_translations?.[lang]) ? editingItem.applications_translations?.[lang].join(', ') : ''}
                              onChange={e => handleChange('applications_translations', lang, e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            />
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button onClick={handleSave}>Lưu Bài viết</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
