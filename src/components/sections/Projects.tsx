'use client'

import { ArrowUpRight, Github } from 'lucide-react'
import { Fragment } from 'react'
import { Reveal, SectionHeader } from '@/components/ui'

interface ProjectsProps {
  dictionary: {
    title: string
    subtitle: string
    otherProjectsTitle: string
    architectureTitle: string
    projectList: {
      title: string
      description: string
      longDescription: string
    }[]
  }
}

// Metadane projektów, których się nie tłumaczy (kolejność = kolejność w słowniku)
const projectsMeta = [
  {
    technologies: ['Python', 'LLMs', 'Open Source', 'Git', 'API Integration'],
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    technologies: ['Python', 'Transformers', 'BM25', 'CrossEncoder', 'TinyLlama', 'HuggingFace'],
    githubUrl: 'https://github.com/Wojz12/RAG_LLM_project',
    featured: true,
    architecture: [
      { name: 'Query', detail: '' },
      { name: 'BM25', detail: 'Retriever', out: 'Top-10 docs' },
      { name: 'Reranker', detail: 'CrossEncoder', out: 'Top-3 docs' },
      { name: 'TinyLlama', detail: 'Generator', out: 'Answer' },
    ],
  },
  {
    technologies: ['Python', 'Google Gemini API', 'Docker', 'JSON'],
    githubUrl: 'https://github.com/Wojz12/AssigmentProject2025ApiLLM',
    featured: true,
  },
]

export default function Projects({ dictionary }: ProjectsProps) {
  const allProjects = dictionary.projectList.map((proj, index) => ({
    ...proj,
    ...projectsMeta[index],
  }))

  const featuredProjects = allProjects.filter((p) => p.featured)
  const otherProjects = allProjects.filter((p) => !p.featured)

  return (
    <section id="projects" className="page section">
      <SectionHeader index="03" title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="space-y-6">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.title} delay={0.04 * index}>
            <article className="card-oat p-6 sm:p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-5">
                  <p className="eyebrow mb-5">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-serif text-3xl leading-tight text-ink md:text-[2.1rem]">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{project.description}</p>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink"
                    >
                      <Github className="h-4 w-4" />
                      <span className="underline decoration-line underline-offset-4 group-hover:decoration-clay">
                        GitHub
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>

                <div className="md:col-span-7">
                  {project.longDescription && (
                    <p className="whitespace-pre-line text-[0.95rem] leading-relaxed text-ink-muted">
                      {project.longDescription.trim()}
                    </p>
                  )}

                  {project.architecture && (
                    <div className="mt-8">
                      <p className="eyebrow mb-4">{dictionary.architectureTitle}</p>
                      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                        {project.architecture.map((step, i) => (
                          <Fragment key={step.name}>
                            {i > 0 && (
                              <span aria-hidden className="self-center font-mono text-ink-faint sm:rotate-0 rotate-90">
                                →
                              </span>
                            )}
                            <div className="flex-1 rounded-xl border border-line bg-ivory px-3 py-3 text-center">
                              <p className="text-sm font-medium text-ink">{step.name}</p>
                              {step.detail && <p className="text-xs text-ink-muted">{step.detail}</p>}
                              {step.out && <p className="mt-1 font-mono text-[10px] text-clay-dark">{step.out}</p>}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-16">
          <h3 className="eyebrow mb-6">{dictionary.otherProjectsTitle}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <a
                key={project.title}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card group p-6 transition-colors hover:bg-oat"
              >
                <h4 className="font-serif text-xl text-ink">{project.title}</h4>
                <p className="mt-2 text-sm text-ink-muted">{project.description}</p>
                <p className="mt-4 font-mono text-xs text-ink-faint">{project.technologies.slice(0, 3).join(' · ')}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
