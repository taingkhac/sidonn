import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface ProductPageProps {
  onNavigate: (view: string) => void
  productType: 'racking' | 'containers' | 'conveyors' | 'robotics'
}

export function ProductPage({ onNavigate, productType }: ProductPageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS(`product-${productType}`)

  const product = {
    title: translate(`product_${productType}_title`, lang, productType.toUpperCase()),
    subtitle: translate(`product_${productType}_subtitle`, lang, 'Premium material handling solutions'),
    description: translate(`product_${productType}_description`, lang, 'Our advanced systems are designed to optimize space utilization while ensuring safety and accessibility.'),
    features: [
      translate(`product_${productType}_feature_1`, lang, 'High-density storage solutions'),
      translate(`product_${productType}_feature_2`, lang, 'Flexible configuration options'),
      translate(`product_${productType}_feature_3`, lang, 'Seismic-resistant design'),
      translate(`product_${productType}_feature_4`, lang, 'Easy installation and maintenance'),
      translate(`product_${productType}_feature_5`, lang, 'Compatible with automated systems'),
    ],
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {product.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {product.description}
            </p>

            {/* Features Grid */}
            <h3 className="text-3xl font-bold mb-8">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Technical Specifications</h2>
            <div className="bg-white border border-border p-8">
              <p className="text-center text-muted-foreground">
                For detailed technical specifications and custom configurations, please contact our sales team.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Request Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let our experts help you find the perfect solution for your needs
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Contact Sales Team
          </button>
        </div>
      </section>
    </main>
  )
}
