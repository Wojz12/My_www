'use client'

import { Reveal, SectionHeader, stripEmoji } from '@/components/ui'

interface ExperienceProps {
  dictionary: {
    title: string
    subtitle: string
    workTitle: string
    educationTitle: string
    languagesTitle: string
    present: string
    currently: string
    experiences: {
      title: string
      company: string
      location: string
      period: string
      description: string
      highlights: string[]
    }[]
    educationList: {
      degree: string
      school: string
      location?: string
      period: string
    }[]
    languages: {
      name: string
      level: string
    }[]
  }
}

export default function Experience({ dictionary }: ExperienceProps) {
  return (
    <section id="experience" className="page section">
      <SectionHeader index="02" title={dictionary.title} subtitle={dictionary.subtitle} />

      {/* Work */}
      <Reveal>
        <h3 className="eyebrow mb-2">{dictionary.workTitle}</h3>
      </Reveal>
      <ol className="divide-y divide-line border-y border-line">
        {dictionary.experiences.map((exp, index) => (
          <li key={exp.title + exp.company}>
            <Reveal delay={0.03 * index} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="md:col-span-3">
                <p className="font-mono text-xs text-ink-muted">{exp.period}</p>
                {index === 0 && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-clay-dark">
                    <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                    {dictionary.currently}
                  </p>
                )}
              </div>
              <div className="md:col-span-9">
                <h4 className="font-serif text-2xl leading-snug text-ink">{exp.title}</h4>
                <p className="mt-1 text-sm text-ink-muted">
                  {exp.company} <span className="text-line">·</span> {exp.location}
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-4 max-w-3xl space-y-2">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <span className="mt-[0.6em] h-px w-3 flex-shrink-0 bg-clay" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Education + languages */}
      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <h3 className="eyebrow mb-6">{stripEmoji(dictionary.educationTitle)}</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {dictionary.educationList.map((edu, index) => (
              <li key={edu.degree} className="card-oat p-6">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-serif text-lg leading-snug text-ink">{edu.degree}</h4>
                  {index <= 1 && (
                    <span className="mt-1 whitespace-nowrap rounded-full bg-ivory px-2 py-0.5 text-[11px] font-medium text-clay-dark">
                      {dictionary.present}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-ink-soft">{edu.school}</p>
                <p className="mt-3 font-mono text-xs text-ink-faint">
                  {edu.location ? `${edu.location} · ` : ''}
                  {edu.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-4">
          <h3 className="eyebrow mb-6">{stripEmoji(dictionary.languagesTitle)}</h3>
          <ul className="divide-y divide-line border-y border-line">
            {dictionary.languages.map((lang) => (
              <li key={lang.name} className="flex items-baseline justify-between gap-4 py-3.5">
                <span className="text-ink">{lang.name}</span>
                <span className="text-right text-sm text-ink-muted">{lang.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
