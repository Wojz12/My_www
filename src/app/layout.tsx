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
  title: 'Wojciech Soczyński | AI & Cognitive Science',
  description: 'Portfolio studenta kognitywistyki pasjonującego się AI, LLMs i analizą danych. Projekty, blog i doświadczenie.',
  keywords: ['portfolio', 'AI', 'LLM', 'kognitywistyka', 'Python', 'RAG', 'machine learning', 'cognitive science'],
  authors: [{ name: 'Wojciech Soczyński' }],
  openGraph: {
    title: 'Wojciech Soczyński | AI & Cognitive Science',
    description: 'Portfolio studenta kognitywistyki - AI, LLMs, Python, RAG systems',
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

