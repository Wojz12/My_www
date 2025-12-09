import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

// System prompt dla Gemini - symuluje odpowiedzi Wojtka
const SYSTEM_PROMPT = `Jesteś Wojtkiem Soczyńskim - studentem Kognitywistyki na Uniwersytecie Warszawskim. Odpowiadaj jak Wojtek - przyjaźnie, z pasją do AI i kognitywistyki.

O TOBIE (Wojtku):
- Studiujesz Kognitywistykę na UW, aktualnie jesteś na wymianie Erasmus na University of the Basque Country w Hiszpanii
- Pasjonujesz się AI, Large Language Models i systemami RAG
- Pracujesz jako AI Intern w OMNIVISER, gdzie rozwijasz framework Hexdag do orkiestracji agentów AI
- Wcześniej pracowałeś w Reago Training (wsparcie techniczne, tłumaczenia EN→PL) i jako korepetytor matematyki
- Masz certyfikaty NVIDIA: "Building LLM Applications With Prompt Engineering" i "Building RAG Agents with LLMs"
- Masz Cambridge English Advanced (CAE) - C1

TWÓJ PROJEKT RAG:
- Stworzyłeś system Open-Domain QA z RAG na datasecie TriviaQA
- Architektura: BM25 Retrieval → CrossEncoder Reranking → TinyLlama Generation
- GitHub: github.com/Wojz12/RAG_LLM_project

TWOJE UMIEJĘTNOŚCI:
- Python, LLMs, Prompt Engineering, RAG Systems, Git
- Narzędzia: ChatGPT, Cursor AI, Hugging Face, LangChain
- Soft skills: Problem Solving, Technical Writing, Teaching

TWOJE ULUBIONE KSIĄŻKI:
- "Mózg na detoksie" - David Perlmutter (o wpływie diety na mózg)
- "21 lekcji na XXI wiek" - Yuval Noah Harari (o przyszłości AI)
- "Jak działa umysł" - Steven Pinker (psychologia ewolucyjna)
- "Deep Learning" - Ian Goodfellow (biblia deep learning)
- "The Last Economy" - Emad Mostaque (o inteligentnej ekonomii)

TWOJE OSIĄGNIĘCIE:
- Wygrałeś konkurs "Praca jak ze snu" z Just Join IT
- W nagrodę brałeś udział w filmie dokumentalnym o FinalSpark - startupie tworzącym komputer oparty na ludzkich neuronach
- Byłeś w Szwajcarii

KONTAKT:
- Email: soczynskiwojtek@gmail.com
- Telefon: +48 577 950 977
- GitHub: github.com/Wojz12
- LinkedIn: linkedin.com/in/wojciechsoczyński

STYL ODPOWIEDZI:
- Odpowiadaj po polsku, profesjonalnie i zwięźle
- Bądź pomocny i konkretny
- Nie używaj emoji
- Możesz opowiadać o swoich projektach i doświadczeniach
- Jeśli pytają o coś czego nie wiesz, powiedz że chętnie porozmawiasz o tym na mailu`

// Fallback responses when API is not connected
const fallbackResponses: Record<string, string> = {
  default: 'Hej! Chatbot działa w trybie demo - dodaj GEMINI_API_KEY do .env.local żeby włączyć pełne odpowiedzi. W międzyczasie zapytaj o moje projekty AI.',
  greeting: 'Cześć! Jestem Wojtek. Zapytaj mnie o projekty AI, studia kognitywistyki lub ulubione książki.',
  projects: 'Mój główny projekt to system RAG do Question Answering. Używam BM25 + CrossEncoder + TinyLlama. Sprawdź na GitHub: github.com/Wojz12/RAG_LLM_project',
  contact: 'Napisz do mnie! Email: soczynskiwojtek@gmail.com | Tel: +48 577 950 977 | GitHub: Wojz12',
  cv: 'Jestem AI Intern w OMNIVISER, gdzie pracuję nad frameworkiem Hexdag. Mam certyfikaty NVIDIA z LLM i RAG.',
  skills: 'Specjalizuję się w: Python, LLMs, Prompt Engineering, RAG Systems, Git. Używam ChatGPT, Cursor AI, Hugging Face.',
  experience: 'AI Intern @ OMNIVISER (framework Hexdag), wcześniej Reago Training i korepetycje z matmy. Szczegóły w sekcji Doświadczenie.',
}

function getKeywordResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('cześć') || lowerMessage.includes('hej') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return fallbackResponses.greeting
  }
  if (lowerMessage.includes('projekt') || lowerMessage.includes('rag')) {
    return fallbackResponses.projects
  }
  if (lowerMessage.includes('kontakt') || lowerMessage.includes('email') || lowerMessage.includes('mail')) {
    return fallbackResponses.contact
  }
  if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('praca')) {
    return fallbackResponses.cv
  }
  if (lowerMessage.includes('umiejętności') || lowerMessage.includes('skills') || lowerMessage.includes('technologi')) {
    return fallbackResponses.skills
  }
  if (lowerMessage.includes('doświadczenie') || lowerMessage.includes('experience')) {
    return fallbackResponses.experience
  }
  if (lowerMessage.includes('książ') || lowerMessage.includes('book') || lowerMessage.includes('czyta')) {
    return 'Polecam: "Mózg na detoksie" (Perlmutter), "21 lekcji na XXI wiek" (Harari), "Jak działa umysł" (Pinker), "Deep Learning" (Goodfellow) i "The Last Economy" (Mostaque).'
  }
  if (lowerMessage.includes('studi') || lowerMessage.includes('uniwer') || lowerMessage.includes('kognityw')) {
    return 'Studiuję Kognitywistykę na Uniwersytecie Warszawskim. Aktualnie jestem na Erasmusie na University of the Basque Country w Hiszpanii.'
  }
  if (lowerMessage.includes('konkurs') || lowerMessage.includes('nagroda') || lowerMessage.includes('finalspark') || lowerMessage.includes('szwajcari')) {
    return 'Wygrałem konkurs "Praca jak ze snu" z Just Join IT. W nagrodę brałem udział w filmie o FinalSpark - startupie tworzącym komputer na ludzkich neuronach. Byłem w Szwajcarii.'
  }
  
  return fallbackResponses.default
}

export async function POST(request: Request) {
  try {
    // Rate limiting - 10 requestów na minutę per IP
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP, {
      maxRequests: 10,
      windowMs: 60 * 1000, // 1 minuta
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Zbyt wiele requestów. Spróbuj ponownie za chwilę.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Wiadomość jest wymagana' },
        { status: 400 }
      )
    }

    // Sprawdź czy jest ustawiony klucz API Gemini
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (geminiApiKey) {
      try {
        // Użyj gemini-1.5-flash (dostępny w darmowym tierze)
        const model = 'gemini-1.5-flash'
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${SYSTEM_PROMPT}\n\nUżytkownik napisał: "${message}"\n\nOdpowiedz jako Wojtek (krótko, max 2-3 zdania):`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 300,
              },
            }),
          }
        )

        const data = await response.json()
        
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          const generatedText = data.candidates[0].content.parts[0].text
          return NextResponse.json(
            { response: generatedText },
            {
              headers: {
                'X-RateLimit-Limit': rateLimit.limit.toString(),
                'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
              },
            }
          )
        }
        
        // Obsługa błędów API
        if (data.error?.code === 429) {
          console.error('Gemini API quota exceeded:', data.error.message)
          // Fallback do odpowiedzi keyword-based z informacją o limicie
          const fallbackResponse = getKeywordResponse(message)
          return NextResponse.json(
            { 
              response: `${fallbackResponse}\n\n(Uwaga: Limit API został przekroczony. Używam trybu demo.)` 
            },
            {
              headers: {
                'X-RateLimit-Limit': rateLimit.limit.toString(),
                'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
              },
            }
          )
        }
        
        // Log error dla debugowania
        console.error('Gemini API response:', JSON.stringify(data, null, 2))
      } catch (apiError) {
        console.error('Gemini API Error:', apiError)
      }
    }

    // Fallback - użyj prostych odpowiedzi opartych na słowach kluczowych
    const response = getKeywordResponse(message)
    return NextResponse.json(
      { response },
      {
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )
    
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    )
  }
}
