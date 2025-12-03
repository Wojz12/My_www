'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, Database, Brain } from 'lucide-react'

const projects = [
  {
    title: 'Open-Domain QA with RAG (TriviaQA)',
    description: 'System Retrieval-Augmented Generation do odpowiadania na pytania w otwartej domenie. Architektura: BM25 Retrieval → CrossEncoder Reranking → TinyLlama Generation.',
    longDescription: `
      Projekt implementujący pełny pipeline RAG dla Question Answering:
      • BM25 sparse retrieval do wyszukiwania dokumentów
      • CrossEncoder (MS-MARCO) do reranking top-10 → top-3
      • TinyLlama-1.1B-Chat do generowania odpowiedzi
    `,
    icon: Database,
    technologies: ['Python', 'Transformers', 'BM25', 'CrossEncoder', 'TinyLlama', 'HuggingFace'],
    githubUrl: 'https://github.com/Wojz12/RAG_LLM_project',
    featured: true,
  },
  {
    title: 'Hexdag Contributions',
    description: 'Wkład w rozwój open-source frameworka do orkiestracji agentów AI w firmie OMNIVISER.',
    longDescription: `
      Mój wkład w projekt Hexdag obejmuje:
      • Tworzenie modułów Python do zarządzania zadaniami i przepływem pracy (flow management)
      • Implementacja integracji z zewnętrznymi narzędziami i API
      • Bezpieczne parsowanie i ekstrakcja danych z odpowiedzi LLM
      • Tworzenie dokumentacji technicznej i przykładów użycia
      • Code reviews i współpraca przy pull requestach
    `,
    icon: Brain,
    technologies: ['Python', 'LLMs', 'Open Source', 'Git', 'API Integration'],
    githubUrl: 'https://github.com',
    featured: true,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Projekty</h2>
          <p className="section-subtitle mx-auto">
            Projekty, które pokazują moje umiejętności w AI i programowaniu.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-8 h-8 text-primary-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    </div>

                    <p className="text-gray-300 mb-4">{project.description}</p>

                    {project.longDescription && (
                      <div className="bg-black/20 rounded-xl p-4 mb-4">
                        <pre className="text-sm text-gray-400 whitespace-pre-wrap font-sans">
                          {project.longDescription.trim()}
                        </pre>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architecture diagram for RAG project */}
                {project.title.includes('RAG') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-black/30 rounded-xl overflow-x-auto"
                  >
                    <p className="text-xs text-gray-500 mb-2">Architektura systemu:</p>
                    <pre className="text-xs text-primary-300 font-mono">
{`┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Query     │ ──► │    BM25     │ ──► │  Reranker   │ ──► │  TinyLlama  │
│             │     │  Retriever  │     │ CrossEncoder│     │  Generator  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                         │                    │                    │
                    Top-10 docs          Top-3 docs            Answer`}
                    </pre>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Inne projekty</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group glass-card p-6 rounded-xl card-hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center">
                      <Folder className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
