'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, Edit2, Save, X, Type, Layout, Globe, FileText } from 'lucide-react'
import { RichTextEditor } from '@/components/rich-text-editor'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ContentBlock {
  id: string
  view_target: string
  block_key: string
  content_type: string
  translations: Record<string, string>
}

const LANGUAGES = ['en', 'vi', 'zh', 'ja', 'ko']
const VIEW_TARGETS = ['shared', 'home', 'about', 'career', 'contact', 'legal']

export function ContentManager() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterTarget, setFilterTarget] = useState<string>('all')

  const [editingItem, setEditingItem] = useState<ContentBlock | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchBlocks = async () => {
    setLoading(true)
    let query = supabase.from('content_blocks').select('*').order('view_target').order('block_key')

    const { data } = await query
    if (data) setBlocks(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchBlocks()
  }, [])

  const handleEdit = (block: ContentBlock) => {
    setEditingItem(JSON.parse(JSON.stringify(block)))
    setIsDialogOpen(true)
  }

  const handleCreateNew = () => {
    const fresh: Partial<ContentBlock> = {
      view_target: 'shared',
      block_key: '',
      content_type: 'text',
      translations: { en: '', vi: '', zh: '', ja: '', ko: '' },
    }
    setEditingItem(fresh as ContentBlock)
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingItem) return

    const { id, ...payload } = editingItem
    let response

    if (id) {
      response = await supabase.from('content_blocks').update(payload).eq('id', id)
    } else {
      response = await supabase.from('content_blocks').insert(payload)
    }

    if (response.error) {
      alert('Lỗi: ' + response.error.message)
    } else {
      setIsDialogOpen(false)
      fetchBlocks()
    }
  }

  const filtered = blocks.filter((b) => {
    const matchesSearch =
      b.block_key.toLowerCase().includes(search.toLowerCase()) ||
      JSON.stringify(b.translations).toLowerCase().includes(search.toLowerCase())
    const matchesTarget = filterTarget === 'all' || b.view_target === filterTarget
    return matchesSearch && matchesTarget
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo Key hoặc Nội dung..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filterTarget} onValueChange={setFilterTarget}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theo trang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trang</SelectItem>
              {VIEW_TARGETS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Thêm Nhãn mới
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12">Đang tải dữ liệu...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 border-2 border-dashed rounded-lg">
            Không tìm thấy nội dung nào.
          </div>
        ) : (
          filtered.map((block) => (
            <div
              key={block.id}
              className="bg-white p-4 rounded-xl border group hover:border-primary/50 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Layout className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {block.view_target}
                    </span>
                  </div>
                  <h3 className="font-mono text-sm font-bold text-slate-900">{block.block_key}</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                    {LANGUAGES.slice(0, 2).map((lang) => (
                      <div key={lang} className="text-sm flex gap-2">
                        <span className="text-slate-400 font-bold uppercase w-6">{lang}:</span>
                        <span className="text-slate-600 line-clamp-1 italic">
                          {block.translations[lang] || (
                            <span className="text-red-300">Chưa dịch</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(block)}
                  className="opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Edit2 className="h-4 w-4 text-slate-600" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dialog Edit Content Block */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {editingItem?.id ? 'Chỉnh sửa Nhãn' : 'Thêm Nhãn mới'}
            </DialogTitle>
          </DialogHeader>

          {editingItem && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Trang hiển thị</Label>
                  <Select
                    value={editingItem.view_target}
                    onValueChange={(val) => setEditingItem({ ...editingItem, view_target: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VIEW_TARGETS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Loại nội dung</Label>
                  <Select
                    value={editingItem.content_type}
                    onValueChange={(val) => setEditingItem({ ...editingItem, content_type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Chữ thường (Text)</SelectItem>
                      <SelectItem value="rich-text">Văn bản định dạng (HTML)</SelectItem>
                      <SelectItem value="image_url">Đường dẫn Ảnh (Image URL)</SelectItem>
                      <SelectItem value="video_url">Đường dẫn Video (Video URL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Key identifier (Dùng trong Code)</Label>
                <Input
                  placeholder="e.g. hero_title"
                  className="font-mono text-primary font-bold"
                  value={editingItem.block_key}
                  onChange={(e) => setEditingItem({ ...editingItem, block_key: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base">Bản dịch nội dung</Label>
                {LANGUAGES.map((lang) => (
                  <div key={lang} className="space-y-2 p-3 bg-slate-50 rounded-lg border">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-slate-200 px-2 py-0.5 rounded uppercase">
                        {lang}
                      </span>
                    </div>
                    {editingItem.content_type === 'rich-text' ? (
                      <RichTextEditor
                        value={editingItem.translations[lang] || ''}
                        onChange={(val) =>
                          setEditingItem({
                            ...editingItem,
                            translations: { ...editingItem.translations, [lang]: val },
                          })
                        }
                      />
                    ) : (
                      <Textarea
                        placeholder={`Nội dung tiếng ${lang}...`}
                        value={editingItem.translations[lang] || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            translations: { ...editingItem.translations, [lang]: e.target.value },
                          })
                        }
                        className="bg-white min-h-[60px]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" /> Hủy
            </Button>
            <Button onClick={handleSave} className="bg-primary">
              <Save className="h-4 w-4 mr-2" /> Lưu Nhãn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
