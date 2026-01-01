'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bot, Zap, Code2, Database, Sparkles, Terminal } from 'lucide-react'

// Map icons to list order or titles
const toolIcons = [Sparkles, Terminal, Code2, Zap, Database, Bot]

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ai-tools" className="relative py-20" ref={ref}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dictionary.tools.map((tool, index) => {
            const Icon = toolIcons[index] || Bot
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl group hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {tool.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
