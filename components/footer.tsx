'use client';

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

interface FooterProps {
  onNavigate: (view: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS('shared')
  
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/sidonn-logo-clean.jpg" 
                alt="Sidonn" 
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {translate('footer_description', lang, 'Sidonn - Leading provider of innovative warehouse automation and logistics solutions worldwide.')}
            </p>
            <div className="flex items-center gap-3">
              <Link 
                href="#" 
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href="#" 
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link 
                href="#" 
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link 
                href="#" 
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{translate('nav_solutions', lang, 'Solutions')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate?.('smart-warehouse')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('solution_smart', lang, 'Smart Warehouse')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('fulfillment')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('solution_fulfillment', lang, 'Fulfillment Warehouse')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('sorting')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('solution_sorting', lang, 'Sorting Systems')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('automation')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('solution_automation', lang, 'Automation Factory')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('catering')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('solution_catering', lang, 'Airport Catering')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('seaport-agv')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('solution_agv', lang, 'Seaport AGV')}
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Software */}
          <div>
            <h3 className="text-white font-semibold mb-4">{translate('nav_products', lang, 'Products')} & {translate('nav_software', lang, 'Software')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate?.('product-racking')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_racking', lang, 'Racking')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('product-containers')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_containers', lang, 'Containers')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('product-conveyors')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_conveyors', lang, 'Conveyors')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('product-robotics')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_robotics', lang, 'Robotics')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('software-wamas')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_wamas', lang, 'WAMAS')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('software-sap')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_sap', lang, 'SAP Solutions')}
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{translate('nav_company', lang, 'Company')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate?.('about')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_about', lang, 'About Us')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('career')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_career', lang, 'Career')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('resources')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('menu_downloads', lang, 'Downloads & Resources')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('newsroom')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('nav_newsroom', lang, 'Newsroom')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('support')} className="text-slate-400 hover:text-primary transition-colors text-left">
                  {translate('nav_support', lang, 'Support')}
                </button>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h4 className="text-white font-semibold mb-3 text-sm">{translate('label_legal', lang, 'Legal')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate?.('privacy')} className="text-slate-400 hover:text-primary transition-colors text-left">
                    {translate('label_privacy', lang, 'Privacy Policy')}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('terms')} className="text-slate-400 hover:text-primary transition-colors text-left">
                    {translate('label_terms', lang, 'Terms of Service')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Sidonn. {translate('label_all_rights', lang, 'All rights reserved.')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
