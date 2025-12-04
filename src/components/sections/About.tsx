'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, BookOpen, Globe, Trophy } from 'lucide-react'
import Image from 'next/image'

const interests = [
  {
    icon: Brain,
    title: 'Kognitywistyka',
    description: 'Fascynują mnie algorytmy uczenia maszynowego, futurologia, modelowanie i nauki kognitywne.',
  },
  {
    icon: BookOpen,
    title: 'AI & LLMs',
    description: 'Tworzę systemy oparte o Large Language Models i Retrieval-Augmented Generation.',
  },
  {
    icon: Globe,
    title: 'Erasmus',
    description: 'Rozwijam się na wymianie w University of the Basque Country w Hiszpanii.',
  },
  {
    icon: Trophy,
    title: 'Osiągnięcia',
    description: 'Zwycięzca konkursu "Praca jak ze snu" z Just Join IT.',
  },
]

const books = [
  {
    title: 'Mózg na detoksie',
    author: 'David Perlmutter',
    emoji: '🧠',
  },
  {
    title: '21 lekcji na XXI wiek',
    author: 'Yuval Noah Harari',
    emoji: '📚',
  },
  {
    title: 'Jak działa umysł',
    author: 'Steven Pinker',
    emoji: '💭',
  },
  {
    title: 'Deep Learning: Głęboka Rewolucja',
    author: 'Ian Goodfellow',
    emoji: '🤖',
  },
  {
    title: 'The Last Economy',
    author: 'Emad Mostaque',
    emoji: '💹',
  },
  {
    title: 'Osobliwość coraz bliżej',
    author: 'Ray Kurzweil',
    emoji: '🚀',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">O mnie</h2>
          <p className="section-subtitle mx-auto">
            Poznaj mnie bliżej - moje zainteresowania, inspiracje i to, co mnie napędza.
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
                Kim jestem?
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Jestem studentem <span className="text-primary-400 font-medium">Kognitywistyki</span> na 
                  Uniwersytecie Warszawskim, pasjonującym się sztuczną inteligencją, 
                  Large Language Models i rozumowaniem opartym na danych.
                </p>
                <p>
                  Mam doświadczenie w <span className="text-primary-400 font-medium">Pythonie</span>, 
                  analizie danych i dokumentacji technicznej. Specjalizuję się w tworzeniu 
                  workflow AI i integrowaniu modeli językowych w praktyczne systemy.
                </p>
                <p>
                  Aktualnie realizuję wymianę <span className="text-primary-400 font-medium">Erasmus</span> na 
                  University of the Basque Country w Hiszpanii, poszerzając swoje horyzonty 
                  w naukach kognitywnych i obliczeniowych.
                </p>
              </div>
            </div>

            {/* Achievement highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6 rounded-2xl border-l-4 border-yellow-500"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">🏆</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Zwycięzca konkursu "Praca jak ze snu"
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    We współpracy z Just Join IT. W ramach wygranej brałem udział w nagrywaniu 
                    filmu dokumentalnego o startupie <span className="text-primary-400">FinalSpark</span> - 
                    tworzącym pierwszy komputer wykorzystujący ludzkie neurony do obliczeń!
                  </p>
                  <a 
                    href="https://www.facebook.com/photo/?fbid=1169531118294064&set=a.193826049197914" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                  >
                    🗺️ Zobacz więcej na Facebooku →
                  </a>
                </div>
              </div>
              
              {/* Switzerland photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 rounded-xl overflow-hidden"
              >
                <Image
                  src="/images/szwajcaria.jpg"
                  alt="Wycieczka do Szwajcarii - FinalSpark"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">📍 Szwajcaria - wizyta w FinalSpark</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Interests grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {interests.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="glass-card p-6 rounded-xl card-hover group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20
                                flex items-center justify-center mb-4 group-hover:shadow-glow-sm transition-all duration-300">
                    <item.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Books section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                📖 Książki, które mnie inspirują
              </h4>
              <div className="space-y-3">
                {books.map((book, index) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl">{book.emoji}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{book.title}</p>
                      <p className="text-gray-500 text-xs">{book.author}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
