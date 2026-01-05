'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

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

interface ContactProps {
  dictionary: {
    title: string
    subtitle: string
    findMe: string
    emailLabel: string
    phoneLabel: string
    locationLabel: string
    locationValue: string
    formTitle?: string
    form?: {
      nameLabel: string
      namePlaceholder: string
      emailLabel: string
      emailPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      sendButton: string
      sending: string
      successMessage: string
      errorMessage: string
      validationRequired: string
      validationEmail: string
      validationMessageLength: string
    }
  }
}

export default function Contact({ dictionary }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contactInfo = [
    {
      icon: Mail,
      label: dictionary.emailLabel,
      value: 'soczynskiwojtek@gmail.com',
      href: 'mailto:soczynskiwojtek@gmail.com',
    },
    {
      icon: Phone,
      label: dictionary.phoneLabel,
      value: '+48 577 950 977',
      href: 'tel:+48577950977',
    },
    {
      icon: MapPin,
      label: dictionary.locationLabel,
      value: dictionary.locationValue,
      href: '#',
    },
  ]

  return (
    <section id="contact" className="relative py-20" ref={ref}>
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl h-full">
              {/* Contact Info */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center group-hover:shadow-glow-sm transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-lg text-white font-medium group-hover:text-primary-400 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="pt-6 border-t border-white/10"
              >
                <p className="text-gray-400 mb-4 text-center">{dictionary.findMe}</p>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl text-gray-300 hover:text-white hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      <social.icon className="w-5 h-5" />
                      {social.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          {dictionary.form && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactForm dictionary={dictionary.form} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
