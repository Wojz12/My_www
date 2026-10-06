'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, stripEmoji } from '@/components/ui'

interface AdditionalInfoProps {
  dictionary: {
    achievementTitle: string
    achievementDesc: string
    facebookLink: string
    photoAlt: string
    photoCaption: string
    booksTitle: string
    books: {
      title: string
      author: string
      emoji: string
    }[]
  }
}

export default function AdditionalInfo({ dictionary }: AdditionalInfoProps) {
  return (
    <section id="additional-info" className="page section">
      <div className="grid gap-12 border-t border-line pt-8 lg:grid-cols-12 lg:gap-16">
        {/* Achievement */}
        <Reveal className="lg:col-span-7">
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] bg-oat">
              <Image
                src="/images/szwajcaria.jpg"
                alt={dictionary.photoAlt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-ink-faint">{dictionary.photoCaption}</figcaption>
          </figure>

          <h3 className="mt-8 font-serif text-3xl leading-tight text-ink">{dictionary.achievementTitle}</h3>
          <p
            className="mt-4 max-w-2xl leading-relaxed text-ink-soft"
            dangerouslySetInnerHTML={{ __html: dictionary.achievementDesc }}
          />
          <a
            href="https://www.facebook.com/photo/?fbid=1169531118294064&set=a.193826049197914"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink"
          >
            <span className="underline decoration-line underline-offset-4 group-hover:decoration-clay">
              {dictionary.facebookLink}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>

        {/* Books */}
        <Reveal delay={0.05} className="lg:col-span-5">
          <h3 className="font-serif text-3xl text-ink">{stripEmoji(dictionary.booksTitle)}</h3>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {dictionary.books.map((book, i) => (
              <li key={book.title} className="flex items-baseline gap-4 py-4">
                <span className="w-6 flex-shrink-0 font-mono text-xs text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-serif text-lg italic leading-snug text-ink">{book.title}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{book.author}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
