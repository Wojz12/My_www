'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Download, Eye } from 'lucide-react'

export default function CV() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cv" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">CV</h2>
          <p className="section-subtitle mx-auto">
            Pobierz moje CV lub zobacz je online, aby poznać moje pełne doświadczenie zawodowe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 rounded-2xl text-center">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/20
                          flex items-center justify-center shadow-glow">
              <FileText className="w-12 h-12 text-primary-400" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Moje CV
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Dokument zawiera szczegółowe informacje o moim wykształceniu, 
              doświadczeniu zawodowym, umiejętnościach technicznych i projektach.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cv/cv.pdf"
                download
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Pobierz PDF
              </a>
              <a
                href="/cv/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Zobacz online
              </a>
            </div>
          </div>

          {/* CV Preview Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 glass-card p-8 rounded-2xl"
          >
            <h4 className="text-xl font-semibold text-white mb-6 text-center">
              Szybki podgląd
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="space-y-4">
                <h5 className="text-primary-400 font-medium flex items-center gap-2">
                  🎓 Wykształcenie
                </h5>
                <div className="space-y-3">
                  <div className="pl-4 border-l-2 border-primary-500/30">
                    <p className="text-white font-medium">Kognitywistyka</p>
                    <p className="text-sm text-gray-400">Uniwersytet Warszawski • do 2026</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary-500/30">
                    <p className="text-white font-medium">Erasmus Exchange</p>
                    <p className="text-sm text-gray-400">University of the Basque Country • 2025</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary-500/30">
                    <p className="text-white font-medium">Certyfikaty NVIDIA</p>
                    <p className="text-sm text-gray-400">LLM Applications, RAG Agents</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <h5 className="text-primary-400 font-medium flex items-center gap-2">
                  🌍 Języki
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Polski</span>
                    <span className="text-sm text-primary-400">Ojczysty</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Angielski</span>
                    <span className="text-sm text-primary-400">CAE (C1)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

