'use client'

import { ArrowUpRight } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { Reveal, SectionHeader } from '@/components/ui'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Wojz12' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wojciechsoczy%C5%84ski/' },
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
  const contactInfo = [
    { label: dictionary.emailLabel, value: 'soczynskiwojtek@gmail.com', href: 'mailto:soczynskiwojtek@gmail.com' },
    { label: dictionary.phoneLabel, value: '+48 577 950 977', href: 'tel:+48577950977' },
    { label: dictionary.locationLabel, value: dictionary.locationValue },
  ]

  return (
    <section id="contact" className="page section">
      <SectionHeader index="07" title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <dl className="divide-y divide-line border-y border-line">
            {contactInfo.map((item) => (
              <div key={item.label} className="py-5">
                <dt className="eyebrow mb-1.5">{item.label}</dt>
                <dd className="font-serif text-xl text-ink sm:text-2xl">
                  {item.href ? (
                    <a href={item.href} className="break-all transition-colors hover:text-clay-dark">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-ink-muted">{dictionary.findMe}</p>
          <div className="mt-3 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {social.name}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </Reveal>

        {dictionary.form && (
          <Reveal delay={0.05} className="lg:col-span-7">
            <ContactForm dictionary={dictionary.form} />
          </Reveal>
        )}
      </div>
    </section>
  )
}
