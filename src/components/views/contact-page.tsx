import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface ContactPageProps {
  onNavigate: (view: string) => void
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS('contact')
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('leads').insert([formData])
      if (error) throw error
      setIsSuccess(true)
      setFormData({ name: '', email: '', company: '', phone: '', message: '' })
    } catch (err: any) {
      alert(translate('contact_error', lang, 'Lỗi: ') + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
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
            <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-primary">
              {translate('breadcrumb_home', lang, 'Home')}
            </span>
            <span>/</span>
            <span className="text-foreground">
              {translate('breadcrumb_contact', lang, 'Contact Us')}
            </span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            {translate('contact_title', lang, 'Get in Touch')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {translate(
              'contact_subtitle',
              lang,
              "Let's discuss how our automation solutions can transform your business operations",
            )}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {translate('contact_info_title', lang, 'Contact Information')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {translate(
                    'contact_info_desc',
                    lang,
                    'Reach out to our team for inquiries, support, or to schedule a consultation.',
                  )}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {translate('contact_email_label', lang, 'Email')}
                    </h3>
                    <p className="text-muted-foreground">{translate('company_email_primary', lang, 'info@gla-corp.com')}</p>
                    <p className="text-muted-foreground">{translate('company_email_secondary', lang, 'sales@gla-corp.com')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {translate('contact_phone_label', lang, 'Phone')}
                    </h3>
                    <p className="text-muted-foreground">{translate('company_phone_primary', lang, '+1 (555) 123-4567')}</p>
                    <p className="text-muted-foreground">{translate('company_phone_secondary', lang, '+1 (555) 765-4321')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {translate('contact_address_label', lang, 'Headquarters')}
                    </h3>
                    <p
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: translate(
                          'company_address_html',
                          lang,
                          '123 Innovation Drive<br />Silicon Valley, CA 94025<br />United States',
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border p-8 relative overflow-hidden">
                {isSuccess ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      {translate('contact_success_title', lang, 'Message Sent!')}
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                      {translate(
                        'contact_success_desc',
                        lang,
                        'Thank you for contacting us. Our team has received your inquiry and will get back to you shortly.',
                      )}
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      {translate('btn_send_another', lang, 'Send another message')}
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">
                      {translate('contact_form_title', lang, 'Send us a Message')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold mb-2">
                            {translate('label_full_name', lang, 'Full Name')} *
                          </label>
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold mb-2">
                            {translate('label_email', lang, 'Email Address')} *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-semibold mb-2">
                            {translate('label_company', lang, 'Company')}
                          </label>
                          <Input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Your Company"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                            {translate('label_phone', lang, 'Phone Number')}
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold mb-2">
                          {translate('label_message', lang, 'Message')} *
                        </label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project or inquiry..."
                          className="w-full min-h-[150px]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Send className="h-5 w-5" />
                        )}
                        {loading
                          ? translate('btn_sending', lang, 'Sending...')
                          : translate('btn_send_message', lang, 'Send Message')}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
