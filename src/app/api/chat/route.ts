import { NextResponse } from 'next/server'

// Przykładowe odpowiedzi dla chatbota (fallback gdy nie ma podłączonego AI API)
const fallbackResponses: Record<string, string> = {
  default: 'Dziękuję za wiadomość! Chatbot działa w trybie demo. Zapytaj o projekty AI, studia kognitywistyki lub ulubione książki! ✨',
  greeting: 'Cześć! 👋 Jestem asystentem Wojtka. Zapytaj o jego projekty AI, studia czy książki!',
  projects: 'Wojtek stworzył system RAG do Question Answering! BM25 + CrossEncoder + TinyLlama, 39.8% Exact Match. Zobacz sekcję Projekty! 🚀',
  contact: 'Email: soczynskiwojtek@gmail.com | Tel: +48 577 950 977 | LinkedIn: wojciechsoczyński 📧',
  cv: 'Wojtek jest AI Intern w OMNIVISER, gdzie pracuje nad frameworkiem Hexdag. CV do pobrania w sekcji CV! 📄',
  skills: 'Umiejętności Wojtka: Python, LLMs, Prompt Engineering, Git, Cursor AI, ChatGPT. Certyfikaty NVIDIA! 💻',
  experience: 'AI Intern @ OMNIVISER, Technical Support @ Reago Training, Korepetytor matematyki. Szczegóły w sekcji Doświadczenie! 💼',
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
                content: `Jesteś pomocnym asystentem na stronie portfolio Wojciecha Soczyńskiego. Wojtek jest studentem Kognitywistyki na UW, pasjonuje się AI, LLMs i RAG systems. Pracuje jako AI Intern w OMNIVISER. Ma certyfikaty NVIDIA z LLM i RAG. Jego projekt RAG osiągnął 39.8% Exact Match na TriviaQA. Lubi książki: "Mózg na detoksie", "21 lekcji na XXI wiek", "Jak działa umysł", "Deep Learning". Jest na Erasmusie w Hiszpanii. Wygrał konkurs "Praca jak ze snu" i był w filmie o FinalSpark. Kontakt: soczynskiwojtek@gmail.com. Odpowiadaj krótko, przyjaźnie i pomocnie po polsku.`
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

