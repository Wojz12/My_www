import type { Metadata } from 'next'
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { i18n, type Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
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
    <div
      lang={params.lang}
      className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans antialiased min-h-screen flex flex-col`}
    >
      <Navbar dictionary={dictionary.nav} lang={params.lang} />
      <main className="flex-grow">{children}</main>
      <Footer nav={dictionary.nav} footer={dictionary.footer} lang={params.lang} />
      <Chatbot lang={params.lang} dictionary={dictionary.chatbot} />
    </div>
  )
}
