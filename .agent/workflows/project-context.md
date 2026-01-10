---
description: Kontekst projektu portfolio Wojciecha Soczyńskiego - strona osobista z blogiem
---

# 🚀 Projekt: Portfolio Wojciecha Soczyńskiego

## O projekcie
Nowoczesna strona portfolio i blog osobisty Wojciecha Soczyńskiego - młodego pasjonata AI, książek i rozwoju osobistego. Strona działa na https://wojteksoczynski.vercel.app

## 🛠️ Stack technologiczny
- **Framework**: Next.js 14 (App Router)
- **Język**: TypeScript
- **Style**: Tailwind CSS + globals.css
- **Animacje**: Framer Motion
- **Ikony**: Lucide React
- **AI**: Google Gemini API (chatbot)
- **Hosting**: Vercel
- **i18n**: Własny system (PL/EN) - pliki w `src/dictionaries/`

## 📁 Struktura projektu

```
src/
├── app/
│   ├── [lang]/                    # Routing językowy (pl, en)
│   │   ├── ai-progres/page.tsx    # Strona AI Progress Dashboard
│   │   ├── blog/                  # Blog z recenzjami książek
│   │   ├── gallery/               # Galeria zdjęć
│   │   ├── layout.tsx             # Layout z Navbar + Footer
│   │   └── page.tsx               # Strona główna
│   ├── api/
│   │   ├── ai-metrics/            # API dla danych AI Progress
│   │   ├── chat/                  # API chatbota Gemini
│   │   └── contact/               # API formularza kontaktowego
│   └── globals.css                # Style globalne + glassmorphism
├── components/
│   ├── sections/                  # Sekcje strony głównej
│   │   ├── Hero.tsx               # Baner główny + social media
│   │   ├── About.tsx              # O mnie + książki
│   │   ├── Experience.tsx         # Doświadczenie zawodowe
│   │   ├── Skills.tsx             # Umiejętności + certyfikaty
│   │   ├── Projects.tsx           # Projekty
│   │   ├── CV.tsx                 # CV do pobrania
│   │   ├── AiTools.tsx            # Narzędzia AI
│   │   └── Contact.tsx            # Kontakt + formularz
│   ├── ai-progres/
│   │   ├── AiProgresPage.tsx      # Dashboard AI Progress
│   │   ├── MetricCard.tsx         # Karty metryk
│   │   └── useAiMetrics.ts        # Hook do pobierania danych
│   ├── blog/                      # Komponenty bloga
│   ├── Navbar.tsx                 # Nawigacja
│   ├── Footer.tsx                 # Stopka
│   ├── Chatbot.tsx                # Chatbot AI Gemini
│   ├── ContactForm.tsx            # Formularz kontaktowy
│   └── LanguageSwitcher.tsx       # Przełącznik PL/EN
├── dictionaries/
│   ├── pl.json                    # Tłumaczenia polskie
│   └── en.json                    # Tłumaczenia angielskie
└── lib/
    ├── blog.ts                    # Obsługa postów blogowych
    └── gallery.ts                 # Obsługa galerii
```

## 🎨 Design system
- **Kolory**: Fioletowe gradienty (primary-500: #8b5cf6)
- **Styl**: Glassmorphism (glass-card), dark mode
- **Animacje**: Płynne wejścia, hover effects
- **Responsywność**: Mobile-first

## 📄 Strony

### Strona główna (`/pl` lub `/en`)
Sekcje w kolejności:
1. Hero - prezentacja + social media
2. About - o mnie, książki, osiągnięcia
3. Experience - timeline doświadczenia
4. Skills - umiejętności + certyfikaty
5. Projects - projekty portfolio
6. AI Tools - narzędzia AI
7. CV - pobieranie CV
8. Contact - formularz kontaktowy

### AI Progress (`/pl/ai-progres`)
Dashboard pokazujący postęp w rozwoju AI:
- **ARC-AGI 2 Leaderboard** - top 5 modeli AI (GPT-5.2, Gemini 3, etc.)
- **Compute Power** - wykładniczy wzrost mocy obliczeniowej + wykres Kurzweila
- **AGI Date Predictions** - prognozy ekspertów (12+ osób z branży)
- **Sources** - linki do źródeł (arcprize.org, situational-awareness.ai, theagiclock.com)

### Blog (`/pl/blog`)
Recenzje książek w formacie Markdown:
- Pliki w `content/blog/`
- Frontmatter: title, description, date, tags, image, author
- Okładki w `public/images/blog/`

### Galeria (`/pl/gallery`)
Zdjęcia osobiste w formacie grid.

## 🔌 Integracje

### Chatbot AI (Gemini)
- API: `src/app/api/chat/route.ts`
- Komponent: `src/components/Chatbot.tsx`
- Wymagana zmienna: `GEMINI_API_KEY`

### Formularz kontaktowy (n8n)
- API: `src/app/api/contact/route.ts`
- Komponent: `src/components/ContactForm.tsx`
- Wymagane zmienne: `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_TOKEN`

## 📝 Jak aktualizować treści

### ARC-AGI Leaderboard
Edytuj `src/dictionaries/pl.json` i `en.json`:
```json
"aiProgres": {
  "bestModel": {
    "leaderboard": [
      { "rank": 1, "model": "GPT-5.2 Pro", "author": "OpenAI", "score": "54.2%" }
    ]
  }
}
```

### Blog
Dodaj plik `.md` w `content/blog/` z frontmatterem.

### Dane osobowe
Edytuj odpowiednie sekcje w `src/components/sections/`.

## 🚀 Komendy

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## 🌐 Deployment
- Hosting: Vercel
- URL: https://wojteksoczynski.vercel.app
- Auto-deploy przy push do `main`

## 📧 Dane kontaktowe właściciela
- Imię: Wojciech Soczyński
- Email: soczynskiwojtek@gmail.com
- Tel: +48 577 950 977
- GitHub: @Wojz12
- LinkedIn: wojciechsoczyński
