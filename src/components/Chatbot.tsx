'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, Loader2 } from 'lucide-react'
import { Locale } from '@/i18n-config'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatbotProps {
  lang: Locale
  dictionary: {
    title: string
    online: string
    inputPlaceholder: string
    send: string
    initialMessage: string
    error: string
    fallback: {
      default: string
      greeting: string
      projects: string
      contact: string
      cv: string
      skills: string
      books: string
      education: string
      contest: string
      [key: string]: string
    }
  }
}

export default function Chatbot({ lang, dictionary }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize messages with dictionary content
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: dictionary.initialMessage,
        timestamp: new Date(),
      },
    ])
  }, [dictionary.initialMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // API call to backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim(), lang }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || dictionary.error,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      // Fallback response when API is not available
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getFallbackResponse(input.trim()),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Fallback responses when API is not connected
  const getFallbackResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase()
    const phrases = dictionary.fallback

    if (lowercaseQuery.includes('projekt') || lowercaseQuery.includes('rag') || lowercaseQuery.includes('project')) {
      return phrases.projects
    }
    if (lowercaseQuery.includes('kontakt') || lowercaseQuery.includes('email') || lowercaseQuery.includes('contact')) {
      return phrases.contact
    }
    if (lowercaseQuery.includes('cv') || lowercaseQuery.includes('resume') || lowercaseQuery.includes('praca') || lowercaseQuery.includes('job') || lowercaseQuery.includes('work')) {
      return phrases.cv
    }
    if (lowercaseQuery.includes('umiejętności') || lowercaseQuery.includes('skills') || lowercaseQuery.includes('technologi') || lowercaseQuery.includes('stacks')) {
      return phrases.skills
    }
    if (lowercaseQuery.includes('książ') || lowercaseQuery.includes('book') || lowercaseQuery.includes('czyta') || lowercaseQuery.includes('read')) {
      return phrases.books
    }
    if (lowercaseQuery.includes('studi') || lowercaseQuery.includes('uniwer') || lowercaseQuery.includes('kognityw') || lowercaseQuery.includes('study') || lowercaseQuery.includes('cognitive')) {
      return phrases.education
    }
    if (lowercaseQuery.includes('cześć') || lowercaseQuery.includes('hej') || lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi')) {
      return phrases.greeting
    }
    if (lowercaseQuery.includes('konkurs') || lowercaseQuery.includes('nagroda') || lowercaseQuery.includes('finalspark') || lowercaseQuery.includes('szwajcari') || lowercaseQuery.includes('contest') || lowercaseQuery.includes('prize') || lowercaseQuery.includes('switzerland')) {
      return phrases.contest
    }

    return phrases.default
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            onClick={() => setIsOpen(true)}
            aria-label={dictionary.title}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-ink py-3 pl-4 pr-5 text-sm font-medium text-ivory shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-colors hover:bg-ink-soft"
          >
            <Spark className="h-4 w-4 text-clay" />
            {dictionary.title}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(600px,80vh)] flex-col overflow-hidden rounded-2xl border border-line bg-ivory shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <Spark className="h-5 w-5 text-clay" />
                <div>
                  <h3 className="font-serif text-lg leading-none text-ink">{dictionary.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    {dictionary.online}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 text-ink-muted transition-colors hover:bg-oat hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {messages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-oat px-4 py-2.5 text-[0.925rem] leading-relaxed text-ink">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex gap-3">
                    <Spark className="mt-1 h-4 w-4 flex-shrink-0 text-clay" />
                    <p className="font-serif text-[1.02rem] leading-relaxed text-ink">{message.content}</p>
                  </div>
                )
              )}

              {isLoading && (
                <div className="flex gap-3">
                  <Spark className="mt-1 h-4 w-4 flex-shrink-0 animate-spin text-clay [animation-duration:2.5s]" />
                  <Loader2 className="h-4 w-4 animate-spin text-ink-faint" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-line bg-ivory p-1.5 pl-4 shadow-sm focus-within:border-ink-faint">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder={dictionary.inputPlaceholder}
                  className="flex-1 !rounded-none !border-0 !bg-transparent !px-0 !py-2 text-sm focus:!outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label={dictionary.send}
                  className="rounded-xl bg-clay p-2.5 text-white transition-colors hover:bg-clay-dark disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Prosty znak "iskry" – akcent w stylu Claude
function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2l1.6 6.1L19.8 6l-4.3 4.6L22 12l-6.5 1.4 4.3 4.6-6.2-2.1L12 22l-1.6-6.1L4.2 18l4.3-4.6L2 12l6.5-1.4L4.2 6l6.2 2.1z" />
    </svg>
  )
}
