'use client'

import { Reveal, SectionHeader } from '@/components/ui'

interface AiToolsProps {
  dictionary: {
    title: string
    subtitle: string
    tools: {
      title: string
      description: string
    }[]
  }
}

export default function AiTools({ dictionary }: AiToolsProps) {
  return (
    <section id="ai-tools" className="page section">
      <SectionHeader index="05" title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {dictionary.tools.map((tool, index) => (
          <Reveal key={tool.title} delay={0.04 * index} className="h-full bg-ivory p-7 md:p-8">
            <p className="eyebrow mb-8">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mb-3 font-serif text-2xl text-ink">{tool.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{tool.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
