'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-transparent to-transparent" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Student Kognitywistyki | AI Enthusiast</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
            >
              Cześć, jestem{' '}
              <span className="gradient-text">Wojciech Soczyński</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Student kognitywistyki pasjonujący się sztuczną inteligencją, 
              Large Language Models i analizą danych. Aktualnie na wymianie Erasmus 
              na University of the Basque Country w Hiszpanii. 🇪🇸
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link href="/#projects" className="btn-primary flex items-center justify-center gap-2">
                Zobacz projekty
              </Link>
              <Link href="/#contact" className="btn-secondary flex items-center justify-center gap-2">
                Skontaktuj się
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: 'https://github.com/Wojz12', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/wojciechsoczy%C5%84ski/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:soczynskiwojtek@gmail.com', label: 'Email' },
                { icon: Phone, href: 'tel:+48577950977', label: 'Telefon' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center
                           text-gray-400 hover:text-white hover:border-primary-500/50
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-full blur-3xl scale-110" />
              
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden
                            border-4 border-primary-500/30 shadow-2xl animate-float">
                {/* Inicjały jako fallback - zamień na zdjęcie gdy dodasz */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white/80">WS</span>
                </div>
                {/* Odkomentuj gdy dodasz zdjęcie public/images/profile.jpg
                <Image
                  src="/images/profile.jpg"
                  alt="Wojciech Soczyński"
                  fill
                  className="object-cover"
                  priority
                />
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 top-10 px-4 py-2 glass-card rounded-xl"
              >
                <span className="text-sm font-medium">🧠 LLMs</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -left-4 bottom-20 px-4 py-2 glass-card rounded-xl"
              >
                <span className="text-sm font-medium">🐍 Python</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute right-8 bottom-0 px-4 py-2 glass-card rounded-xl"
              >
                <span className="text-sm font-medium">🤖 RAG</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm">Przewiń w dół</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
