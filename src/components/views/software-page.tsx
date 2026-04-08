import { Monitor, Database, BarChart3, Shield, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface SoftwarePageProps {
  onNavigate: (view: string) => void
  softwareType: 'wamas' | 'sap'
}

export function SoftwarePage({ onNavigate, softwareType }: SoftwarePageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS(`software-${softwareType}`)

  const software = {
    title: translate(`software_${softwareType}_title`, lang, softwareType.toUpperCase()),
    subtitle: translate(
      `software_${softwareType}_subtitle`,
      lang,
      'Smart logistics software solutions',
    ),
    description: translate(
      `software_${softwareType}_description`,
      lang,
      'Enterprise-grade software for complete visibility and control.',
    ),
    capabilities: [
      {
        icon: Monitor,
        title: translate(`software_${softwareType}_cap_1_title`, lang, 'Real-Time Monitoring'),
        description: translate(
          `software_${softwareType}_cap_1_desc`,
          lang,
          'Track inventory and resources in real-time',
        ),
      },
      {
        icon: Database,
        title: translate(`software_${softwareType}_cap_2_title`, lang, 'Data Management'),
        description: translate(
          `software_${softwareType}_cap_2_desc`,
          lang,
          'Centralized management of supply chain data',
        ),
      },
      {
        icon: BarChart3,
        title: translate(`software_${softwareType}_cap_3_title`, lang, 'Analytics'),
        description: translate(
          `software_${softwareType}_cap_3_desc`,
          lang,
          'KPI tracking and data-driven decisions',
        ),
      },
      {
        icon: Shield,
        title: translate(`software_${softwareType}_cap_4_title`, lang, 'Security'),
        description: translate(
          `software_${softwareType}_cap_4_desc`,
          lang,
          'Enterprise-grade security and compliance',
        ),
      },
    ],
    benefits: [
      translate(`software_${softwareType}_benefit_1`, lang, 'Reduce operational costs'),
      translate(`software_${softwareType}_benefit_2`, lang, 'Increase order accuracy'),
      translate(`software_${softwareType}_benefit_3`, lang, 'Improve throughput'),
      translate(`software_${softwareType}_benefit_4`, lang, 'Seamless integration'),
    ],
  }

  return (
    <main className="flex-1">
      {/* Breadcrumb & Back */}
      <section className="bg-secondary py-3 sm:py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between sm:justify-start gap-4 text-sm">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
              {translate('breadcrumb_back_home', lang, 'Back')}
            </button>

            <div className="hidden sm:flex items-center gap-2 text-muted-foreground/60">
              <span className="text-border">|</span>
              <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-primary">
                {translate('breadcrumb_home', lang, 'Home')}
              </span>
              <span>/</span>
              <span className="text-foreground font-medium">{software.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              {software.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {software.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">{software.description}</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {software.capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <div
                  key={index}
                  className="p-6 border border-border hover:border-primary transition-colors"
                >
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground">{capability.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {software.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white border border-border"
                >
                  <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Request a Demo</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            See how our software solutions can transform your warehouse operations
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Schedule a Demo
          </button>
        </div>
      </section>
    </main>
  )
}
