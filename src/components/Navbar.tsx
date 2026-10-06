'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  lang: string
  dictionary: {
    home: string
    about: string
    cv: string
    experience: string
    skills: string
    projects: string
    blog: string
    aiProgres: string
    contact: string
  }
}

export default function Navbar({ lang, dictionary }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: dictionary.about, href: `/${lang}/#about` },
    { name: dictionary.experience, href: `/${lang}/#experience` },
    { name: dictionary.projects, href: `/${lang}/#projects` },
    { name: dictionary.skills, href: `/${lang}/#skills` },
    { name: dictionary.cv, href: `/${lang}/#cv` },
    { name: dictionary.blog, href: `/${lang}/blog` },
    { name: dictionary.aiProgres, href: `/${lang}/ai-progres` },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen ? 'bg-ivory/90 backdrop-blur-md border-b border-line' : 'bg-ivory border-b border-transparent'
      }`}
    >
      <nav className="page flex h-16 items-center justify-between gap-6">
        <Link href={`/${lang}`} className="flex items-center gap-2.5 text-ink" onClick={() => setIsOpen(false)}>
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="whitespace-nowrap font-serif text-[1.05rem] tracking-tight sm:text-lg">Wojciech Soczyński</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-oat hover:text-ink"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href={`/${lang}/#contact`} className="btn-primary">
            {dictionary.contact}
          </Link>
        </div>

        <div className="lg:hidden -mr-2 flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 text-ink hover:bg-oat"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-line bg-ivory"
          >
            <div className="page py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block border-b border-line py-3.5 font-serif text-xl text-ink"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-5 pb-2">
                <LanguageSwitcher />
                <Link href={`/${lang}/#contact`} onClick={() => setIsOpen(false)} className="btn-primary">
                  {dictionary.contact}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
