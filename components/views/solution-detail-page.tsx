import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface SolutionDetailPageProps {
  solution: {
    id: string
    icon: any
    title: string
    fullDescription: string
    features: string[]
    benefits: string[]
    applications: string[]
  }
  onNavigate: (view: string) => void
  isHtml?: boolean
}

export function SolutionDetailPage({ solution, onNavigate, isHtml }: SolutionDetailPageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS('shared')
  const Icon = solution.icon

  return (
    <main className="flex-1">
      {/* Breadcrumb & Back */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {translate('breadcrumb_back_home', lang, 'Back to Home')}
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-primary">{translate('breadcrumb_home', lang, 'Home')}</span>
            <span>/</span>
            <span onClick={() => onNavigate('solutions-overview')} className="cursor-pointer hover:text-primary">{translate('nav_solutions', lang, 'Solutions')}</span>
            <span>/</span>
            <span className="text-foreground">{solution.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 md:h-20 md:w-20 bg-primary flex items-center justify-center">
                <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">{solution.title}</h1>
            {isHtml ? (
              <div 
                className="max-w-none prose prose-sm md:prose-base lg:prose-lg prose-invert mx-auto text-left px-2 sm:px-0"
                dangerouslySetInnerHTML={{ __html: solution.fullDescription }}
              />
            ) : (
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed px-4 md:px-0">
                {solution.fullDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
              {translate('label_key_features', lang, 'Key Features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {solution.features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-6 border border-border hover:border-primary transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg leading-relaxed">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {translate('label_benefits', lang, 'Benefits')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solution.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-lg leading-relaxed pt-2">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {translate('label_applications', lang, 'Applications')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.applications.map((application, index) => (
                <div key={index} className="p-6 bg-secondary border border-border text-center hover:border-primary transition-colors">
                  <p className="font-semibold">{application}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {translate('cta_ready_title', lang, 'Ready to Implement This Solution?')}
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {translate('cta_ready_subtitle', lang, `Contact our team to discuss how ${solution.title} can transform your operations.`)}
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg"
          >
            {translate('btn_get_quote', lang, 'Get a Quote')}
          </button>
        </div>
      </section>
    </main>
  )
}
