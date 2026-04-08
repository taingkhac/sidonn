'use client'

import * as React from 'react'
import Link from 'next/link'
import { Globe, Search, Menu, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Language } from '@/contexts/language-context'
import { supabase } from '@/lib/supabase'
import { useCMS } from '@/hooks/use-cms'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const languages: { code: Language; name: string; display: string }[] = [
  { code: 'en', name: 'English', display: 'EN' },
  { code: 'vi', name: 'Tiếng Việt', display: 'VI' },
  { code: 'zh', name: '中文', display: 'ZH' },
  { code: 'ja', name: '日本語', display: 'JA' },
  { code: 'ko', name: '한국어', display: 'KO' },
]

const solutionsMenu = [
  {
    category: 'Warehousing',
    items: [
      { name: 'Smart Warehouse', view: 'smart-warehouse' },
      { name: 'Fulfillment Warehouse', view: 'fulfillment' },
    ],
  },
  {
    category: 'Processing',
    items: [
      { name: 'Sorting Systems', view: 'sorting' },
      { name: 'Automation Factory', view: 'automation' },
    ],
  },
  {
    category: 'Transport',
    items: [
      { name: 'Airport Catering', view: 'catering' },
      { name: 'Seaport AGV', view: 'seaport-agv' },
    ],
  },
]

const productsMenu = [
  { name: 'Racking', view: 'product-racking' },
  { name: 'Containers', view: 'product-containers' },
  { name: 'Conveyors', view: 'product-conveyors' },
  { name: 'Robotics', view: 'product-robotics' },
]

const softwareMenu = [
  { name: 'WAMAS', view: 'software-wamas' },
  { name: 'SAP Solutions', view: 'software-sap' },
]

const companyMenu = [
  { name: 'About Us', view: 'about' },
  { name: 'Career', view: 'career' },
  { name: 'Downloads & Resources', view: 'resources' },
]

interface HeaderProps {
  onNavigate: (view: string) => void
}

export function Header({ onNavigate }: HeaderProps) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [rawMenus, setRawMenus] = React.useState<any[]>([])

  const { lang, setLang } = useLanguage()
  const { t: translate } = useCMS('shared')

  React.useEffect(() => {
    async function fetchMenus() {
      const { data } = await supabase.from('menus').select('*').order('order_index')
      if (data && data.length > 0) {
        setRawMenus(data)
      }
    }
    fetchMenus()
  }, [])

  const currentSolutionsMenu = React.useMemo(() => {
    if (rawMenus.length > 0) {
      const categories = rawMenus.filter((m) => m.menu_type === 'solutions-category')
      const items = rawMenus.filter((m) => m.menu_type === 'solutions')
      return categories.map((cat) => ({
        category: cat.translations[lang] || cat.translations['en'] || cat.key,
        items: items
          .filter((item) => item.parent_id === cat.id)
          .map((item) => ({
            name: item.translations[lang] || item.translations['en'] || item.key,
            view: item.view_target,
          })),
      }))
    }
    return solutionsMenu
  }, [rawMenus, lang])

  const currentProductsMenu = React.useMemo(() => {
    if (rawMenus.length > 0) {
      return rawMenus
        .filter((m) => m.menu_type === 'products')
        .map((m) => ({
          name: m.translations[lang] || m.translations['en'] || m.key,
          view: m.view_target,
        }))
    }
    return productsMenu
  }, [rawMenus, lang])

  const currentSoftwareMenu = React.useMemo(() => {
    if (rawMenus.length > 0) {
      return rawMenus
        .filter((m) => m.menu_type === 'software')
        .map((m) => ({
          name: m.translations[lang] || m.translations['en'] || m.key,
          view: m.view_target,
        }))
    }
    return softwareMenu
  }, [rawMenus, lang])

  const currentCompanyMenu = React.useMemo(() => {
    if (rawMenus.length > 0) {
      return rawMenus
        .filter((m) => m.menu_type === 'company')
        .map((m) => ({
          name: m.translations[lang] || m.translations['en'] || m.key,
          view: m.view_target,
        }))
    }
    return companyMenu
  }, [rawMenus, lang])

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      {/* Top Bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate?.('newsroom')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {translate('nav_newsroom', lang, 'Newsroom')}
              </button>
              <button
                onClick={() => onNavigate?.('support')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {translate('nav_support', lang, 'Support')}
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-4 w-4" />
                <span>{languages.find((l) => l.code === lang)?.display || 'EN'}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLang(language.code)}
                    className={lang === language.code ? 'bg-secondary' : ''}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/sidonn-logo-clean.jpg" alt="Sidonn" className="h-12 w-auto object-contain" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Solutions Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('solutions')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-2">
                {translate('nav_solutions', lang, 'Solutions')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeMenu === 'solutions' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border shadow-lg p-6 min-w-[500px]">
                    <div className="grid grid-cols-3 gap-6">
                      {currentSolutionsMenu.map((section) => (
                        <div key={section.category}>
                          <h3 className="font-semibold text-sm mb-3">{section.category}</h3>
                          <ul className="space-y-2">
                            {section.items.map((item) => (
                              <li key={item.name}>
                                <button
                                  onClick={() => onNavigate?.(item.view)}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                                >
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Products Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('products')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-2">
                {translate('nav_products', lang, 'Products')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeMenu === 'products' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border shadow-lg p-6 min-w-[200px]">
                    <ul className="space-y-2">
                      {currentProductsMenu.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => onNavigate(item.view)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Software Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('software')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-2">
                {translate('nav_software', lang, 'Software')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeMenu === 'software' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border shadow-lg p-6 min-w-[200px]">
                    <ul className="space-y-2">
                      {currentSoftwareMenu.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => onNavigate(item.view)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Company Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('company')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-2">
                {translate('nav_company', lang, 'Company')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeMenu === 'company' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border shadow-lg p-6 min-w-[200px]">
                    <ul className="space-y-2">
                      {currentCompanyMenu.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => onNavigate(item.view)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex hover:bg-secondary transition-all duration-200 hover:scale-110"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => onNavigate?.('contact')}
              className="hidden lg:flex bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {translate('nav_contact', lang, 'Contact Us')}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary transition-all duration-200 hover:scale-110"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] transition-transform duration-300 ease-in-out"
              >
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate through solutions, products, software, and company information
                </SheetDescription>
                <nav className="flex flex-col gap-4 mt-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="solutions">
                      <AccordionTrigger>
                        {translate('nav_solutions', lang, 'Solutions')}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {currentSolutionsMenu.map((section) => (
                            <div key={section.category}>
                              <h4 className="font-semibold text-sm mb-2">{section.category}</h4>
                              <ul className="space-y-2 ml-2">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <button
                                      onClick={() => {
                                        onNavigate(item.view)
                                        setMobileOpen(false)
                                      }}
                                      className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block text-left"
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="products">
                      <AccordionTrigger>
                        {translate('nav_products', lang, 'Products')}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {currentProductsMenu.map((item) => (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  onNavigate(item.view)
                                  setMobileOpen(false)
                                }}
                                className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block text-left"
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="software">
                      <AccordionTrigger>
                        {translate('nav_software', lang, 'Software')}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {currentSoftwareMenu.map((item) => (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  onNavigate(item.view)
                                  setMobileOpen(false)
                                }}
                                className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block text-left"
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="company">
                      <AccordionTrigger>
                        {translate('nav_company', lang, 'Company')}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {currentCompanyMenu.map((item) => (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  onNavigate(item.view)
                                  setMobileOpen(false)
                                }}
                                className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block text-left"
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="pt-4 border-t space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-start transition-all duration-200 hover:bg-secondary hover:translate-x-1"
                      size="sm"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {translate('nav_search', lang, 'Search')}
                    </Button>
                    <Button
                      onClick={() => {
                        onNavigate?.('contact')
                        setMobileOpen(false)
                      }}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      {translate('nav_contact', lang, 'Contact Us')}
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
