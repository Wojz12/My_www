# 🚀 Portfolio - Wojciech Soczyński

> **Live:** [wojteksoczynski.vercel.app](https://wojteksoczynski.vercel.app/pl)

Nowoczesna strona portfolio z blogiem, chatbotem AI i trackerem postępu AI, zbudowana w Next.js 14 z App Router i Tailwind CSS. Dostępna w dwóch wersjach językowych (PL/EN).

## ✨ Funkcje

- 🎨 **Nowoczesny design** - Glassmorphism, gradienty fioletowe, animacje
- 📱 **Responsywność** - Pełna obsługa mobile i desktop
- 🌍 **Internacjonalizacja (i18n)** - Wersja polska i angielska
- 📝 **System blogowy** - Recenzje książek w formacie Markdown
- 💬 **Chatbot AI** - OpenAI GPT (z opcjonalnym Google Gemini)
- 📄 **Sekcja CV** - Z możliwością pobrania PDF
- 📧 **Formularz kontaktowy** - Resend API z auto-reply i rate limiting
- 📊 **AI Progres** - Śledzenie postępu AI (ARC-AGI-2 leaderboard)
- 🖼️ **Galeria** - Zdjęcia i wspomnienia
- 🔍 **SEO** - Pełna optymalizacja metadanych

## 🛠️ Technologie

- [Next.js 14](https://nextjs.org/) - Framework React z App Router
- [TypeScript](https://www.typescriptlang.org/) - Typowanie
- [Tailwind CSS](https://tailwindcss.com/) - Style
- [Framer Motion](https://www.framer.com/motion/) - Animacje
- [React Markdown](https://github.com/remarkjs/react-markdown) / [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - Renderowanie Markdown/MDX
- [OpenAI API](https://platform.openai.com/) - Chatbot AI
- [Resend](https://resend.com/) - Wysyłka e-maili (formularz kontaktowy)
- [Lucide Icons](https://lucide.dev/) - Ikony

## 📁 Struktura projektu

```
├── content/
│   └── blog/              # Posty blogowe (.md) - recenzje książek
├── public/
│   ├── cv/                # CV do pobrania (PDF)
│   └── images/
│       ├── profile.jpg    # Zdjęcie profilowe
│       ├── blog/          # Okładki książek
│       └── ...            # Zdjęcia galerii
├── src/
│   ├── app/
│   │   ├── [lang]/        # i18n routing (pl/en)
│   │   │   ├── blog/      # Strony bloga
│   │   │   ├── gallery/   # Galeria zdjęć
│   │   │   ├── ai-progres/# Tracker postępu AI
│   │   │   └── page.tsx   # Strona główna
│   │   └── api/           # API Routes (chat, contact)
│   ├── components/        # Komponenty React
│   │   ├── sections/      # Sekcje strony głównej
│   │   ├── blog/          # Komponenty bloga
│   │   ├── Navbar.tsx     # Menu nawigacyjne
│   │   ├── Footer.tsx     # Stopka
│   │   └── Chatbot.tsx    # Chatbot AI
│   └── lib/               # Funkcje pomocnicze
│       ├── blog.ts        # Obsługa postów blogowych
│       └── gallery.ts     # Obsługa galerii
└── tailwind.config.ts     # Konfiguracja Tailwind
```

## 🚀 Szybki start

### 1. Instalacja

```bash
# Sklonuj repozytorium
git clone https://github.com/Wojz12/portfolio.git
cd portfolio

# Zainstaluj zależności
npm install
```

### 2. Konfiguracja

```bash
# Skopiuj plik zmiennych środowiskowych
copy env.example .env.local   # Windows
cp env.example .env.local     # Mac/Linux
```

Edytuj `.env.local` i dodaj:

```env
# OpenAI API Key (chatbot) - wymagane
OPENAI_API_KEY=sk-...

# Resend API Key (formularz kontaktowy) - wymagane
RESEND_API_KEY=re_...
```

- Klucz OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Klucz Resend: [resend.com](https://resend.com)

### 3. Uruchomienie

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📝 Jak dodać nowe treści

### Dodawanie postów blogowych

1. Stwórz plik `.md` w folderze `content/blog/`
2. Dodaj frontmatter na początku pliku:

```markdown
---
title: "Tytuł posta"
description: "Krótki opis"
date: "2024-12-01"
tags: ["tag1", "tag2"]
image: "/images/blog/okladka.jpg"
author: "Wojciech Soczyński"
---

# Treść posta...
```

3. Dodaj okładkę książki do `public/images/blog/`

### Zmiana CV

1. Umieść plik PDF w `public/cv/cv.pdf`
2. CV będzie dostępne do pobrania w sekcji CV

### Zmiana zdjęcia profilowego

1. Umieść zdjęcie jako `public/images/profile.jpg`
2. Zalecany rozmiar: 500x500px lub większe (kwadratowe)

### Personalizacja treści

Edytuj dane w komponentach:
- `src/components/sections/Hero.tsx` - Imię, opis, social media
- `src/components/sections/About.tsx` - O mnie, książki, osiągnięcia
- `src/components/sections/Experience.tsx` - Doświadczenie zawodowe
- `src/components/sections/Skills.tsx` - Umiejętności i certyfikaty
- `src/components/sections/Projects.tsx` - Projekty
- `src/components/sections/Contact.tsx` - Dane kontaktowe
- `src/components/Footer.tsx` - Social media linki

## 🎨 Personalizacja

### Kolory

Edytuj paletę kolorów w `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#8b5cf6', // Główny kolor fioletowy
    // ...
  }
}
```

### Chatbot

Chatbot używa OpenAI API (domyślnie gpt-4o-mini). Aby go włączyć:

1. Uzyskaj klucz API: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Dodaj do `.env.local`: `OPENAI_API_KEY=sk-...`
3. System prompt jest w `src/app/api/chat/route.ts` - możesz go dostosować

### Formularz kontaktowy

Formularz kontaktowy wysyła e-maile przez Resend API (z auto-reply do nadawcy):

1. Uzyskaj klucz API: [resend.com](https://resend.com)
2. Dodaj do `.env.local`: `RESEND_API_KEY=re_...`
3. Opcjonalnie ustaw `CONTACT_EMAIL` (domyślnie: soczynskiwojtek@gmail.com)

Formularz zawiera:
- Rate limiting (5 requestów / 15 min na IP)
- Pole honeypot (`company`) do ochrony przed spamem
- Automatyczną odpowiedź do nadawcy

## 🚀 Deployment

### Vercel (Zalecane)

1. Połącz repozytorium GitHub z Vercel
2. Dodaj zmienne środowiskowe w Settings → Environment Variables:
   - `OPENAI_API_KEY` - klucz OpenAI (chatbot)
   - `RESEND_API_KEY` - klucz Resend (formularz kontaktowy)
   - `CONTACT_EMAIL` - email odbiorcy (opcjonalny)
3. Deploy automatyczny przy każdym pushu

### Inne platformy

Projekt można hostować na:
- Netlify
- Railway
- DigitalOcean App Platform
- Własny serwer (Node.js)

## 📧 Kontakt

- Email: soczynskiwojtek@gmail.com
- Telefon: +48 577 950 977
- GitHub: [@Wojz12](https://github.com/Wojz12)
- LinkedIn: [wojciechsoczyński](https://www.linkedin.com/in/wojciechsoczyński/)

## 📄 Licencja

MIT License - używaj dowolnie!

---

Made with 💜 by Wojciech Soczyński
