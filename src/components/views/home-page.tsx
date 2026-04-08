'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'
import { supabase } from '@/lib/supabase'
import * as LucideIcons from 'lucide-react'

interface HomePageProps {
  onNavigate: (view: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { lang } = useLanguage()

  // Fetch CMS blocks for home and shared
  const { blocks, t: translate } = useCMS(['home', 'shared'])

  // Fetch Solutions from articles table
  const [solutions, setSolutions] = useState<any[]>([])

  useEffect(() => {
    async function fetchSolutions() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'solutions')
        .order('id', { ascending: true })

      if (data) {
        setSolutions(
          data.map((item) => ({
            id: item.slug,
            iconName: item.icon_name || 'Box',
            title: item.title_translations?.[lang] || item.title_translations?.['en'] || item.slug,
            description: item.desc_translations?.[lang] || item.desc_translations?.['en'] || '',
          })),
        )
      }
    }
    fetchSolutions()
  }, [lang])

  const heroTitle = translate('hero_title', lang, 'Future of Intralogistics & Automation')
  const heroSubtitle = translate(
    'hero_subtitle',
    lang,
    'Industry-leading warehouse automation solutions that drive efficiency',
  )
  const heroVideoUrl = translate('hero_video', lang)

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[400px] h-[450px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        {heroVideoUrl ? (
          <div className="absolute inset-0">
            <video
              src={heroVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        )}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 sm:mt-0">
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-8 tracking-tight"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          />
          <div
            className="text-base sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-10 max-w-3xl mx-auto prose prose-invert line-clamp-3 sm:line-clamp-none"
            dangerouslySetInnerHTML={{ __html: heroSubtitle }}
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => onNavigate('solutions-overview')}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              {translate('hero_explore', lang, 'Explore Solutions')}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold hover:bg-white hover:text-slate-900 transition-all inline-flex items-center justify-center gap-2">
              <Play className="h-5 w-5" />
              {translate('hero_watch', lang, 'Watch Video')}
            </button>
          </div>
        </div>
      </section>

      {/* Solutions Highlight */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {translate('solutions_title', lang, 'Our Core Expertise')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {translate(
                'solutions_subtitle',
                lang,
                'Six pillars of innovation powering the future of logistics automation',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((item) => {
              const Icon = (LucideIcons as any)[item.iconName] || LucideIcons.Box
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="group p-8 bg-white border border-border hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                >
                  <div className="mb-6">
                    <div className="h-14 w-14 bg-primary/10 group-hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    {translate('btn_learn_more', lang, 'Learn more')}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {translate('global_title', lang, 'Global Presence')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {translate(
                'global_subtitle',
                lang,
                'Trusted by leading enterprises across the world',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-8 bg-white border border-border">
              <div className="text-5xl lg:text-6xl font-bold text-primary mb-2">50+</div>
              <div className="text-xl font-semibold text-muted-foreground">
                {translate('global_countries', lang, 'Countries')}
              </div>
            </div>
            <div className="text-center p-8 bg-white border border-border">
              <div className="text-5xl lg:text-6xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-xl font-semibold text-muted-foreground">
                {translate('global_projects', lang, 'Projects')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
