'use client'

import { Reveal, SectionHeader } from '@/components/ui'

interface SkillsProps {
  dictionary: {
    title: string
    subtitle: string
    categories: {
      title: string
      skills: string[]
    }[]
    certificatesTitle: string
    certificates: {
      name: string
      issuer: string
    }[]
    learningTitle: string
  }
}

const learning = ['LangChain', 'Vector Databases', 'Transformers', 'Fine-tuning', 'Agent Systems', 'Semantic Search', 'NLP']

export default function Skills({ dictionary }: SkillsProps) {
  return (
    <section id="skills" className="page section">
      <SectionHeader index="04" title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="divide-y divide-line border-y border-line">
        {dictionary.categories.map((category, i) => (
          <Reveal key={category.title} delay={0.03 * i} className="grid gap-4 py-7 md:grid-cols-12 md:gap-8">
            <h3 className="font-serif text-xl text-ink md:col-span-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2 md:col-span-8">
              {category.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-oat px-3.5 py-1.5 text-sm text-ink-soft">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <h3 className="eyebrow mb-6">{dictionary.certificatesTitle}</h3>
          <ul className="grid gap-4 sm:grid-cols-3">
            {dictionary.certificates.map((cert) => (
              <li key={cert.name} className="card flex flex-col justify-between p-5">
                <h4 className="text-[0.95rem] font-medium leading-snug text-ink">{cert.name}</h4>
                <p className="mt-6 font-mono text-xs text-ink-faint">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-4">
          <h3 className="eyebrow mb-6">{dictionary.learningTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {learning.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
