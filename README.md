# 🚀 Moje Portfolio

Nowoczesna strona portfolio z blogiem, zbudowana w Next.js 14 z App Router i Tailwind CSS.

![Portfolio Preview](public/images/preview.png)

## ✨ Funkcje

- 🎨 **Nowoczesny design** - Glassmorphism, gradienty fioletowe, animacje
- 📱 **Responsywność** - Pełna obsługa mobile i desktop
- 📝 **System blogowy** - Posty w formacie Markdown/MDX
- 🖼️ **Galeria zdjęć** - Z lightboxem i kategoriami
- 💬 **Chatbot AI** - Gotowy do podłączenia pod OpenAI
- 📄 **Sekcja CV** - Z możliwością pobrania PDF
- 📧 **Formularz kontaktowy** - Z walidacją i API
- 🔍 **SEO** - Pełna optymalizacja metadanych

## 🛠️ Technologie

- [Next.js 14](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typowanie
- [Tailwind CSS](https://tailwindcss.com/) - Style
- [Framer Motion](https://www.framer.com/motion/) - Animacje
- [MDX](https://mdxjs.com/) - Blog
- [Lucide Icons](https://lucide.dev/) - Ikony

## 📁 Struktura projektu

```
├── content/
│   └── blog/              # Posty blogowe (.md, .mdx)
├── public/
│   ├── cv/
│   │   └── cv.pdf         # Twoje CV do pobrania
│   └── images/
│       ├── profile.jpg    # Zdjęcie profilowe
│       ├── blog/          # Zdjęcia do postów
│       ├── projects/      # Zdjęcia projektów
│       └── gallery/       # Galeria zdjęć
├── src/
│   ├── app/               # App Router
│   │   ├── api/           # API Routes
│   │   ├── blog/          # Strony bloga
│   │   └── gallery/       # Strona galerii
│   ├── components/        # Komponenty React
│   │   ├── sections/      # Sekcje strony głównej
│   │   ├── blog/          # Komponenty bloga
│   │   └── gallery/       # Komponenty galerii
│   └── lib/               # Funkcje pomocnicze
└── tailwind.config.ts     # Konfiguracja Tailwind
```

## 🚀 Szybki start

### 1. Instalacja

```bash
# Sklonuj repozytorium
git clone https://github.com/twoj-username/portfolio.git
cd portfolio

# Zainstaluj zależności
npm install
```

### 2. Konfiguracja

```bash
# Skopiuj plik zmiennych środowiskowych
cp .env.example .env.local
```

Edytuj `.env.local` i dodaj swoje klucze API (opcjonalne).

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

1. Stwórz plik `.md` lub `.mdx` w folderze `content/blog/`
2. Dodaj frontmatter na początku pliku:

```markdown
---
title: "Tytuł posta"
description: "Krótki opis"
date: "2024-12-01"
tags: ["tag1", "tag2"]
image: "/images/blog/nazwa.jpg"
author: "Twoje Imię"
---

# Treść posta...
```

### Dodawanie zdjęć do galerii

1. Umieść zdjęcia w `public/images/gallery/`
2. Edytuj `public/images/gallery/gallery.json`:

```json
{
  "images": [
    {
      "src": "/images/gallery/zdjecie.jpg",
      "alt": "Opis zdjęcia",
      "category": "Kategoria"
    }
  ]
}
```

### Zmiana CV

1. Umieść plik PDF w `public/cv/cv.pdf`
2. CV będzie dostępne do pobrania w sekcji CV

### Zmiana zdjęcia profilowego

1. Umieść zdjęcie jako `public/images/profile.jpg`
2. Zalecany rozmiar: 500x500px lub większe (kwadratowe)

## 🎨 Personalizacja

### Kolory

Edytuj paletę kolorów w `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#8b5cf6', // Główny kolor
    // ...
  }
}
```

### Treści

Edytuj dane w komponentach:
- `src/components/sections/Hero.tsx` - Imię, opis
- `src/components/sections/About.tsx` - O mnie
- `src/components/sections/Experience.tsx` - Doświadczenie
- `src/components/sections/Skills.tsx` - Umiejętności
- `src/components/sections/Projects.tsx` - Projekty
- `src/components/Footer.tsx` - Social media linki

### Chatbot

Podłącz chatbota pod OpenAI:
1. Uzyskaj klucz API: https://platform.openai.com/api-keys
2. Dodaj do `.env.local`: `OPENAI_API_KEY=sk-...`

## 🚀 Deployment

### Vercel (Zalecane)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/twoj-username/portfolio)

1. Połącz repozytorium z Vercel
2. Dodaj zmienne środowiskowe
3. Deploy!

### Inne platformy

Projekt można hostować na:
- Netlify
- Railway
- DigitalOcean App Platform
- Własny serwer (Node.js)

## 📧 Kontakt

Masz pytania? Skontaktuj się:
- Email: contact@example.com
- GitHub: [@twoj-username](https://github.com/twoj-username)

## 📄 Licencja

MIT License - używaj dowolnie!

---

Made with 💜 by [Twoje Imię]

