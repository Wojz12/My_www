'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { BlogPost as BlogPostType } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { Locale } from '@/i18n-config'
import { Reveal } from '@/components/ui'

interface BlogPostProps {
  post: BlogPostType
  dictionary: {
    backToBlog: string
    minRead: string
    thanks: string
  }
  lang: Locale
}

export default function BlogPost({ post, dictionary, lang }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Szacowany czas czytania
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200)

  return (
    <article className="page pt-10 pb-20 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {dictionary.backToBlog}
        </Link>

        <Reveal className="mt-10">
          <p className="eyebrow">{post.tags.join(' · ')}</p>
          <h1 className="display mt-5 text-4xl leading-[1.08] md:text-6xl">{post.title}</h1>
          <p className="lead mt-6">{post.description}</p>
          <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 border-t border-line pt-5 text-sm text-ink-muted">
            {post.author && <span className="text-ink">{post.author}</span>}
            {post.author && <span className="text-line">·</span>}
            <span>{formatDate(post.date)}</span>
            <span className="text-line">·</span>
            <span>
              {readingTime} {dictionary.minRead}
            </span>
          </p>
        </Reveal>
      </div>

      {post.image && (
        <Reveal delay={0.05} className="mx-auto mt-12 max-w-4xl">
          <div className="relative h-72 overflow-hidden rounded-[1.75rem] bg-oat md:h-[28rem]">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 896px) 896px, 100vw" className="object-contain p-8" />
          </div>
        </Reveal>
      )}

      <div className="prose mx-auto mt-14 max-w-3xl">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src || ''} alt={alt || ''} className="h-auto max-w-full" />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <Link href={`/${lang}/blog`} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" />
          {dictionary.backToBlog}
        </Link>
        <p className="text-sm text-ink-muted">{dictionary.thanks}</p>
      </div>
    </article>
  )
}
