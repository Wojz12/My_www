'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Download, Eye } from 'lucide-react'

interface CVProps {
  dictionary: {
    title: string
    subtitle: string
    downloadTitle: string
    downloadDesc: string
    downloadBtn: string
    viewBtn: string
    previewTitle: string
    educationTitle: string
    education: {
      title: string
      desc: string
    }[]
    languagesTitle: string
    languages: {
      name: string
      level: string
    }[]
  }
}

export default function CV({ dictionary }: CVProps) {
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
          <h2 className="section-title">{dictionary.title}</h2>
          <p className="section-subtitle mx-auto">
            {dictionary.subtitle}
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
              {dictionary.downloadTitle}
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              {dictionary.downloadDesc}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cv/cv.pdf"
                download
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {dictionary.downloadBtn}
              </a>
              <a
                href="/cv/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {dictionary.viewBtn}
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
              {dictionary.previewTitle}
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="space-y-4">
                <h5 className="text-primary-400 font-medium flex items-center gap-2">
                  {dictionary.educationTitle}
                </h5>
                <div className="space-y-3">
                  {dictionary.education.map((edu, i) => (
                    <div key={i} className="pl-4 border-l-2 border-primary-500/30">
                      <p className="text-white font-medium">{edu.title}</p>
                      <p className="text-sm text-gray-400">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <h5 className="text-primary-400 font-medium flex items-center gap-2">
                  {dictionary.languagesTitle}
                </h5>
                <div className="space-y-3">
                  {dictionary.languages.map((lang, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-300">{lang.name}</span>
                      <span className="text-sm text-primary-400">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

