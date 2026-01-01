'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, BookOpen, Globe, Trophy } from 'lucide-react'

// Map icons to keys
const icons = {
  Kognitywistyka: Brain,
  'Cognitive Science': Brain,
  'AI & LLMs': BookOpen,
  Erasmus: Globe,
  Osiągnięcia: Trophy,
  Achievements: Trophy,
}

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Helper to get icon based on title (fallback to Brain if not found)
  const getIcon = (title: string) => {
    // @ts-ignore
    return icons[title] || Brain
  }

  return (
    <section id="about" className="relative py-20" ref={ref}>
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {dictionary.whoAmI}
              </h3>
              <div className="space-y-4 text-gray-300">
                <p dangerouslySetInnerHTML={{ __html: dictionary.description1 }} />
                <p dangerouslySetInnerHTML={{ __html: dictionary.description2 }} />
                <p dangerouslySetInnerHTML={{ __html: dictionary.description3 }} />
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div>
            {/* Interests grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {dictionary.interests.map((item, index) => {
                const Icon = getIcon(item.title)
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="glass-card p-6 rounded-xl card-hover group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20
                                  flex items-center justify-center mb-4 group-hover:shadow-glow-sm transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
