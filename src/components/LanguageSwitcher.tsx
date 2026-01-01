'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()

    // Extract current locale from pathname
    // format: /pl/some/path or /pl
    const segments = pathname.split('/')
    const locale = segments[1] // 'pl' or 'en' (assuming valid locale)

    const toggleLanguage = (newLocale: string) => {
        if (newLocale === locale) return

        // Replace the locale in the path
        const newSegments = [...segments]
        newSegments[1] = newLocale
        const newPath = newSegments.join('/')

        router.push(newPath)
    }

    return (
        <div className="flex items-center gap-2 p-1 rounded-lg glass border border-white/10">
            <button
                onClick={() => toggleLanguage('pl')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ${locale === 'pl'
                        ? 'bg-primary-500 text-white shadow-glow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                PL
            </button>
            <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ${locale === 'en'
                        ? 'bg-primary-500 text-white shadow-glow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                EN
            </button>
        </div>
    )
}
