'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Delikatne pojawienie się elementu przy przewijaniu
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Nagłówek sekcji: numer + tytuł po lewej, podtytuł po prawej
export function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index?: string
  title: string
  subtitle?: string
}) {
  return (
    <Reveal className="section-head">
      <div className="md:col-span-5">
        {index && <p className="eyebrow mb-4">{index}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle && (
        <div className="md:col-span-6 md:col-start-7 md:pt-9">
          <p className="section-subtitle">{subtitle}</p>
        </div>
      )}
    </Reveal>
  )
}

// Usuwa emoji z początku nagłówków ze słownika (np. "🎓 Wykształcenie")
export const stripEmoji = (s: string) => s.replace(/^[^A-Za-z0-9À-ž]+/, '')
