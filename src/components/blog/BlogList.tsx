'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import type { PostMeta } from '@/lib/blog'
import { Locale } from '@/i18n-config'
import { Reveal } from '@/components/ui'

interface BlogListProps {
  posts: PostMeta[]
  tags: string[]
  dictionary: {
    title: string
    subtitle: string
    searchPlaceholder: string
    allTags: string
    readMore: string
    noPosts: string
    noResults: string
  }
  lang: Locale
}

export default function BlogList({ posts, tags, dictionary, lang }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const tagClass = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
      active ? 'bg-ink text-ivory' : 'bg-oat text-ink-soft hover:bg-sand'
    }`

  return (
    <div className="page pt-12 pb-20 md:pt-20">
      {/* Header */}
      <Reveal className="grid gap-6 md:grid-cols-12">
        <h1 className="display text-5xl md:col-span-6 md:text-7xl">{dictionary.title}</h1>
        <p className="section-subtitle md:col-span-5 md:col-start-8 md:self-end">{dictionary.subtitle}</p>
      </Reveal>

      {/* Search and Filters */}
      <div className="mt-12 flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedTag(null)} className={tagClass(selectedTag === null)}>
              {dictionary.allTags}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={tagClass(selectedTag === tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder={dictionary.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="!rounded-full !py-2.5 !pl-11 text-sm"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={0.03 * index}>
              <Link href={`/${lang}/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-oat">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <p className="mt-5 font-mono text-xs text-ink-faint">
                  {formatDate(post.date)}
                  {post.tags.length > 0 && <> · {post.tags.slice(0, 2).join(', ')}</>}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-ink decoration-clay underline-offset-4 group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{post.description}</p>
                <p className="mt-4 text-sm font-medium text-ink">{dictionary.readMore} →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-ink-muted">
          {posts.length === 0 ? dictionary.noPosts : dictionary.noResults}
        </p>
      )}
    </div>
  )
}
