import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Moje Portfolio | Developer & Creator',
  description: 'Profesjonalne portfolio - projekty, blog, doświadczenie i umiejętności',
  keywords: ['portfolio', 'developer', 'programista', 'web development', 'blog'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Moje Portfolio',
    description: 'Profesjonalne portfolio developera',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={poppins.variable}>
      <body className="font-sans antialiased">
        {/* Background decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}

