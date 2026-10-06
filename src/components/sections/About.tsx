'use client'

import { Reveal, SectionHeader } from '@/components/ui'

interface AboutProps {
  dictionary: {
    title: string
    subtitle: string
    whoAmI: string
    description1: string
    description2: string
    description3: string
    interests: {
      title: string
      description: string
    }[]
  }
}

export default function About({ dictionary }: AboutProps) {
  return (
    <section id="about" className="page section">
      <SectionHeader index="01" title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <h3 className="font-serif text-2xl text-ink">{dictionary.whoAmI}</h3>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-7 space-y-5 lead">
          <p dangerouslySetInnerHTML={{ __html: dictionary.description1 }} />
          <p dangerouslySetInnerHTML={{ __html: dictionary.description2 }} />
          <p dangerouslySetInnerHTML={{ __html: dictionary.description3 }} />
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.interests.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05} className="h-full bg-ivory p-6 md:p-7">
            <p className="eyebrow mb-6">0{index + 1}</p>
            <h4 className="mb-2 font-serif text-xl text-ink">{item.title}</h4>
            <p className="text-sm leading-relaxed text-ink-muted">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
