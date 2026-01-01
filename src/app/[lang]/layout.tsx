import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { i18n, type Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: ['portfolio', 'AI', 'LLM', 'kognitywistyka', 'cognitive science', 'Python', 'RAG'],
    authors: [{ name: 'Wojciech Soczyński' }],
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(params.lang)

  return (
    <div className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Navbar dictionary={dictionary.nav} lang={params.lang} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer nav={dictionary.nav} footer={dictionary.footer} lang={params.lang} />
      <Chatbot lang={params.lang} dictionary={dictionary.chatbot} />
    </div>
  )
}
