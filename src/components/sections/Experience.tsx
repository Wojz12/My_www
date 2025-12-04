'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react'

const experiences = [
  {
    title: 'AI Intern',
    company: 'OMNIVISER',
    location: 'Warszawa',
    period: '08/2024 - 11/2024',
    description: 'Współtworzenie Hexdag - open-source frameworka do orkiestracji agentów AI. Tworzenie modułów Python do zarządzania zadaniami, integracji narzędzi i bezpiecznego parsowania LLM.',
    highlights: [
      'Rozwój frameworka Hexdag dla AI agents',
      'Moduły Python do task & flow management',
      'Dokumentacja techniczna komponentów',
      'Code reviews i pull requests',
    ],
    technologies: ['Python', 'LLMs', 'Git', 'Open Source'],
    current: false,
  },
  {
    title: 'Office Assistant & Technical Support',
    company: 'Reago Training',
    location: 'Warszawa',
    period: '01/2023 - 11/2025',
    description: 'Szkolenie personelu medycznego z obsługi symulatorów high-fidelity. Tłumaczenie instrukcji technicznych urządzeń medycznych (EN→PL).',
    highlights: [
      'Szkolenia z symulatorów medycznych',
      'Tłumaczenia techniczne EN→PL',
      'Weryfikacja dostaw sprzętu medycznego',
      'Wsparcie na konferencjach i warsztatach',
    ],
    technologies: ['Technical Documentation', 'Training', 'Translation'],
    current: false,
  },
  {
    title: 'Korepetytor Matematyki',
    company: 'Korepetycje prywatne',
    location: 'Warszawa',
    period: '01/2022 - 11/2025',
    description: 'Prowadzenie indywidualnych lekcji matematyki. Tworzenie spersonalizowanych planów nauki i adaptacja metod nauczania do potrzeb uczniów.',
    highlights: [
      'Indywidualne plany lekcji',
      'Analiza postępów uczniów',
      'Adaptacja metod nauczania',
    ],
    technologies: ['Teaching', 'Mathematics', 'Problem Solving'],
    current: false,
  },
]

const education = [
  {
    degree: 'Kognitywistyka',
    school: 'Uniwersytet Warszawski',
    period: 'do 06/2026',
    current: true,
  },
  {
    degree: 'Erasmus Exchange Program',
    school: 'University of the Basque Country (UPV/EHU)',
    location: 'Hiszpania',
    period: '09/2025',
    current: true,
  },
  {
    degree: 'Profil Matematyczno-Społeczny',
    school: 'VIII LO im. Władysława IV',
    period: 'do 05/2023',
    current: false,
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Doświadczenie</h2>
          <p className="section-subtitle mx-auto">
            Moja ścieżka zawodowa i edukacyjna.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-400" />
              Doświadczenie zawodowe
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title + exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative pl-12 mb-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-sm">
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-50" />
                    )}
                  </div>

                  <div className="glass-card p-6 rounded-xl">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {exp.current && (
                        <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                          Aktualnie
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1">{exp.title}</h4>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-4">
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-primary-400 mt-1">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-400" />
              Edukacja
            </h3>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-5 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    {edu.current && (
                      <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                        Obecnie
                      </span>
                    )}
                  </div>
                  <p className="text-primary-400 text-sm mb-1">{edu.school}</p>
                  {edu.location && (
                    <p className="text-gray-500 text-xs mb-1">📍 {edu.location}</p>
                  )}
                  <p className="text-gray-500 text-xs">{edu.period}</p>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-card p-5 rounded-xl mt-6"
            >
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                🌍 Języki
              </h4>
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
