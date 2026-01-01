'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, Database, Brain, MessageCircle, Folder } from 'lucide-react'

// Icon mapping based on project title references or fixed order
// Since titles are translated, we might need a more robust way, but for now matching by key words or index is okay if structure aligns.
// Better approach: The dictionary just has text. We keep the logic/icons here.
// Let's assume the order in dictionary matches. But dictionary is object with list.
// We can try to map by "similar" English title if we had keys, but we have lists.
// A safe bet is to assume the order in JSON matches the order of icons defined here.
const projectIcons = [Brain, Database, MessageCircle]

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

// metadata for projects that isn't translatable (links, technologies, visual flags)
const projectsMeta = [
  {
    icon: Brain,
    technologies: ['Python', 'LLMs', 'Open Source', 'Git', 'API Integration'],
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    icon: Database,
    technologies: ['Python', 'Transformers', 'BM25', 'CrossEncoder', 'TinyLlama', 'HuggingFace'],
    githubUrl: 'https://github.com/Wojz12/RAG_LLM_project',
    featured: true,
  },
  {
    icon: MessageCircle,
    technologies: ['Python', 'Google Gemini API', 'Docker', 'JSON'],
    githubUrl: 'https://github.com/Wojz12/AssigmentProject2025ApiLLM',
    featured: true,
  },
]

export default function Projects({ dictionary }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Combine dictionary data with metadata
  const allProjects = dictionary.projectList.map((proj, index) => ({
    ...proj,
    ...projectsMeta[index]
  }))

  const featuredProjects = allProjects.filter((p) => p.featured)
  const otherProjects = allProjects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{dictionary.title}</h2>
          <p className="section-subtitle mx-auto">
            {dictionary.subtitle}
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

                {/* Architecture diagram for RAG project - simple check if title contains RAG or we look at index 1 */}
                {index === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-black/30 rounded-xl overflow-x-auto"
                  >
                    <p className="text-xs text-gray-500 mb-2">{dictionary.architectureTitle}</p>
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
            <h3 className="text-xl font-semibold text-white mb-6 text-center">{dictionary.otherProjectsTitle}</h3>
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
