import type { Metadata } from 'next'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import '../../styles/globals.css'

export const metadata: Metadata = {
  title: 'Major Madhan Kumar — Geopolitical Strategic Analysis',
  description: 'Authoritative defense assessments, briefings, and updates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <div style={{ flexGrow: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
