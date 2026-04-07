import { Building2, Users, Award, Globe2 } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface AboutPageProps {
  onNavigate: (view: string) => void
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS('about')

  const stats = [
    { icon: Globe2, value: '50+', label: translate('about_stats_label_1', lang, 'Countries Worldwide') },
    { icon: Building2, value: '10,000+', label: translate('about_stats_label_2', lang, 'Projects Delivered') },
    { icon: Users, value: '5,000+', label: translate('about_stats_label_3', lang, 'Team Members') },
    { icon: Award, value: '35+', label: translate('about_stats_label_4', lang, 'Years of Excellence') },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {translate('about_title', lang, 'About Sidonn')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {translate('about_subtitle', lang, 'Leading the transformation of logistics through intelligent automation solutions since 1985')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-4">{translate('about_mission_title', lang, 'Our Mission')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {translate('about_mission_desc', lang, 'To empower businesses worldwide with cutting-edge automation solutions that enhance efficiency, reduce operational costs, and drive sustainable growth in the logistics industry.')}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{translate('about_vision_title', lang, 'Our Vision')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {translate('about_vision_desc', lang, 'To be the global leader in logistics automation, setting new standards for innovation, reliability, and customer satisfaction across all industries we serve.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center p-6 bg-white border border-border">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">{translate('about_story_title', lang, 'Our Story')}</h2>
            <div 
              className="space-y-6 text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: translate('about_story_content', lang, `
                <p>Founded in 1985, Global Logistics Automation Corporation began as a small engineering firm with a vision to revolutionize warehouse operations through automation technology.</p>
                <p>Over the past three decades, we have grown into a global leader, implementing innovative automation solutions across more than 50 countries.</p>
              `) }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">{translate('about_cta_title', lang, 'Ready to Transform Your Operations?')}</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {translate('about_cta_subtitle', lang, 'Join thousands of companies worldwide who trust us for their automation needs')}
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {translate('btn_contact_us', lang, 'Contact Us Today')}
          </button>
        </div>
      </section>
    </main>
  )
}
