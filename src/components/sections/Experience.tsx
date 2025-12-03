'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Company',
    location: 'Warszawa / Remote',
    period: '2022 - Obecnie',
    description: 'Tworzenie i rozwijanie aplikacji webowych w Next.js i React. Prowadzenie zespołu 5 developerów. Implementacja CI/CD i DevOps practices.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    current: true,
  },
  {
    title: 'Full-Stack Developer',
    company: 'Software House',
    location: 'Kraków',
    period: '2020 - 2022',
    description: 'Rozwój aplikacji e-commerce i systemów CMS. Praca z klientami zagranicznymi. Optymalizacja wydajności i SEO.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    current: false,
  },
  {
    title: 'Frontend Developer',
    company: 'Startup XYZ',
    location: 'Remote',
    period: '2019 - 2020',
    description: 'Tworzenie interfejsów użytkownika dla aplikacji SaaS. Implementacja design systemów. Współpraca z UX/UI designers.',
    technologies: ['React', 'Vue.js', 'SCSS', 'Figma', 'Git'],
    current: false,
  },
  {
    title: 'Junior Developer',
    company: 'Agency Digital',
    location: 'Wrocław',
    period: '2018 - 2019',
    description: 'Tworzenie stron internetowych i landing pages. Nauka podstaw programowania i best practices.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'],
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
            Moja ścieżka kariery - od pierwszych kroków do pozycji senior developera.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-400 to-transparent transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 transform -translate-x-1/2 mt-2 shadow-glow-sm z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-50" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className={`glass-card p-6 rounded-xl card-hover ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    {/* Header */}
                    <div className={`flex flex-wrap items-center gap-2 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
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

                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    
                    <div className={`flex flex-wrap items-center gap-3 mb-4 text-gray-400 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
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
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

