'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award } from 'lucide-react'

// Map icons to keys
const categoryIcons = {
  'Programowanie & AI': '🐍',
  'Programming & AI': '🐍',
  'Narzędzia AI': '🤖',
  'AI Tools': '🤖',
  'Inne narzędzia': '🛠️',
  'Other Tools': '🛠️',
  'Soft Skills': '💡',
}

const certificateIcons = {
  'Building LLM Applications With Prompt Engineering': '🟢',
  'Building RAG Agents with LLMs': '🟢',
  'Cambridge English Advanced (CAE)': '🔵',
}

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

export default function Skills({ dictionary }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // @ts-ignore
  const getCategoryIcon = (title: string) => categoryIcons[title] || '🔧'
  // @ts-ignore
  const getCertificateIcon = (name: string) => certificateIcons[name] || '📜'

  return (
    <section id="skills" className="relative py-20" ref={ref}>
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {dictionary.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{getCategoryIcon(category.title)}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="px-4 py-2 rounded-xl bg-primary-500/10 text-primary-300 border border-primary-500/20 text-sm font-medium hover:bg-primary-500/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-8 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary-400" />
            {dictionary.certificatesTitle}
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            {dictionary.certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <span className="text-2xl mb-2 block">{getCertificateIcon(cert.name)}</span>
                <h4 className="text-white font-medium text-sm mb-1">{cert.name}</h4>
                <p className="text-gray-500 text-xs">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <h4 className="text-lg font-medium text-gray-400 mb-6">{dictionary.learningTitle}</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'LangChain', 'Vector Databases', 'Transformers', 'Fine-tuning',
              'Agent Systems', 'Semantic Search', 'NLP'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.03 }}
                className="px-4 py-2 glass-card rounded-full text-sm text-gray-300 hover:text-white hover:border-primary-500/50 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
