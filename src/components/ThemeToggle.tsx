'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
    // null do momentu montażu – motyw jest znany dopiero po stronie klienta
    const [dark, setDark] = useState<boolean | null>(null)

    useEffect(() => {
        setDark(document.documentElement.classList.contains('dark'))
    }, [])

    const toggle = () => {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle('dark', next)
        try {
            localStorage.setItem('theme', next ? 'dark' : 'light')
        } catch {}
    }

    return (
        <button
            onClick={toggle}
            aria-label={dark ? 'Jasny motyw / Light mode' : 'Ciemny motyw / Dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
            className="rounded-full p-2 text-ink-muted transition-colors hover:bg-oat hover:text-ink"
        >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    )
}
