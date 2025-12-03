'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@example.com',
    href: 'mailto:contact@example.com',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+48 123 456 789',
    href: 'tel:+48123456789',
  },
  {
    icon: MapPin,
    label: 'Lokalizacja',
    value: 'Warszawa, Polska',
    href: '#',
  },
]

export default function Contact() {
  const ref = useRef(null)
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error('Błąd wysyłania wiadomości')
      }
    } catch {
      setError('Wystąpił błąd. Spróbuj ponownie później.')
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
                Zawsze jestem otwarty na nowe projekty i możliwości współpracy. 
                Skontaktuj się ze mną przez formularz lub bezpośrednio.
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

              {/* Social CTA */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-400 mb-4">Znajdziesz mnie również na:</p>
                <div className="flex gap-3">
                  {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 glass-card rounded-lg text-sm text-gray-300 hover:text-white hover:border-primary-500/50 transition-all duration-300"
                    >
                      {social}
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
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
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
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

