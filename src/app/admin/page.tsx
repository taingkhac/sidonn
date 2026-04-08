'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AdminPage } from '@/components/views/admin-page'

export default function AdminRoute() {
  const router = useRouter()

  const handleNavigate = (view: string) => {
    // Nếu điều hướng về home, chuyển qua path "/"
    if (view === 'home') {
      router.push('/')
    } else {
      // Vì hiện tại dashboard khác đang nằm chung trong page.tsx của root
      // Một cách đơn giản là quay về root với state view tương ứng
      // Nhưng tạm thời ta cho quay về home nếu muốn rời admin
      router.push('/?view=' + view)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-1">
        <AdminPage onNavigate={handleNavigate} />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}
