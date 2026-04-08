'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Building2, Trash2, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  message: string
  status: string
  created_at: string
}

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setLeads(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const deleteLead = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) return
    const { error } = await supabase.from('leads').delete().eq('id', id)
    if (!error) {
      setLeads(leads.filter((l) => l.id !== id))
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id)

    if (!error) {
      setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)))
    }
  }

  if (loading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Liên hệ (Leads)</h2>
          <p className="text-muted-foreground text-sm">
            Xem và quản lý thông tin khách hàng để lại từ website.
          </p>
        </div>
        <Button onClick={fetchLeads} variant="outline" size="sm">
          Làm mới
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[200px]">Khách hàng</TableHead>
              <TableHead>Thông tin liên hệ</TableHead>
              <TableHead>Lời nhắn</TableHead>
              <TableHead>Ngày gửi</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                  Chưa có liên hệ nào được gửi.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="align-top">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    {lead.company && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <Building2 className="h-3 w-3" />
                        {lead.company}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-3.5 w-3.5" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-3.5 w-3.5" />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="align-top max-w-[300px]">
                    <p className="text-sm text-slate-600 line-clamp-3" title={lead.message}>
                      {lead.message}
                    </p>
                  </TableCell>
                  <TableCell className="align-top whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm')}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={cn(
                        'text-[10px] uppercase font-bold py-1 px-2 rounded border border-transparent focus:border-primary focus:outline-none transition-colors',
                        lead.status === 'new'
                          ? 'bg-blue-50 text-blue-600'
                          : lead.status === 'contacted'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-emerald-50 text-emerald-600',
                      )}
                    >
                      <option value="new">Mới</option>
                      <option value="contacted">Đã phản hồi</option>
                      <option value="resolved">Hoàn thành</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right align-top">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => deleteLead(lead.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
