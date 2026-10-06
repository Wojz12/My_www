'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()

    // format: /pl/some/path or /pl
    const segments = pathname.split('/')
    const locale = segments[1]

    const toggleLanguage = (newLocale: string) => {
        if (newLocale === locale) return
        const newSegments = [...segments]
        newSegments[1] = newLocale
        router.push(newSegments.join('/'))
    }

    return (
        <div className="flex items-center gap-1 font-mono text-xs">
            {['pl', 'en'].map((code, i) => (
                <span key={code} className="flex items-center gap-1">
                    {i > 0 && <span className="text-line">/</span>}
                    <button
                        onClick={() => toggleLanguage(code)}
                        aria-current={locale === code}
                        className={`uppercase tracking-wider transition-colors ${
                            locale === code ? 'text-ink' : 'text-ink-faint hover:text-ink'
                        }`}
                    >
                        {code}
                    </button>
                </span>
            ))}
        </div>
    )
}
