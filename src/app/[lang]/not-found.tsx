'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="page flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 max-w-3xl text-5xl leading-[1.05] md:text-7xl">
        Strona nie znaleziona <span className="italic text-ink-faint">/ Page Not Found</span>
      </h1>

      <p className="mt-8 max-w-xl leading-relaxed text-ink-muted">
        Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
        <br />
        Sorry, but the page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Strona główna / Home
        </Link>
        <button onClick={() => window.history.back()} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" />
          Wróć / Go Back
        </button>
      </div>
    </div>
  )
}
