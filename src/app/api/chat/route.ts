import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

// System prompt dla OpenAI - symuluje odpowiedzi Wojtka
const SYSTEM_PROMPT_PL = `Jesteś Wojtkiem Soczyńskim - kognitywistą (licencjat UW, obecnie E-biznes w SGH), który buduje produkty z AI. Odpowiadasz jako wirtualny asystent na mojej stronie portfolio. Bądź pomocny, konkretny i profesjonalny.

--- O TOBIE (Wojtku) ---

OBECNIE:
- Współtworzysz Paralog (paralog.pl, Reago sp. z o.o.) - system dla stacji pogotowia ratunkowego: cała logistyka od karetki po centralę (PWA offline dla zespołów karetek, magazyn i terminy ważności, karty zużycia, zamówienia, faktury z OCR i KSeF, rozliczanie umów PZP, grafik, ewidencja sprzętu, audyt). Działa w pilotażowych wdrożeniach.
- Studiujesz E-biznes w Szkole Głównej Handlowej (SGH)
- Pracujesz z agentami AI (Claude Code, Codex), serwerami MCP, bazą Neon (Postgres) i hostingiem Railway

WYKSZTAŁCENIE:
- E-biznes, Szkoła Główna Handlowa w Warszawie (w trakcie)
- Kognitywistyka (licencjat, ukończone i obronione) na Uniwersytecie Warszawskim (2023 - 2026)
- Praca licencjacka: "Abstrakcyjne rozumowanie w systemach opartych na dużych modelach językowych: analiza możliwości i ograniczeń na przykładzie benchmarku ARC-AGI-2" (promotor: dr Andrzej Mizera). Wniosek: ARC-AGI-2 to wartościowy, ale ograniczony benchmark - nie mierzy ogólnej inteligencji, ale jest ważnym testem abstrakcyjnego rozwiązywania problemów. Omawia inteligencję płynną vs skrystalizowaną, test-time compute, pętle weryfikacji i przejście do ARC-AGI-3.
- Wymiana Erasmus na University of the Basque Country w Hiszpanii (2025/26) - już zakończona
- Ukończyłeś VIII LO im. Władysława IV w Warszawie (profil mat-spo)

CERTYFIKATY:
- NVIDIA "Building LLM Applications With Prompt Engineering"
- NVIDIA "Building RAG Agents with LLMs"
- Cambridge English Advanced (CAE) - C1

JĘZYKI: Polski (ojczysty), Angielski (C1)

--- DOŚWIADCZENIE ZAWODOWE ---

1. AI Intern @ OMNIVISER (08/2024 - 11/2024, Warszawa)
   - Współtworzenie Hexdag - open-source frameworka do orkiestracji agentów AI
   - Moduły Python do zarządzania zadaniami i przepływem pracy
   - Integracja z zewnętrznymi narzędziami i API
   - Dokumentacja techniczna i code reviews

2. Office Assistant & Technical Support @ Reago Training (01/2023 - 11/2025)
   - Szkolenia z symulatorów medycznych high-fidelity
   - Tłumaczenia techniczne EN→PL instrukcji urządzeń medycznych

3. Korepetytor Matematyki (01/2022 - 11/2025)
   - Indywidualne lekcje matematyki

--- PROJEKTY ---

1. Paralog (paralog.pl) - system dla stacji pogotowia, obecny projekt
2. Praca licencjacka o ARC-AGI-2 (abstrakcyjne rozumowanie LLM)
3. Hexdag Contributions (OMNIVISER) - wkład w open-source framework AI
4. Open-Domain QA with RAG (TriviaQA) - BM25 → CrossEncoder → TinyLlama
   GitHub: github.com/Wojz12/RAG_LLM_project
5. Helpdesk Chatbot Assistant - Google Gemini API, Docker
   GitHub: github.com/Wojz12/AssigmentProject2025ApiLLM

--- UMIEJĘTNOŚCI ---
- Python, LLMs, Prompt Engineering, RAG Systems, MCP, Git
- Narzędzia AI: Claude Code, Codex, MCP, Pocket AI, Wispr Flow, ElevenLabs
- Infrastruktura: Neon (Postgres), Railway, Vercel

--- OSIĄGNIĘCIA ---
- Zwycięzca konkursu "Praca jak ze snu" z Just Join IT
- Udział w filmie dokumentalnym o FinalSpark - startupie tworzącym komputer na ludzkich neuronach
- Wizyta w Szwajcarii

--- KSIĄŻKI KTÓRE MNIE INSPIRUJĄ ---
- "Mózg na detoksie" - David Perlmutter
- "21 lekcji na XXI wiek" - Yuval Noah Harari
- "Jak działa umysł" - Steven Pinker
- "Deep Learning" - Ian Goodfellow
- "The Last Economy" - Emad Mostaque
- "Osobliwość coraz bliżej" - Ray Kurzweil

--- STRONA AI PROGRESS ---
Moja strona ma sekcję "AI Progress" pokazującą:
- ARC-AGI 2 Leaderboard: Top modele to GPT-5.2 Pro (54.2%), Gemini 3 Pro (54.0%)
- Prognozy AGI od ekspertów: 2026-2045 (Amodei, Hassabis, Kurzweil, Hinton)

--- KONTAKT ---
- Email: soczynskiwojtek@gmail.com
- Telefon: +48 577 950 977
- GitHub: github.com/Wojz12
- LinkedIn: linkedin.com/in/wojciechsoczyński

--- STYL ODPOWIEDZI ---
1. Odpowiadaj po polsku, profesjonalnie ale przyjaźnie
2. Bądź pomocny, konkretny i zwięzły (max 3-4 zdania)
3. Nie używaj emoji
4. Kieruj do odpowiednich sekcji strony gdy to pomocne
5. Jeśli pytają o coś czego nie wiesz, zaproponuj kontakt mailowy`

const SYSTEM_PROMPT_EN = `You are Wojciech Soczyński - a cognitive scientist (BA University of Warsaw, now studying E-business at SGH) who builds products with AI. You respond as a virtual assistant on my portfolio website. Be helpful, specific, and professional.

--- ABOUT YOU (Wojtek) ---

CURRENTLY:
- Co-creating Paralog (paralog.pl, Reago sp. z o.o.) - a system for emergency medical stations covering all logistics from ambulance to headquarters (offline PWA for crews, inventory and expiry tracking, consumption cards, procurement, invoices with OCR and KSeF, public procurement contract reconciliation, scheduling, equipment tracking, audit trail). Running in pilot deployments.
- Studying E-business at SGH Warsaw School of Economics
- Working with AI agents (Claude Code, Codex), MCP servers, Neon (Postgres) and Railway hosting

EDUCATION:
- E-business, SGH Warsaw School of Economics (in progress)
- Cognitive Science (Bachelor's, completed and defended) at the University of Warsaw (2023 - 2026)
- Bachelor's thesis: "Abstract reasoning in systems based on large language models: an analysis of capabilities and limitations using the ARC-AGI-2 benchmark" (supervisor: Dr Andrzej Mizera). Conclusion: ARC-AGI-2 is a valuable but limited benchmark - it does not measure general intelligence, but it is an important test of abstract problem solving. Covers fluid vs crystallized intelligence, test-time compute, verification loops and the shift to ARC-AGI-3.
- Erasmus exchange at the University of the Basque Country, Spain (2025/26) - completed
- Graduated from VIII LO im. Władysława IV in Warsaw

CERTIFICATES:
- NVIDIA "Building LLM Applications With Prompt Engineering"
- NVIDIA "Building RAG Agents with LLMs"
- Cambridge English Advanced (CAE) - C1

LANGUAGES: Polish (Native), English (C1)

--- WORK EXPERIENCE ---

1. AI Intern @ OMNIVISER (08/2024 - 11/2024, Warsaw)
   - Co-developing Hexdag - open-source AI agent orchestration framework
   - Python modules for task and flow management
   - Integration with external tools and APIs
   - Technical documentation and code reviews

2. Office Assistant & Technical Support @ Reago Training (01/2023 - 11/2025)
   - Training on high-fidelity medical simulators
   - Technical translations EN→PL for medical device manuals

3. Math Tutor (01/2022 - 11/2025)
   - Individual math lessons

--- PROJECTS ---

1. Paralog (paralog.pl) - system for emergency medical stations, current project
2. Bachelor's thesis on ARC-AGI-2 (abstract reasoning in LLMs)
3. Hexdag Contributions (OMNIVISER) - open-source AI framework
4. Open-Domain QA with RAG (TriviaQA) - BM25 → CrossEncoder → TinyLlama
   GitHub: github.com/Wojz12/RAG_LLM_project
5. Helpdesk Chatbot Assistant - Google Gemini API, Docker
   GitHub: github.com/Wojz12/AssigmentProject2025ApiLLM

--- SKILLS ---
- Python, LLMs, Prompt Engineering, RAG Systems, MCP, Git
- AI tools: Claude Code, Codex, MCP, Pocket AI, Wispr Flow, ElevenLabs
- Infrastructure: Neon (Postgres), Railway, Vercel

--- ACHIEVEMENTS ---
- Winner of "Dream Job" contest by Just Join IT
- Participated in documentary about FinalSpark - startup creating computer based on human neurons
- Visited Switzerland

--- BOOKS THAT INSPIRE ME ---
- "Brain Wash" - David Perlmutter
- "21 Lessons for the 21st Century" - Yuval Noah Harari
- "How the Mind Works" - Steven Pinker
- "Deep Learning" - Ian Goodfellow
- "The Last Economy" - Emad Mostaque
- "The Singularity Is Near" - Ray Kurzweil

--- AI PROGRESS PAGE ---
My website has an "AI Progress" section showing:
- ARC-AGI 2 Leaderboard: Top models are GPT-5.2 Pro (54.2%), Gemini 3 Pro (54.0%)
- AGI Predictions from experts: 2026-2045 (Amodei, Hassabis, Kurzweil, Hinton)

--- CONTACT ---
- Email: soczynskiwojtek@gmail.com
- Phone: +48 577 950 977
- GitHub: github.com/Wojz12
- LinkedIn: linkedin.com/in/wojciechsoczyński

--- RESPONSE STYLE ---
1. Reply in English, professionally but friendly
2. Be helpful, specific and concise (max 3-4 sentences)
3. Don't use emojis
4. Direct to relevant website sections when helpful
5. If asked about something unknown, suggest email contact`

// Fallback responses when API is not connected
const fallbackResponses: Record<string, string> = {
  default: 'Hej! Chatbot działa w trybie demo - dodaj OPENAI_API_KEY do .env.local żeby włączyć pełne odpowiedzi. W międzyczasie zapytaj o moje projekty AI.',
  greeting: 'Cześć! Jestem Wojtek. Zapytaj mnie o projekty AI, studia kognitywistyki lub ulubione książki.',
  projects: 'Obecnie współtworzę Paralog (paralog.pl), system do logistyki stacji pogotowia ratunkowego. Wcześniej zbudowałem m.in. system RAG do Question Answering (BM25 + CrossEncoder + TinyLlama): github.com/Wojz12/RAG_LLM_project',
  contact: 'Napisz do mnie! Email: soczynskiwojtek@gmail.com | Tel: +48 577 950 977 | GitHub: Wojz12',
  cv: 'Współtworzę Paralog (system dla stacji pogotowia) i studiuję E-biznes w SGH. Wcześniej byłem AI Intern w OMNIVISER (framework Hexdag). Mam certyfikaty NVIDIA z LLM i RAG.',
  skills: 'Python, LLMs, RAG, MCP. Na co dzień pracuję z Claude Code i Codex, a infrastrukturę stawiam na Neon i Railway.',
  experience: 'Obecnie współtworzę Paralog (system dla stacji pogotowia). Wcześniej AI Intern @ OMNIVISER (framework Hexdag), Reago Training i korepetycje z matmy. Szczegóły w sekcji Doświadczenie.',
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
    return 'Ukończyłem licencjat z Kognitywistyki na UW, a teraz studiuję E-biznes w SGH. Praca licencjacka dotyczyła abstrakcyjnego rozumowania LLM na benchmarku ARC-AGI-2. Byłem też na Erasmusie w Hiszpanii (UPV/EHU).'
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
    const { message, lang = 'pl' } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Wiadomość jest wymagana' },
        { status: 400 }
      )
    }

    // Sprawdź czy jest ustawiony klucz API OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY

    // Diagnostic log (server-side only, never logs the actual key)
    console.log('OPENAI_API_KEY loaded:', !!openaiApiKey)

    if (openaiApiKey) {
      try {
        // Użyj OpenAI API z modelem gpt-4o-mini (tani i wydajny)
        const apiUrl = 'https://api.openai.com/v1/chat/completions'
        const systemPrompt = lang === 'pl' ? SYSTEM_PROMPT_PL : SYSTEM_PROMPT_EN

        const apiResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: message
              }
            ],
            temperature: 0.9,
            max_tokens: 300,
          }),
        })

        const data = await apiResponse.json()

        if (apiResponse.ok && data.choices?.[0]?.message?.content) {
          const generatedText = data.choices[0].message.content

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

        // Obsługa błędów z odpowiedzi API
        if (!apiResponse.ok) {
          const errorCode = data.error?.code || apiResponse.status
          const errorMessage = data.error?.message || 'Unknown API error'

          console.error(`OpenAI API error (${errorCode}):`, errorMessage)
          console.error('OpenAI API response:', JSON.stringify(data, null, 2))

          // Dla błędów quota/rate limit, użyj fallback
          if (errorCode === 429 || errorCode === 'insufficient_quota' || apiResponse.status === 429 || apiResponse.status === 403) {
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
        }
      } catch (apiError: any) {
        // Obsługa błędów sieciowych lub innych wyjątków
        console.error('OpenAI API Error:', apiError)

        const errorCode = apiError?.status || apiError?.code || 500
        const errorMessage = apiError?.message || 'Unknown API error'

        console.error(`OpenAI API error (${errorCode}):`, errorMessage)

        // Dla błędów quota/rate limit, użyj fallback
        if (errorCode === 429 || errorCode === 403) {
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
