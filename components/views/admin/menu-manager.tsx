'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Edit2, RefreshCw } from 'lucide-react'

export interface MenuData {
  id: string
  menu_type: string
  key: string
  view_target: string | null
  translations: Record<string, string>
  order_index: number
  parent_id: string | null
}

const LANGUAGES = ['en', 'vi', 'zh', 'ja', 'ko']

export function MenuManager() {
  const [menus, setMenus] = useState<MenuData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMenu, setEditingMenu] = useState<MenuData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchMenus = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('menus').select('*').order('order_index')
    if (error) {
      console.error('Lỗi khi tải Menu:', error)
    } else if (data) {
      setMenus(data as MenuData[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const handleEdit = (menu: MenuData) => {
    setEditingMenu(JSON.parse(JSON.stringify(menu))) // deep clone
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingMenu) return

    const { error } = await supabase
      .from('menus')
      .update({
        translations: editingMenu.translations,
        view_target: editingMenu.view_target,
        order_index: editingMenu.order_index,
      })
      .eq('id', editingMenu.id)

    if (error) {
      console.error('Lỗi khi cập nhật:', error)
      alert('Không thể lưu: ' + error.message)
    } else {
      setIsDialogOpen(false)
      fetchMenus()
    }
  }

  const handleTranslationChange = (lang: string, val: string) => {
    if (editingMenu) {
      setEditingMenu({
        ...editingMenu,
        translations: {
          ...editingMenu.translations,
          [lang]: val,
        },
      })
    }
  }

  if (loading && menus.length === 0) {
    return <div className="p-4 text-center">Đang tải cấu trúc Menu...</div>
  }

  // Nhóm menu theo menu_type để hiển thị
  const groupedMenus = menus.reduce((acc, curr) => {
    if (!acc[curr.menu_type]) acc[curr.menu_type] = []
    acc[curr.menu_type].push(curr)
    return acc
  }, {} as Record<string, MenuData[]>)

  return (
    <div className="bg-white border border-border p-8 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Menu (Đa ngôn ngữ)</h2>
        <Button onClick={fetchMenus} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" /> Làm mới
        </Button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedMenus).map(([groupType, groupItems]) => (
          <div key={groupType} className="border rounded-md p-4 bg-slate-50">
            <h3 className="font-semibold text-lg capitalize mb-4 text-slate-800 border-b pb-2">
              Group: {groupType}
            </h3>
            <div className="space-y-2">
              {groupItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 border rounded shadow-sm">
                  <div>
                    <div className="font-medium text-slate-900">{item.translations?.['en'] || item.key}</div>
                    <div className="text-sm text-slate-500">
                      Key: {item.key} | Tiếng Việt: {item.translations?.['vi']} | View: {item.view_target || '(Danh mục)'}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                    <Edit2 className="h-4 w-4 mr-2" /> Sửa bản dịch
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sửa Menu: {editingMenu?.key}</DialogTitle>
          </DialogHeader>
          {editingMenu && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>View Target (Routes)</Label>
                  <Input 
                    value={editingMenu.view_target || ''} 
                    onChange={(e) => setEditingMenu({ ...editingMenu, view_target: e.target.value })} 
                    placeholder="e.g. about"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Thứ tự hiển thị (Order)</Label>
                  <Input 
                    type="number"
                    value={editingMenu.order_index} 
                    onChange={(e) => setEditingMenu({ ...editingMenu, order_index: parseInt(e.target.value) || 0 })} 
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-4">Các bản dịch (Translations)</h4>
                <div className="space-y-3">
                  {LANGUAGES.map(lang => (
                    <div key={lang} className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right uppercase font-bold text-slate-500">{lang}</Label>
                      <Input 
                        className="col-span-3"
                        value={editingMenu.translations?.[lang] || ''}
                        onChange={(e) => handleTranslationChange(lang, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button onClick={handleSave}>Lưu thay đổi</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
