'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { EASE } from '@/components/ui'

interface HeroProps {
  lang: string
  dictionary: {
    badge: string
    greeting: string
    description: string
    viewProjects: string
    contact: string
    scroll: string
  }
}

const socials = [
  { href: 'https://github.com/Wojz12', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/wojciechsoczy%C5%84ski/', label: 'LinkedIn' },
  { href: 'mailto:soczynskiwojtek@gmail.com', label: 'Email' },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
})

export default function Hero({ lang, dictionary }: HeroProps) {
  return (
    <section className="page pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow mb-8 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            {dictionary.badge}
          </motion.p>

          <motion.h1
            {...fadeUp(0.05)}
            className="display text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            {dictionary.greeting}{' '}
            <span className="italic text-ink">Wojciech Soczyński</span>
          </motion.h1>

          <motion.p {...fadeUp(0.12)} className="lead mt-8 max-w-xl">
            {dictionary.description}
          </motion.p>

          <motion.div {...fadeUp(0.18)} className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={`/${lang}/#projects`} className="btn-primary">
              {dictionary.viewProjects}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/${lang}/#contact`} className="btn-secondary">
              {dictionary.contact}
            </Link>
          </motion.div>

          <motion.ul {...fadeUp(0.24)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-oat lg:max-w-none">
            <Image
              src="/images/profile.jpg"
              alt="Wojciech Soczyński"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="mx-auto mt-4 flex max-w-sm flex-wrap gap-2 lg:max-w-none">
            {['LLMs', 'Python', 'RAG'].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
