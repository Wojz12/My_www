# 🚀 Portfolio - Wojciech Soczyński

Nowoczesna strona portfolio z blogiem, zbudowana w Next.js 14 z App Router i Tailwind CSS.

## ✨ Funkcje

- 🎨 **Nowoczesny design** - Glassmorphism, gradienty fioletowe, animacje
- 📱 **Responsywność** - Pełna obsługa mobile i desktop
- 📝 **System blogowy** - Recenzje książek w formacie Markdown
- 💬 **Chatbot AI** - Podłączony pod Google Gemini API
- 📄 **Sekcja CV** - Z możliwością pobrania PDF
- 📧 **Sekcja Kontakt** - Dane kontaktowe i social media
- 🔍 **SEO** - Pełna optymalizacja metadanych

## 🛠️ Technologie

- [Next.js 14](https://nextjs.org/) - Framework React z App Router
- [TypeScript](https://www.typescriptlang.org/) - Typowanie
- [Tailwind CSS](https://tailwindcss.com/) - Style
- [Framer Motion](https://www.framer.com/motion/) - Animacje
- [React Markdown](https://github.com/remarkjs/react-markdown) - Renderowanie Markdown
- [Google Gemini API](https://ai.google.dev/) - Chatbot AI
- [Lucide Icons](https://lucide.dev/) - Ikony

## 📁 Struktura projektu

```
├── content/
│   └── blog/              # Posty blogowe (.md) - recenzje książek
├── public/
│   ├── cv/
│   │   └── cv.pdf         # CV do pobrania
│   └── images/
│       ├── profile.jpg    # Zdjęcie profilowe
│       ├── blog/          # Okładki książek
│       └── szwajcaria.jpg # Zdjęcia
├── src/
│   ├── app/               # App Router
│   │   ├── api/           # API Routes (chat, contact)
│   │   └── blog/          # Strony bloga
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
cp env.example .env.local
```

Edytuj `.env.local` i dodaj:

```env
# Google Gemini API Key (dla chatbota)
GEMINI_API_KEY=AIza...
```

Uzyskaj klucz API: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

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

Chatbot używa Google Gemini API. Aby go włączyć:

1. Uzyskaj klucz API: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Dodaj do `.env.local`: `GEMINI_API_KEY=AIza...`
3. System prompt jest w `src/app/api/chat/route.ts` - możesz go dostosować

### Formularz kontaktowy

Formularz kontaktowy wysyła dane do webhooka n8n. Aby go skonfigurować:

1. Utwórz webhook w n8n i skopiuj URL
2. Dodaj zmienne środowiskowe:
   - `N8N_WEBHOOK_URL` - URL webhooka n8n
   - `N8N_WEBHOOK_TOKEN` - token autoryzacyjny (opcjonalny)

**Testowanie lokalne (curl):**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello world testing","company":""}'
```

Formularz zawiera pole honeypot (`company`) do ochrony przed spamem.

## 🚀 Deployment

### Vercel (Zalecane)

1. Połącz repozytorium GitHub z Vercel
2. Dodaj zmienne środowiskowe w Settings → Environment Variables:
   - `GEMINI_API_KEY` - klucz API Gemini (chatbot)
   - `N8N_WEBHOOK_URL` - URL webhooka n8n (formularz kontaktowy)
   - `N8N_WEBHOOK_TOKEN` - token webhooka (opcjonalny)
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
