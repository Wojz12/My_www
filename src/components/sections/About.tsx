'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Rocket, Coffee } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Piszę czytelny, dobrze udokumentowany kod z myślą o przyszłości.',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Tworzę estetyczne interfejsy z dbałością o każdy detal.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optymalizuję aplikacje pod kątem szybkości i wydajności.',
  },
  {
    icon: Coffee,
    title: 'Pasja',
    description: 'Programowanie to moja pasja, nie tylko praca.',
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
            Poznaj mnie bliżej - moją historię, pasje i to, co mnie napędza do tworzenia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Kim jestem?
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Jestem Full-Stack Developerem z wieloletnim doświadczeniem w tworzeniu 
                  nowoczesnych aplikacji webowych. Specjalizuję się w technologiach 
                  JavaScript/TypeScript, React, Next.js oraz Node.js.
                </p>
                <p>
                  Moją pasją jest tworzenie rozwiązań, które łączą piękny design 
                  z wysoką funkcjonalnością. Wierzę, że kod powinien być nie tylko 
                  działający, ale również elegancki i łatwy w utrzymaniu.
                </p>
                <p>
                  Poza programowaniem interesuję się nowymi technologiami, 
                  uczeniem maszynowym i rozwojem osobistym. Lubię również 
                  dzielić się wiedzą poprzez pisanie bloga i mentoring.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold gradient-text">5+</div>
                    <div className="text-sm text-gray-400">Lat doświadczenia</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">50+</div>
                    <div className="text-sm text-gray-400">Projektów</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">20+</div>
                    <div className="text-sm text-gray-400">Zadowolonych klientów</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
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
        </div>
      </div>
    </section>
  )
}

