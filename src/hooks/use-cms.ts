import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface ContentBlock {
  id: string
  view_target: string
  block_key: string
  content_type: string
  translations: Record<string, string>
}

export function useCMS(targets: string | string[]) {
  const [blocks, setBlocks] = useState<Record<string, Record<string, any>>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const targetArray = Array.isArray(targets) ? targets : [targets]

    async function loadContent() {
      setLoading(true)
      const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .in('view_target', targetArray)

      if (error) {
        console.error('Error loading CMS blocks:', error)
      } else if (data && isMounted) {
        const formatted: Record<string, Record<string, any>> = {}
        data.forEach((item: ContentBlock) => {
          formatted[item.block_key] = item.translations || {}
        })
        setBlocks(formatted)
      }
      if (isMounted) setLoading(false)
    }

    loadContent()

    return () => {
      isMounted = false
    }
  }, [JSON.stringify(targets)])

  const t = (key: string, lang: string, fallback: string = '') => {
    return blocks[key]?.[lang] || blocks[key]?.['en'] || fallback
  }

  return { blocks, loading, t }
}
