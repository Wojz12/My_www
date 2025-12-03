---
title: "10 przydatnych trików Tailwind CSS"
description: "Poznaj najlepsze praktyki i triki, które ułatwią Ci pracę z Tailwind CSS."
date: "2024-10-20"
tags: ["CSS", "Tailwind", "Frontend", "Design"]
image: "/images/blog/tailwind.jpg"
author: "Autor"
---

# 10 przydatnych trików Tailwind CSS

Tailwind CSS to potężne narzędzie. Oto 10 trików, które wykorzystuję na co dzień.

## 1. Grupowanie hover states

Użyj `group` i `group-hover` dla efektów na potomkach:

```html
<div class="group">
  <img class="group-hover:scale-110 transition" />
  <p class="group-hover:text-blue-500">Tekst</p>
</div>
```

## 2. Arbitralne wartości

Używaj nawiasów kwadratowych dla custom wartości:

```html
<div class="w-[237px] bg-[#1a1a1a] text-[13px]">
  Custom styling
</div>
```

## 3. Responsywne ukrywanie

Kombinuj `hidden` z breakpointami:

```html
<div class="hidden md:block">Widoczne na desktop</div>
<div class="md:hidden">Widoczne na mobile</div>
```

## 4. Dark mode

Włącz dark mode i używaj prefixu `dark:`:

```html
<div class="bg-white dark:bg-gray-900">
  <p class="text-black dark:text-white">Tekst</p>
</div>
```

## 5. Focus-within

Style na rodzica gdy dziecko ma focus:

```html
<div class="focus-within:ring-2 focus-within:ring-blue-500">
  <input type="text" />
</div>
```

## 6. Prose dla treści

Użyj `@tailwindcss/typography` dla stylowania tekstu:

```html
<article class="prose prose-lg prose-purple">
  <h1>Tytuł</h1>
  <p>Paragraf ze stylami...</p>
</article>
```

## 7. Space utilities

Szybkie marginesy między dziećmi:

```html
<div class="space-y-4">
  <div>Element 1</div>
  <div>Element 2</div>
  <div>Element 3</div>
</div>
```

## 8. Gradient text

Piękny gradient na tekście:

```html
<h1 class="bg-gradient-to-r from-purple-500 to-pink-500 
           bg-clip-text text-transparent">
  Gradient Text
</h1>
```

## 9. Aspect ratio

Kontroluj proporcje:

```html
<div class="aspect-video">
  <img class="w-full h-full object-cover" />
</div>
```

## 10. Animacje

Wbudowane animacje:

```html
<div class="animate-pulse">Loading...</div>
<div class="animate-spin">⚙️</div>
<div class="animate-bounce">⬇️</div>
```

## Bonus: @apply

Twórz własne klasy:

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg 
           hover:bg-blue-600 transition;
  }
}
```

---

Masz swoje ulubione triki? Napisz do mnie! 💜

