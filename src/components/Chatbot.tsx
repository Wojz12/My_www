'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Cześć! 👋 Jestem Wojtek. Zapytaj mnie o projekty AI, studia kognitywistyki, ulubione książki lub doświadczenie z LLMs!',
    timestamp: new Date(),
  },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
        body: JSON.stringify({ message: input.trim() }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Przepraszam, wystąpił błąd. Spróbuj ponownie.',
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
    
    if (lowercaseQuery.includes('projekt') || lowercaseQuery.includes('rag')) {
      return 'Stworzyłem system RAG do Question Answering! Używam BM25 + CrossEncoder + TinyLlama. Sprawdź na GitHub: github.com/Wojz12/RAG_LLM_project 🚀'
    }
    if (lowercaseQuery.includes('kontakt') || lowercaseQuery.includes('email')) {
      return 'Napisz do mnie! Email: soczynskiwojtek@gmail.com | Tel: +48 577 950 977 📧'
    }
    if (lowercaseQuery.includes('cv') || lowercaseQuery.includes('resume') || lowercaseQuery.includes('praca')) {
      return 'Pracuję jako AI Intern w OMNIVISER - rozwijam framework Hexdag do orkiestracji agentów AI. CV znajdziesz w sekcji CV! 📄'
    }
    if (lowercaseQuery.includes('umiejętności') || lowercaseQuery.includes('skills') || lowercaseQuery.includes('technologi')) {
      return 'Specjalizuję się w: Python, LLMs, Prompt Engineering, RAG Systems, Git. Używam ChatGPT, Cursor AI, Hugging Face! 💻'
    }
    if (lowercaseQuery.includes('książ') || lowercaseQuery.includes('book') || lowercaseQuery.includes('czyta')) {
      return 'Polecam: "Mózg na detoksie" (Perlmutter), "21 lekcji" (Harari), "Jak działa umysł" (Pinker), "Deep Learning" (Goodfellow) i "The Last Economy" (Mostaque)! 📚'
    }
    if (lowercaseQuery.includes('studi') || lowercaseQuery.includes('uniwer') || lowercaseQuery.includes('kognityw')) {
      return 'Studiuję Kognitywistykę na UW! Aktualnie jestem na Erasmusie na University of the Basque Country w Hiszpanii 🇪🇸 🎓'
    }
    if (lowercaseQuery.includes('cześć') || lowercaseQuery.includes('hej') || lowercaseQuery.includes('hello')) {
      return 'Cześć! 👋 Jestem Wojtek. Zapytaj mnie o projekty AI, studia kognitywistyki lub ulubione książki!'
    }
    if (lowercaseQuery.includes('konkurs') || lowercaseQuery.includes('nagroda') || lowercaseQuery.includes('finalspark') || lowercaseQuery.includes('szwajcari')) {
      return 'Wygrałem konkurs "Praca jak ze snu" z Just Join IT! 🏆 W nagrodę brałem udział w filmie o FinalSpark - startupie tworzącym komputer na ludzkich neuronach. Byłem w Szwajcarii!'
    }
    
    return 'Hej! Chatbot działa w trybie demo. Dodaj GEMINI_API_KEY do .env.local żeby włączyć pełne odpowiedzi! W międzyczasie zapytaj o moje projekty AI 🤖'
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-gradient-to-br from-primary-500 to-primary-700
                   shadow-glow flex items-center justify-center
                   hover:scale-110 transition-transform duration-300
                   ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh]
                      glass-card rounded-2xl overflow-hidden flex flex-col
                      shadow-2xl border border-primary-500/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10
                          bg-gradient-to-r from-primary-600/20 to-primary-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700
                              flex items-center justify-center shadow-glow-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Asystent AI</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                              ${
                                message.role === 'user'
                                  ? 'bg-primary-500'
                                  : 'bg-gradient-to-br from-primary-500 to-primary-700'
                              }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary-500/30 rounded-tr-none'
                        : 'bg-white/5 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {message.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString('pl-PL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-white/10 bg-black/20"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Napisz wiadomość..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3
                           text-white placeholder:text-gray-500 focus:outline-none
                           focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20
                           transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600
                           text-white disabled:opacity-50 disabled:cursor-not-allowed
                           hover:from-primary-600 hover:to-primary-700
                           transition-all duration-300 shadow-lg hover:shadow-glow"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

