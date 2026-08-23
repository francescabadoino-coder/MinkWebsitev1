import React from "react"
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/**
 * Brand typeface 1 of 2 — NOURD.
 * The primary geometric sans. Carries every headline, all body copy and the
 * small tracked-out labels. Previously stood in for by Figtree/Asap from
 * Google Fonts; these are now the real licensed files.
 */
const nourd = localFont({
  src: [
    { path: './fonts/nourd_light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/nourd_regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/nourd_medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/nourd_semi_bold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/nourd_bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/nourd_heavy.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-nourd',
  display: 'swap',
  // Keeps layout shift low while the real face loads.
  fallback: ['system-ui', 'sans-serif'],
});

/**
 * Brand typeface 2 of 2 — COOPER LIGHT BT.
 * The warm rounded serif. Reserved for editorial moments only: pull quotes,
 * taglines and single emphasised words inside a headline. Never body copy.
 */
const cooper = localFont({
  src: [
    { path: './fonts/cooperl.ttf', weight: '300', style: 'normal' },
    { path: './fonts/cooperli.ttf', weight: '300', style: 'italic' },
  ],
  variable: '--font-cooper',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const siteUrl = 'https://mink.design'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mink — AI Procurement for Interior Designers | Source Products in Seconds',
    template: '%s | Mink',
  },
  description:
    'Mink is the AI procurement platform for interior designers. Meet Ora, the AI agent that sources furniture, fixtures, and equipment from your favorite brands and vetted suppliers in seconds, then exports client-ready spec docs in one click.',
  applicationName: 'Mink',
  generator: 'v0.app',
  keywords: [
    'AI procurement for interior designers',
    'interior design product sourcing',
    'FF&E sourcing software',
    'furniture fixtures and equipment',
    'AI sourcing tool for designers',
    'interior design procurement platform',
    'spec sheet generator',
    'trade vendor sourcing',
    'find products from a render',
    'interior design software',
    'design product matching AI',
    'Ora AI procurement agent',
  ],
  authors: [{ name: 'Mink' }],
  creator: 'Mink',
  publisher: 'Mink',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mink',
    title: 'Mink — AI Procurement for Interior Designers',
    description:
      'Source furniture, fixtures, and equipment from your favorite brands in seconds. Meet Ora, the AI procurement agent for interior designers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mink — AI procurement for interior designers. Design more, stress less.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mink — AI Procurement for Interior Designers',
    description:
      'Source furniture, fixtures, and equipment from your favorite brands in seconds with Ora, your AI procurement agent.',
    images: ['/og-image.png'],
    creator: '@mink',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Tab / touch icons come from the app-dir file convention so Next emits the
  // links itself: app/icon.svg (scheme-aware squircle mark), app/favicon.ico
  // (legacy 32px fallback) and app/apple-icon.png (180px opaque touch icon).
  // Declaring `metadata.icons` here would override those files, so we don't.
}

export const viewport: Viewport = {
  themeColor: [
    // Day (#E3E3E3) and Midnight (#232323) — the two brand ground tones.
    { media: '(prefers-color-scheme: light)', color: '#E3E3E3' },
    { media: '(prefers-color-scheme: dark)', color: '#232323' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Mink',
      url: siteUrl,
      logo: `${siteUrl}/brand/mark-midnight.png`,
      description:
        'AI procurement platform that helps interior designers source products from their favorite brands in seconds.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mink',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Mink',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Mink is an AI procurement platform for interior designers. Its AI agent, Ora, sources furniture, fixtures, and equipment from vetted suppliers and exports client-ready spec documents.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free trial available; paid plans (Slate, Pro, Studio) from $29/mo.',
      },
      audience: {
        '@type': 'Audience',
        audienceType: 'Interior Designers',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${nourd.variable} ${cooper.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
