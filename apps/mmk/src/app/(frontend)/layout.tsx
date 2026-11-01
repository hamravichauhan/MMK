import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import '../../styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://majormadhankumar.in'),
  title: {
    default: 'Major Madhan Kumar (Retd) — Defense & Geopolitical Strategy',
    template: '%s | Major Madhan Kumar',
  },
  description:
    'Authoritative defense assessments, intelligence briefings, and strategic national security analysis by veteran Indian Army officer Major Madhan Kumar.',
  keywords: [
    'Major Madhan Kumar',
    'Indian Army',
    'Defense Analyst',
    'Geopolitics',
    'National Security',
    'OSINT',
    'Operation Sindoor',
    'Know Your Soldiers',
    'Military Strategy',
  ],
  authors: [{ name: 'Major Madhan Kumar (Retd)' }],
  creator: 'Major Madhan Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://majormadhankumar.in',
    siteName: 'Major Madhan Kumar — Strategic Intelligence & Defense Analysis',
    title: 'Major Madhan Kumar (Retd) — Defense & Geopolitical Strategy',
    description:
      'Authoritative defense assessments, intelligence briefings, and strategic national security analysis.',
    images: [
      {
        url: 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp,q_auto/payload-media/major-madhan.webp',
        width: 1200,
        height: 630,
        alt: 'Major Madhan Kumar (Retd)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Major Madhan Kumar (Retd) — Defense & Geopolitical Strategy',
    description:
      'Authoritative defense assessments, intelligence briefings, and strategic national security analysis.',
    images: [
      'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp,q_auto/payload-media/major-madhan.webp',
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: 'var(--bg-color, #070A14)',
          color: 'var(--text-color, #E2E8F0)',
          fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
        }}
      >
        <ThemeProvider>
          <div
            style={{
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: 'var(--bg-color, #070A14)',
              color: 'var(--text-color, #E2E8F0)',
              transition: 'background-color 0.25s ease, color 0.25s ease',
            }}
          >
            <Header />
            <div style={{ flexGrow: 1 }}>{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
