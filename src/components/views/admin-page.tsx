import {
  ArrowLeft,
  Users,
  FileText,
  Settings,
  BarChart3,
  Database,
  LayoutDashboard,
  Menu as MenuIcon,
  Type,
  FileEdit,
  Lock,
  Mail,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { MenuManager } from '@/components/views/admin/menu-manager'
import { ContentManager } from '@/components/views/admin/content-manager'
import { ArticleManager } from '@/components/views/admin/article-manager'
import { LeadsManager } from '@/components/views/admin/leads-manager'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AdminPageProps {
  onNavigate: (view: string) => void
}

type AdminTab = 'dashboard' | 'menus' | 'content' | 'articles' | 'leads'

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [dbStatus, setDbStatus] = useState<string>('Checking...')
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  // Stats state
  const [statsData, setStatsData] = useState({
    articles: 0,
    blocks: 0,
    menus: 0,
    leads: 0,
  })

  useEffect(() => {
    async function checkSupabase() {
      try {
        const { error } = await supabase.from('menus').select('id').limit(1)
        if (error) {
          if (error.code === '42P01') setDbStatus('Connected (Please Run SQL)')
          else setDbStatus('Error: ' + (error.message || error.code))
        } else {
          setDbStatus('Connected')
          fetchStats()
        }
      } catch (err: any) {
        setDbStatus('Connection Failed')
      }
    }

    async function fetchStats() {
      try {
        const [
          { count: artCount },
          { count: blockCount },
          { count: menuCount },
          { count: leadCount },
        ] = await Promise.all([
          supabase.from('articles').select('*', { count: 'exact', head: true }),
          supabase.from('content_blocks').select('*', { count: 'exact', head: true }),
          supabase.from('menus').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }),
        ])
        setStatsData({
          articles: artCount || 0,
          blocks: blockCount || 0,
          menus: menuCount || 0,
          leads: leadCount || 0,
        })
      } catch (err) {
        console.error('Stats fetch error:', err)
      }
    }

    checkSupabase()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === '1234') {
      // Mã PIN mặc định, bạn có thể đổi thành biến môi trường
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mã PIN không chính xác!')
      setPin('')
    }
  }

  const stats = [
    { label: 'Bài viết (Articles)', value: statsData.articles.toString(), icon: FileText },
    { label: 'Nội dung (Blocks)', value: statsData.blocks.toString(), icon: Type },
    { label: 'Menu Items', value: statsData.menus.toString(), icon: MenuIcon },
    { label: 'Liên hệ (Leads)', value: statsData.leads.toString(), icon: Mail },
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menus', label: 'Menu Navigation', icon: MenuIcon },
    { id: 'content', label: 'Page Content (CMS)', icon: Type },
    { id: 'articles', label: 'Articles & Solutions', icon: FileEdit },
    { id: 'leads', label: 'Khách hàng (Leads)', icon: Mail },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Yêu cầu truy cập</h2>
          <p className="text-slate-500 mb-8">Vui lòng nhập mã PIN để vào trang quản trị Sidonn.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Nhập mã PIN"
              className="text-center text-2xl tracking-[1em]"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <Button type="submit" className="w-full h-12 text-lg">
              Đăng nhập
            </Button>
          </form>

          <button
            onClick={() => onNavigate('home')}
            className="mt-6 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">Sidonn Admin</h2>
          <p className="text-xs text-slate-400 mt-1">Nền tảng quản trị nội dung</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium',
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800',
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shrink-0">
          <h1 className="text-lg font-semibold text-slate-800 capitalize">
            {menuItems.find((m) => m.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                dbStatus === 'Connected' ? 'bg-emerald-500' : 'bg-red-500',
              )}
            />
            <span className="text-xs font-medium text-slate-500">Supabase: {dbStatus}</span>
          </div>
        </header>

        <div className="p-8 pb-16">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {stat.label}
                          </p>
                          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Recent Activity & Welcome */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">Tổng quan hệ thống</h2>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Trang web hiện đang chạy với các Module chính đã được kết nối cơ sở dữ liệu.
                      Số lượng bài viết và khối nội dung được thống kê trực tiếp từ bảng lưu trữ
                      Supabase.
                    </p>
                    <div className="p-4 bg-slate-50 rounded italic text-xs text-slate-500">
                      Lưu ý: Mọi thay đổi về slug bài viết sẽ ảnh hưởng trực tiếp đến URL SEO của
                      trang client.
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Chào mừng trở lại! 👋</h2>
                  <p className="text-slate-600 mb-6">
                    Mọi thứ đang hoạt động ổn định. Bạn có thể bắt đầu quản trị các nội dung cho
                    website Sidonn ngay bây giờ.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveTab('content')}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md hover:bg-primary/90 transition-all"
                    >
                      Sửa trang chủ
                    </button>
                    <button
                      onClick={() => setActiveTab('articles')}
                      className="px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all"
                    >
                      Viết bài mới
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menus' && <MenuManager />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'articles' && <ArticleManager />}
          {activeTab === 'leads' && <LeadsManager />}
        </div>
      </main>
    </div>
  )
}
