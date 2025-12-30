'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bot, Zap, Code2, Database, Sparkles, Terminal } from 'lucide-react'

const aiTools = [
  {
    title: 'Vibe Engineering',
    description: 'Filozofia pracy z AI, która stawia na intuicję i flow. Wykorzystywanie LLM jako kreatywnego partnera, a nie tylko narzędzia do generowania kodu.',
    icon: Sparkles,
  },
  {
    title: 'Cursor AI',
    description: 'Mój główny edytor kodu. AI-native IDE, które rewolucjonizuje sposób pisania oprogramowania, pozwalając na edycję całych plików i refaktoryzację w języku naturalnym.',
    icon: Terminal,
  },
  {
    title: 'Replit',
    description: 'Szybkie prototypowanie i wdrażanie aplikacji w chmurze. Idealne środowisko do testowania pomysłów i dzielenia się kodem bez konfiguracji środowiska.',
    icon: Code2,
  },
  {
    title: 'Lovable',
    description: 'Narzędzie do tworzenia interfejsów użytkownika wspierane przez AI. Pozwala przekształcać pomysły w piękny, funkcjonalny kod React/Tailwind w mgnieniu oka.',
    icon: Zap,
  },
  {
    title: 'Supabase',
    description: 'Backend-as-a-Service, który idealnie integruje się z nowoczesnym stackiem AI. Baza danych Postgres, uwierzytelnianie i wektoryzacja danych w jednym miejscu.',
    icon: Database,
  },
  {
    title: 'Google Antigravity',
    description: 'Eksperymentalne i zaawansowane systemy AI od Google. Wykorzystuję najnowsze osiągnięcia w dziedzinie modeli językowych i agentów autonomicznych.',
    icon: Bot,
  },
]

export default function AiTools() {
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
          <h2 className="section-title">Jak używam AI</h2>
          <p className="section-subtitle mx-auto">
            Mój stack technologiczny i podejście do tworzenia oprogramowania w erze sztucznej inteligencji.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <tool.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
