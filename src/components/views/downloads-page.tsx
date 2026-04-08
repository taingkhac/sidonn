'use client'

import React from 'react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Download, Eye, ChevronLeft, ChevronRight, FileText, Video } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useCMS } from '@/hooks/use-cms'

type FilterType = 'All' | 'Brochures' | 'Case Studies' | 'Whitepapers' | 'Videos'

interface Resource {
  id: number
  title: string
  date: string
  fileSize: string
  fileType: 'PDF' | 'MP4'
  category: FilterType
  thumbnail: string
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Smart Warehouse Solutions Overview',
    date: 'Jan 2024',
    fileSize: '2.5 MB',
    fileType: 'PDF',
    category: 'Brochures',
    thumbnail: '/placeholder-doc.jpg',
  },
  {
    id: 2,
    title: 'E-commerce Fulfillment Case Study',
    date: 'Dec 2023',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    category: 'Case Studies',
    thumbnail: '/placeholder-doc.jpg',
  },
  {
    id: 3,
    title: 'AGV Implementation Guide',
    date: 'Nov 2023',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    category: 'Whitepapers',
    thumbnail: '/placeholder-doc.jpg',
  },
]

export function DownloadsPage({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const { lang } = useLanguage()
  const { t: translate } = useCMS('downloads')
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filters: FilterType[] = ['All', 'Brochures', 'Case Studies', 'Whitepapers', 'Videos']

  const filteredResources = resources.filter((resource) => {
    const matchesFilter = activeFilter === 'All' || resource.category === activeFilter
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Breadcrumb & Title Section */}
        <section className="bg-secondary py-4 sm:py-8 border-b border-border">
          <div className="container mx-auto px-4 text-left">
            <div className="flex items-center justify-between sm:justify-start gap-4 text-sm mb-4">
              <button
                onClick={() => onNavigate?.('home')}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                <ChevronLeft className="h-4 w-4" />
                {translate('btn_back', lang, 'Back')}
              </button>

              <div className="hidden sm:flex items-center gap-2 text-muted-foreground/60">
                <span className="text-border">|</span>
                <span
                  onClick={() => onNavigate?.('home')}
                  className="cursor-pointer hover:text-primary"
                >
                  {translate('breadcrumb_home', lang, 'Home')}
                </span>
                <span>/</span>
                <span className="text-foreground font-medium">
                  {translate('breadcrumb_downloads', lang, 'Downloads')}
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
              {translate('downloads_title', lang, 'Knowledge Center')}
            </h1>
          </div>
        </section>

        {/* Sticky Search & Filter Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-6">
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={translate(
                  'downloads_search_placeholder',
                  lang,
                  'Search for manuals, brochures...',
                )}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 h-14 text-lg"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 ${
                    activeFilter === filter
                      ? 'bg-primary text-primary-foreground hover:shadow-lg'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                  style={{ borderRadius: '9999px' }}
                >
                  {translate(`filter_${filter.toLowerCase().replace(' ', '_')}`, lang, filter)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {paginatedResources.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {translate(
                    'downloads_no_results',
                    lang,
                    'No resources found matching your criteria.',
                  )}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white border border-border hover:border-primary/50 transition-all group"
                  >
                    <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {resource.fileType === 'PDF' ? (
                          <FileText className="h-16 w-16 text-muted-foreground" />
                        ) : (
                          <Video className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="default"
                          className="bg-primary text-primary-foreground font-bold px-3 py-1"
                        >
                          {resource.fileType}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{resource.date}</span>
                        <span>•</span>
                        <span>{resource.fileSize}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <button className="flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-all duration-200 hover:gap-3">
                          <Download className="h-4 w-4" />
                          {translate('btn_download', lang, 'Download')}
                        </button>
                        <button className="p-2 hover:bg-secondary transition-all duration-200 hover:scale-110">
                          <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] h-10 px-3 font-semibold transition-all duration-200 hover:scale-105 ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground hover:shadow-lg'
                        : 'border border-border hover:bg-secondary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
