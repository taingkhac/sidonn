'use client'

import { ArrowLeft } from 'lucide-react'

interface NewsDetailPageProps {
  onNavigate: (view: string) => void
  newsId?: string
  newsData?: {
    date: string
    title: string
    fullDescription: string
    imageUrl: string
  }
}

export function NewsDetailPage({ onNavigate, newsId, newsData: passedData }: NewsDetailPageProps) {
  const news = passedData

  if (!news) {
    return (
      <main className="flex-1">
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">News Article Not Found</h1>
            <button
              onClick={() => onNavigate('newsroom')}
              className="text-primary font-semibold hover:text-primary/80 inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Newsroom
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex-1">
      {/* Breadcrumb & Back */}
      <section className="bg-secondary py-3 sm:py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between sm:justify-start gap-4 text-sm">
            <button
              onClick={() => onNavigate('newsroom')}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
              Back
            </button>

            <div className="hidden sm:flex items-center gap-2 text-muted-foreground/60">
              <span className="text-border">|</span>
              <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-primary">
                Home
              </span>
              <span>/</span>
              <span
                onClick={() => onNavigate('newsroom')}
                className="cursor-pointer hover:text-primary"
              >
                Newsroom
              </span>
              <span>/</span>
              <span className="text-foreground font-medium line-clamp-1">{news.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Image */}
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        <img
          src={news.imageUrl || '/placeholder.svg'}
          alt={news.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8 sm:pb-12">
          <div className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3">{news.date}</div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl text-balance leading-tight">
            {news.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-slate max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: news.fullDescription }}
                className="text-lg leading-relaxed mb-6 text-muted-foreground"
              />
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop"
                alt="Warehouse automation"
                className="w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop"
                alt="Modern logistics"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-secondary border-l-4 border-primary">
              <h3 className="text-2xl font-bold mb-4">Interested in Our Solutions?</h3>
              <p className="text-muted-foreground mb-6">
                Contact our team to learn how our automation solutions can transform your logistics
                operations.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
