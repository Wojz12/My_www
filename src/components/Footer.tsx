import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Wojz12' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wojciechsoczy%C5%84ski/' },
  { name: 'Email', href: 'mailto:soczynskiwojtek@gmail.com' },
  { name: '+48 577 950 977', href: 'tel:+48577950977' },
]

interface FooterProps {
  nav: {
    home: string
    about: string
    projects: string
    blog: string
    cv: string
    skills: string
    contact: string
  }
  footer: {
    sections: {
      navigation: string
      more: string
    }
    description: string
    rights: string
    madeWith: string
    inWarsaw: string
  }
  lang: string
}

export default function Footer({ nav, footer, lang }: FooterProps) {
  const footerLinks = [
    {
      title: footer.sections.navigation,
      links: [
        { name: nav.home, href: `/${lang}/` },
        { name: nav.about, href: `/${lang}/#about` },
        { name: nav.projects, href: `/${lang}/#projects` },
        { name: nav.blog, href: `/${lang}/blog` },
      ],
    },
    {
      title: footer.sections.more,
      links: [
        { name: nav.cv, href: `/${lang}/#cv` },
        { name: nav.skills, href: `/${lang}/#skills` },
        { name: nav.contact, href: `/${lang}/#contact` },
      ],
    },
  ]

  return (
    <footer className="mt-12 bg-night text-paper">
      <div className="page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href={`/${lang}/`} className="inline-flex items-center gap-2.5">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-clay" />
              <span className="font-serif text-2xl">Wojciech Soczyński</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">{footer.description}</p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-paper/40">{section.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-paper/80 transition-colors hover:text-paper">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-paper/40">Social</h3>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-paper/80 transition-colors hover:text-paper"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Wojciech Soczyński. {footer.rights}
          </p>
          <p>
            {footer.madeWith} ♥ {footer.inWarsaw}
          </p>
        </div>
      </div>
    </footer>
  )
}
