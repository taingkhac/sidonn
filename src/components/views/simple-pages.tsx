import { Mail, Phone, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface SimplePageProps {
  onNavigate: (view: string) => void
  pageType: 'newsroom' | 'support' | 'privacy' | 'terms'
}

export function SimplePage({ onNavigate, pageType }: SimplePageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS([pageType, 'shared'])
  const [newsList, setNewsList] = useState<any[]>([])

  useEffect(() => {
    if (pageType === 'newsroom') {
      const fetchNews = async () => {
        const { data } = await supabase
          .from('articles')
          .select('*')
          .eq('category', 'news')
          .order('created_at', { ascending: false })
        if (data) setNewsList(data)
      }
      fetchNews()
    }
  }, [pageType])
  const renderNewsroom = () => (
    <main className="flex-1">
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {translate('newsroom_title', lang, 'Newsroom')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {translate(
                'newsroom_subtitle',
                lang,
                'Latest news, press releases, and media resources',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {newsList.map((news, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 border border-border hover:border-primary transition-colors"
              >
                <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {new Date(news.created_at).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                  {news.title_translations?.[lang] || news.title_translations?.['en'] || news.slug}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  {news.desc_translations?.[lang] || news.desc_translations?.['en'] || ''}
                </p>
                <button
                  onClick={() => onNavigate(`news-${news.slug}`)}
                  className="text-sm sm:text-base text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  {translate('btn_read_more', lang, 'Read More →')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )

  const renderSupport = () => (
    <main className="flex-1">
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {translate('support_title', lang, 'Customer Support')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {translate(
                'support_subtitle',
                lang,
                "We're here to help with your automation needs 24/7",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="p-6 border border-border text-center hover:border-primary transition-colors">
              <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">
                {translate('support_phone_title', lang, 'Phone Support')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {translate('support_phone_desc', lang, 'Available 24/7')}
              </p>
              <a
                href={`tel:${translate('company_phone_primary', lang, '+18005551234')}`}
                className="text-primary font-semibold hover:text-primary/80"
              >
                {translate('company_phone_primary', lang, '+1 (800) 555-1234')}
              </a>
            </div>
            <div className="p-6 border border-border text-center hover:border-primary transition-colors">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">
                {translate('support_email_title', lang, 'Email Support')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {translate('support_email_desc', lang, 'Response within 24 hours')}
              </p>
              <a
                href={`mailto:${translate('company_email_primary', lang, 'support@gla.com')}`}
                className="text-primary font-semibold hover:text-primary/80"
              >
                {translate('company_email_primary', lang, 'support@gla.com')}
              </a>
            </div>
            <div className="p-6 border border-border text-center hover:border-primary transition-colors">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">
                {translate('support_chat_title', lang, 'Live Chat')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {translate('support_chat_desc', lang, 'Chat with our team')}
              </p>
              <button className="text-primary font-semibold hover:text-primary/80">
                {translate('btn_start_chat', lang, 'Start Chat')}
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {translate('support_faq_title', lang, 'Frequently Asked Questions')}
            </h2>
            <div className="space-y-6">
              {[
                {
                  key: 'faq_1',
                  q: 'How long does implementation typically take?',
                  a: 'Implementation timelines vary based on project scope, but typically range from 3-6 months for standard installations.',
                },
                {
                  key: 'faq_2',
                  q: 'Do you provide training for our staff?',
                  a: 'Yes, comprehensive training is included with all installations, covering both operational and maintenance procedures.',
                },
                {
                  key: 'faq_3',
                  q: 'What maintenance services do you offer?',
                  a: 'We offer 24/7 support, preventive maintenance programs, spare parts supply, and remote monitoring services.',
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-secondary">
                  <h3 className="text-lg font-semibold mb-2">
                    {translate(`${faq.key}_q`, lang, faq.q)}
                  </h3>
                  <p className="text-muted-foreground">{translate(`${faq.key}_a`, lang, faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )

  const renderPrivacy = () => (
    <main className="flex-1">
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              {translate('privacy_title', lang, 'Privacy Policy')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              {translate('privacy_last_updated', lang, 'Last updated: February 2026')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className="max-w-4xl mx-auto prose prose-slate"
            dangerouslySetInnerHTML={{
              __html: translate(
                'privacy_content',
                lang,
                `
              <div class="space-y-8">
                <div>
                  <h2 class="text-2xl font-bold mb-4">1. Information We Collect</h2>
                  <p class="text-muted-foreground leading-relaxed">We collect information that you provide directly to us, including name, email address, phone number, company information, and any other information you choose to provide when using our services or contacting us.</p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                  <p class="text-muted-foreground leading-relaxed">We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and send you technical notices and support messages.</p>
                </div>
              </div>
            `,
              ),
            }}
          />
        </div>
      </section>
    </main>
  )

  const renderTerms = () => (
    <main className="flex-1">
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              {translate('terms_title', lang, 'Terms of Service')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              {translate('terms_last_updated', lang, 'Last updated: February 2026')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className="max-w-4xl mx-auto prose prose-slate"
            dangerouslySetInnerHTML={{
              __html: translate(
                'terms_content',
                lang,
                `
              <div class="space-y-8">
                <div>
                  <h2 class="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p class="text-muted-foreground leading-relaxed">By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold mb-4">2. Use of Services</h2>
                  <p class="text-muted-foreground leading-relaxed">You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
                </div>
              </div>
            `,
              ),
            }}
          />
        </div>
      </section>
    </main>
  )

  switch (pageType) {
    case 'newsroom':
      return renderNewsroom()
    case 'support':
      return renderSupport()
    case 'privacy':
      return renderPrivacy()
    case 'terms':
      return renderTerms()
    default:
      return renderNewsroom()
  }
}
