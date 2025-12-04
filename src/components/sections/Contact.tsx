'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, Github, Linkedin } from 'lucide-react'
import emailjs from '@emailjs/browser'

// EmailJS konfiguracja - UZUPEŁNIJ SWOJE DANE!
// 1. Załóż konto na https://emailjs.com (darmowe 200 emaili/miesiąc)
// 2. Stwórz Email Service (np. Gmail)
// 3. Stwórz Email Template z polami: from_name, from_email, subject, message
// 4. Skopiuj ID poniżej:
const EMAILJS_SERVICE_ID = 'service_xxxxxxx' // Twój Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx' // Twój Template ID  
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx' // Twój Public Key

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'soczynskiwojtek@gmail.com',
    href: 'mailto:soczynskiwojtek@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+48 577 950 977',
    href: 'tel:+48577950977',
  },
  {
    icon: MapPin,
    label: 'Lokalizacja',
    value: 'Warszawa, Polska',
    href: '#',
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Wojz12',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/wojciechsoczy%C5%84ski/',
    icon: Linkedin,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Sprawdź czy EmailJS jest skonfigurowany
    if (EMAILJS_SERVICE_ID.includes('xxxxxxx')) {
      // Fallback - otwórz klienta email
      const mailtoLink = `mailto:soczynskiwojtek@gmail.com?subject=${encodeURIComponent(formData.subject || 'Wiadomość z portfolio')}&body=${encodeURIComponent(`Od: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
      window.open(mailtoLink, '_blank')
      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setIsSuccess(false), 5000)
      setIsLoading(false)
      return
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'Wiadomość z portfolio',
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setIsSuccess(false), 5000)
    } catch {
      setError('Wystąpił błąd. Spróbuj napisać bezpośrednio na email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Kontakt</h2>
          <p className="section-subtitle mx-auto">
            Masz pytania lub chcesz współpracować? Napisz do mnie!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6">
                Porozmawiajmy!
              </h3>
              <p className="text-gray-400 mb-8">
                Jestem otwarty na nowe projekty, współpracę przy projektach AI 
                i możliwości stażowe. Skontaktuj się ze mną!
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center group-hover:shadow-glow-sm transition-all duration-300">
                      <item.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-400 mb-4">Znajdziesz mnie również na:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg text-sm text-gray-300 hover:text-white hover:border-primary-500/50 transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full"
                    placeholder="jan@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                  Temat
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full"
                  placeholder="W czym mogę pomóc?"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                  Wiadomość *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full resize-none"
                  placeholder="Opisz swój projekt lub pytanie..."
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              {isSuccess && (
                <div className="flex items-center gap-2 text-green-400 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span>Wiadomość wysłana pomyślnie!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Wyślij wiadomość
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Formularz otworzy Twojego klienta email z przygotowaną wiadomością.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
