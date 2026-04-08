'use client'

export const dynamic = 'force-dynamic'


import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HomePage } from '@/components/views/home-page'
import { SolutionDetailPage } from '@/components/views/solution-detail-page'
import { ContactPage } from '@/components/views/contact-page'
import { AdminPage } from '@/components/views/admin-page'
import { AboutPage } from '@/components/views/about-page'
import { CareerPage } from '@/components/views/career-page'
import { ProductPage } from '@/components/views/product-page'
import { SoftwarePage } from '@/components/views/software-page'
import { SimplePage } from '@/components/views/simple-pages'
import { NewsDetailPage } from '@/components/views/news-detail-page'
import { DownloadsPage } from '@/components/views/downloads-page'
import { useLanguage } from '@/contexts/language-context'
import { supabase } from '@/lib/supabase'
import * as LucideIcons from 'lucide-react'

type ViewType =
  | 'home'
  | 'solutions-overview'
  | 'resources'
  | 'admin-dashboard'
  | 'contact'
  | 'smart-warehouse'
  | 'fulfillment'
  | 'sorting'
  | 'automation'
  | 'catering'
  | 'seaport-agv'
  | 'about'
  | 'career'
  | 'newsroom'
  | 'support'
  | 'privacy'
  | 'terms'
  | 'product-racking'
  | 'product-containers'
  | 'product-conveyors'
  | 'product-robotics'
  | 'software-wamas'
  | 'software-sap'
  | 'news-expansion-asia-pacific'
  | 'news-robotics-fortune-500'
  | 'news-partnership-ecommerce'

export function PageContent() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const viewParam = searchParams.get('view') as ViewType
  const [currentView, setCurrentView] = useState<ViewType>(viewParam || 'home')

  useEffect(() => {
    if (viewParam && viewParam !== currentView) {
      setCurrentView(viewParam)
    }
  }, [viewParam])

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentView])

  const handleNavigate = (view: string) => {
    console.log('[v0] Navigating to:', view)
    setCurrentView(view as ViewType)
  }

  const [dynamicArticle, setDynamicArticle] = useState<any>(null)

  useEffect(() => {
    const slug = currentView.toString().replace('news-', '').replace('article-', '')

    // Check if it's likely a DB slug (not one of the hardcoded non-db views)
    const nonDbViews = [
      'home',
      'solutions-overview',
      'admin-dashboard',
      'contact',
      'about',
      'career',
      'newsroom',
      'support',
      'privacy',
      'terms',
      'resources',
    ]
    if (!nonDbViews.includes(currentView)) {
      const fetchArticle = async () => {
        const { data } = await supabase.from('articles').select('*').eq('slug', slug).single()
        if (data) {
          setDynamicArticle(data)
        } else {
          setDynamicArticle(null)
        }
      }
      fetchArticle()
    } else {
      setDynamicArticle(null)
    }
  }, [currentView])

  const renderView = () => {
    // Nếu có bài viết từ DB (Dynamic), ưu tiên hiển thị nó dùng SolutionDetailPage làm khung
    if (dynamicArticle) {
      const art = dynamicArticle
      const IconComponent = (LucideIcons as any)[art.icon_name] || LucideIcons.FileText

      const mappedArticle = {
        id: art.slug,
        icon: IconComponent,
        title: art.title_translations?.[lang] || art.title_translations?.['en'] || art.slug,
        fullDescription: art.content_translations?.[lang] || art.content_translations?.['en'] || '',
        features: art.features_translations?.[lang] || art.features_translations?.['en'] || [],
        benefits: art.benefits_translations?.[lang] || art.benefits_translations?.['en'] || [],
        applications:
          art.applications_translations?.[lang] || art.applications_translations?.['en'] || [],
        imageUrl: art.image_url,
        date: art.created_at,
      }

      if (art.category === 'news' || currentView.toString().startsWith('news-')) {
        return <NewsDetailPage newsData={mappedArticle as any} onNavigate={handleNavigate} />
      }

      return (
        <SolutionDetailPage solution={mappedArticle as any} onNavigate={handleNavigate} isHtml />
      )
    }

    switch (currentView) {
      case 'home':
      case 'solutions-overview':
        return <HomePage onNavigate={handleNavigate} />

      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />

      case 'about':
        return <AboutPage onNavigate={handleNavigate} />

      case 'career':
        return <CareerPage onNavigate={handleNavigate} />

      case 'newsroom':
        return <SimplePage pageType="newsroom" onNavigate={handleNavigate} />

      case 'news-expansion-asia-pacific':
      case 'news-robotics-fortune-500':
      case 'news-partnership-ecommerce':
        // Handled by dynamicArticle if exist in DB
        return <SimplePage pageType="newsroom" onNavigate={handleNavigate} />

      case 'support':
        return <SimplePage pageType="support" onNavigate={handleNavigate} />

      case 'privacy':
        return <SimplePage pageType="privacy" onNavigate={handleNavigate} />

      case 'terms':
        return <SimplePage pageType="terms" onNavigate={handleNavigate} />

      case 'product-racking':
        return <ProductPage productType="racking" onNavigate={handleNavigate} />

      case 'product-containers':
        return <ProductPage productType="containers" onNavigate={handleNavigate} />

      case 'product-conveyors':
        return <ProductPage productType="conveyors" onNavigate={handleNavigate} />

      case 'product-robotics':
        return <ProductPage productType="robotics" onNavigate={handleNavigate} />

      case 'software-wamas':
        return <SoftwarePage softwareType="wamas" onNavigate={handleNavigate} />

      case 'software-sap':
        return <SoftwarePage softwareType="sap" onNavigate={handleNavigate} />

      case 'resources':
        return <DownloadsPage onNavigate={handleNavigate} />

      case 'admin-dashboard':
        return <AdminPage onNavigate={handleNavigate} />

      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  const isAdmin = currentView === 'admin-dashboard'

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdmin && <Header onNavigate={handleNavigate} />}
      <main className="flex-1 flex flex-col">{renderView()}</main>
      {!isAdmin && <Footer onNavigate={handleNavigate} />}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}
