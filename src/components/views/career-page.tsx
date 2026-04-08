import { Briefcase, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface CareerPageProps {
  onNavigate: (view: string) => void
}

export function CareerPage({ onNavigate }: CareerPageProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS('career')

  const jobs = [
    {
      title: translate('career_job_1_title', lang, 'Senior Automation Engineer'),
      department: translate('career_job_1_dept', lang, 'Engineering'),
      location: translate('career_job_1_loc', lang, 'Munich, Germany'),
      type: translate('career_job_1_type', lang, 'Full-time'),
      description: translate(
        'career_job_1_desc',
        lang,
        'Lead complex automation projects and mentor junior engineers',
      ),
    },
    {
      title: translate('career_job_2_title', lang, 'Robotics Software Developer'),
      department: translate('career_job_2_dept', lang, 'Software Development'),
      location: translate('career_job_2_loc', lang, 'Tokyo, Japan'),
      type: translate('career_job_2_type', lang, 'Full-time'),
      description: translate(
        'career_job_2_desc',
        lang,
        'Develop control systems for autonomous guided vehicles',
      ),
    },
    {
      title: translate('career_job_3_title', lang, 'Project Manager - Warehouse Solutions'),
      department: translate('career_job_3_dept', lang, 'Project Management'),
      location: translate('career_job_3_loc', lang, 'Chicago, USA'),
      type: translate('career_job_3_type', lang, 'Full-time'),
      description: translate(
        'career_job_3_desc',
        lang,
        'Oversee implementation of large-scale warehouse automation projects',
      ),
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {translate('career_title', lang, 'Join Our Team')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {translate(
                'career_subtitle',
                lang,
                "Build your career with a global leader in logistics automation. We're looking for talented individuals who are passionate about innovation and excellence.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            {translate('career_why_title', lang, 'Why Work With Us')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {translate('career_benefit_1_title', lang, 'Innovative Projects')}
              </h3>
              <p className="text-muted-foreground">
                {translate(
                  'career_benefit_1_desc',
                  lang,
                  'Work on cutting-edge automation projects that shape the future of logistics',
                )}
              </p>
            </div>
            {/* Repeat for other benefits if necessary, or just use keys about_benefit_2... */}
            <div className="text-center p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {translate('career_benefit_2_title', lang, 'Global Opportunities')}
              </h3>
              <p className="text-muted-foreground">
                {translate(
                  'career_benefit_2_desc',
                  lang,
                  'Join a worldwide team with offices in over 50 countries',
                )}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {translate('career_benefit_3_title', lang, 'Work-Life Balance')}
              </h3>
              <p className="text-muted-foreground">
                {translate(
                  'career_benefit_3_desc',
                  lang,
                  'Flexible work arrangements and comprehensive benefits package',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            {translate('career_positions_title', lang, 'Open Positions')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-border hover:border-primary transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 whitespace-nowrap">
                    {translate('btn_apply_now', lang, 'Apply Now')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {translate('career_cta_title', lang, "Don't See the Right Role?")}
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {translate(
              'career_cta_subtitle',
              lang,
              "Send us your resume and we'll keep you in mind for future opportunities",
            )}
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {translate('btn_get_in_touch', lang, 'Get In Touch')}
          </button>
        </div>
      </section>
    </main>
  )
}
