import { NextResponse } from 'next/server'

// Przykładowe odpowiedzi dla chatbota (fallback gdy nie ma podłączonego AI API)
const fallbackResponses: Record<string, string> = {
  default: 'Dziękuję za wiadomość! Obecnie chatbot działa w trybie demo. Podłącz swoje API (np. OpenAI), aby uzyskać pełne odpowiedzi. ✨',
  greeting: 'Cześć! Miło Cię poznać! 😊 Jak mogę Ci dzisiaj pomóc?',
  projects: 'Moje projekty znajdziesz w sekcji Projekty na stronie głównej. Pracowałem nad wieloma ciekawymi aplikacjami webowymi! 🚀',
  contact: 'Możesz się ze mną skontaktować przez formularz w sekcji Kontakt lub bezpośrednio na email: contact@example.com 📧',
  cv: 'Moje CV znajdziesz w sekcji CV. Możesz je pobrać jako PDF! 📄',
  skills: 'Specjalizuję się w React, Next.js, TypeScript, Node.js i wielu innych technologiach. Sprawdź sekcję Umiejętności! 💻',
  experience: 'Mam wieloletnie doświadczenie jako Full-Stack Developer. Szczegóły znajdziesz w sekcji Doświadczenie. 💼',
}

function getKeywordResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('cześć') || lowerMessage.includes('hej') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return fallbackResponses.greeting
  }
  if (lowerMessage.includes('projekt') || lowerMessage.includes('portfolio')) {
    return fallbackResponses.projects
  }
  if (lowerMessage.includes('kontakt') || lowerMessage.includes('email') || lowerMessage.includes('mail')) {
    return fallbackResponses.contact
  }
  if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('życiorys')) {
    return fallbackResponses.cv
  }
  if (lowerMessage.includes('umiejętności') || lowerMessage.includes('skills') || lowerMessage.includes('technologi')) {
    return fallbackResponses.skills
  }
  if (lowerMessage.includes('doświadczenie') || lowerMessage.includes('praca') || lowerMessage.includes('experience')) {
    return fallbackResponses.experience
  }
  
  return fallbackResponses.default
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Wiadomość jest wymagana' },
        { status: 400 }
      )
    }

    // Sprawdź czy jest ustawiony klucz API OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (openaiApiKey) {
      // Użyj OpenAI API
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `Jesteś pomocnym asystentem na stronie portfolio. Odpowiadasz na pytania o właściciela strony - developera specjalizującego się w React, Next.js, TypeScript i Node.js. Odpowiadaj krótko, przyjaźnie i pomocnie. Możesz kierować użytkowników do odpowiednich sekcji strony.`
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        })

        if (openaiResponse.ok) {
          const data = await openaiResponse.json()
          return NextResponse.json({
            response: data.choices[0].message.content
          })
        }
      } catch (apiError) {
        console.error('OpenAI API Error:', apiError)
        // Fallback to keyword responses
      }
    }

    // Fallback - użyj prostych odpowiedzi opartych na słowach kluczowych
    const response = getKeywordResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    )
  }
}

