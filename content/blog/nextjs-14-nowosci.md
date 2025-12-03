---
title: "Next.js 14 - Przegląd nowości"
description: "Poznaj najważniejsze funkcje Next.js 14 - App Router, Server Actions, i wiele więcej."
date: "2024-11-15"
tags: ["Next.js", "React", "Web Development", "JavaScript"]
image: "/images/blog/nextjs.jpg"
author: "Autor"
---

# Next.js 14 - Co nowego?

Next.js 14 to kolejna wielka aktualizacja popularnego frameworka React. Przyjrzyjmy się najważniejszym nowościom!

## Turbopack - Szybszy development

Turbopack to nowy bundler napisany w Rust, który znacząco przyspiesza development:

- **Do 53% szybsze** uruchamianie serwera
- **Natychmiastowe** hot module replacement
- Optymalizacja pod wielkie projekty

## Server Actions - Stabilne

Server Actions to teraz stabilna funkcja. Pozwalają na wykonywanie operacji serwerowych bezpośrednio z komponentów:

```typescript
async function submitForm(formData: FormData) {
  'use server'
  
  const email = formData.get('email')
  await saveToDatabase(email)
  
  redirect('/success')
}
```

## Partial Prerendering (Preview)

Nowa funkcja pozwalająca na częściowe prerenderowanie stron:

- Statyczne części są generowane podczas build
- Dynamiczne części są streamowane w runtime
- Najlepsze z dwóch światów!

## Metadane API

Ulepszone API do zarządzania metadanymi SEO:

```typescript
export const metadata: Metadata = {
  title: 'Moja aplikacja',
  description: 'Opis aplikacji',
  openGraph: {
    title: 'Moja aplikacja',
    images: ['/og-image.png'],
  },
}
```

## Podsumowanie

Next.js 14 to solidna aktualizacja, która:

1. Przyspiesza development z Turbopack
2. Upraszcza Server Actions
3. Wprowadza Partial Prerendering
4. Ulepsza developer experience

Warto zaktualizować swoje projekty! 🚀

