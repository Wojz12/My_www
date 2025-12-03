import Link from 'next/link'
import { Github, Linkedin, Mail, Phone, Heart, Sparkles } from 'lucide-react'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Wojz12', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wojciechsoczy%C5%84ski/', icon: Linkedin },
  { name: 'Email', href: 'mailto:soczynskiwojtek@gmail.com', icon: Mail },
  { name: 'Phone', href: 'tel:+48577950977', icon: Phone },
]

const footerLinks = [
  {
    title: 'Nawigacja',
    links: [
      { name: 'Home', href: '/' },
      { name: 'O mnie', href: '/#about' },
      { name: 'Projekty', href: '/#projects' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Więcej',
    links: [
      { name: 'CV', href: '/#cv' },
      { name: 'Umiejętności', href: '/#skills' },
      { name: 'Kontakt', href: '/#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Wojciech Soczyński</span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              Student kognitywistyki pasjonujący się AI, LLMs i analizą danych. 
              Zawsze otwarty na nowe projekty i możliwości współpracy.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center
                           text-gray-400 hover:text-white hover:border-primary-500/50
                           transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Wojciech Soczyński. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Zrobione z <Heart className="w-4 h-4 text-red-500 fill-red-500" /> w Warszawie
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
