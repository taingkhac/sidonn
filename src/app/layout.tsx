import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { LanguageProvider } from '@/contexts/language-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sidonn - Logistics Automation Solutions',
  description:
    'Leading provider of innovative warehouse automation and logistics solutions worldwide',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
