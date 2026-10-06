'use client'

import { Download, ArrowUpRight } from 'lucide-react'
import { Reveal, SectionHeader, stripEmoji } from '@/components/ui'

interface CVProps {
  dictionary: {
    title: string
    subtitle: string
    downloadTitle: string
    downloadDesc: string
    downloadBtn: string
    viewBtn: string
    previewTitle: string
    educationTitle: string
    education: {
      title: string
      desc: string
    }[]
    languagesTitle: string
    languages: {
      name: string
      level: string
    }[]
  }
}


export default function CV({ dictionary }: CVProps) {
  return (
    <section id="cv" className="page section">
      <SectionHeader index="06" title={dictionary.title} subtitle={dictionary.subtitle} />

      <Reveal>
        <div className="overflow-hidden rounded-[1.75rem] bg-ink text-ivory">
          <div className="grid gap-10 p-8 sm:p-10 md:grid-cols-12 md:p-14">
            <div className="md:col-span-7">
              <h3 className="font-serif text-3xl md:text-4xl">{dictionary.downloadTitle}</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-ivory/70">{dictionary.downloadDesc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/cv/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-oat"
                >
                  <Download className="h-4 w-4" />
                  {dictionary.downloadBtn}
                </a>
                <a
                  href="/cv/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-ivory/60"
                >
                  {dictionary.viewBtn}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ivory/50">{dictionary.previewTitle}</p>

              <p className="mt-6 text-sm font-medium text-clay">{stripEmoji(dictionary.educationTitle)}</p>
              <ul className="mt-3 space-y-3">
                {dictionary.education.map((edu, i) => (
                  <li key={i}>
                    <p className="text-ivory">{edu.title}</p>
                    <p className="text-sm text-ivory/60">{edu.desc}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-medium text-clay">{stripEmoji(dictionary.languagesTitle)}</p>
              <ul className="mt-3 divide-y divide-ivory/10">
                {dictionary.languages.map((lang, i) => (
                  <li key={i} className="flex justify-between gap-4 py-2 text-sm">
                    <span className="text-ivory">{lang.name}</span>
                    <span className="text-ivory/60">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
