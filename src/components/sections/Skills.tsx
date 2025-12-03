'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award } from 'lucide-react'

const skillCategories = [
  {
    title: 'Programowanie & AI',
    icon: '🐍',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'LLMs (Large Language Models)', level: 80 },
      { name: 'Prompt Engineering', level: 85 },
      { name: 'RAG Systems', level: 75 },
      { name: 'Git', level: 80 },
    ],
  },
  {
    title: 'Narzędzia AI',
    icon: '🤖',
    skills: [
      { name: 'ChatGPT', level: 90 },
      { name: 'Cursor AI', level: 85 },
      { name: 'Hugging Face', level: 70 },
      { name: 'LangChain', level: 65 },
    ],
  },
  {
    title: 'Inne narzędzia',
    icon: '🛠️',
    skills: [
      { name: 'MS Office', level: 90 },
      { name: 'Technical Documentation', level: 85 },
      { name: 'Data Analysis', level: 75 },
    ],
  },
  {
    title: 'Soft Skills',
    icon: '💡',
    skills: [
      { name: 'Problem Solving', level: 90 },
      { name: 'Technical Writing', level: 85 },
      { name: 'Teaching & Mentoring', level: 88 },
      { name: 'Communication', level: 85 },
    ],
  },
]

const certificates = [
  {
    name: 'Building LLM Applications With Prompt Engineering',
    issuer: 'NVIDIA',
    icon: '🟢',
  },
  {
    name: 'Building RAG Agents with LLMs',
    issuer: 'NVIDIA',
    icon: '🟢',
  },
  {
    name: 'Cambridge English Advanced (CAE)',
    issuer: 'Cambridge',
    icon: '🔵',
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Umiejętności</h2>
          <p className="section-subtitle mx-auto">
            Technologie i narzędzia, które wykorzystuję w codziennej pracy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                      />
                    </div>
                  </motion.div>
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
            Certyfikaty
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <span className="text-2xl mb-2 block">{cert.icon}</span>
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
          <h4 className="text-lg font-medium text-gray-400 mb-6">Obecnie uczę się</h4>
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
