# n8n Workflow: ARC-AGI Leaderboard Auto-Update

## Opis
Ten workflow automatycznie pobiera dane z ARC-AGI leaderboard i aktualizuje Twoją stronę.

## Konfiguracja

### 1. Dodaj zmienną środowiskową
W pliku `.env.local` dodaj:
```
ARC_AGI_UPDATE_KEY=twoj-tajny-klucz-12345
```

### 2. Workflow w n8n

#### Struktura workflow:
```
[Schedule Trigger] → [HTTP Request: Scrape ARC-AGI] → [Code: Parse Data] → [HTTP Request: Update API]
```

---

## Nodes

### 1. Schedule Trigger
- **Type**: Schedule Trigger
- **Settings**: 
  - Interval: Every day at 6:00 AM (lub co godzinę)

### 2. HTTP Request - Scrape ARC-AGI (z AI Browser Agent)
- **Type**: HTTP Request lub AI Agent z przeglądarką
- **URL**: `https://arcprize.org/leaderboard`
- **Method**: GET
- **Opcjonalnie**: Użyj narzędzia do web scrapingu (np. Apify, Browserless)

### 3. Code Node - Parse Leaderboard Data
```javascript
// Parsuj dane z HTML/JSON
// Przykład jeśli masz surowe dane:
const rawData = $input.first().json;

// Mapowanie danych do formatu API
const leaderboard = [
  { rank: 1, model: "GPT-5.2 Pro (High)", author: "OpenAI", score: "54.2%" },
  { rank: 2, model: "Gemini 3 Pro (Refine.)", author: "Poetiq", score: "54.0%" },
  { rank: 3, model: "GPT-5.2 (X-High)", author: "OpenAI", score: "52.9%" },
  { rank: 4, model: "Gemini 3 Deep Think", author: "Google", score: "45.1%" },
  { rank: 5, model: "GPT-5.2 (High)", author: "OpenAI", score: "43.3%" }
];

return { json: { leaderboard } };
```

### 4. HTTP Request - Update Your API
- **Type**: HTTP Request
- **Method**: POST
- **URL**: `https://twoja-strona.vercel.app/api/arc-leaderboard`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer twoj-tajny-klucz-12345",
    "Content-Type": "application/json"
  }
  ```
- **Body** (JSON):
  ```json
  {
    "leaderboard": {{ $json.leaderboard }}
  }
  ```

---

## Przykładowe żądanie do API

### cURL
```bash
curl -X POST https://twoja-strona.vercel.app/api/arc-leaderboard \
  -H "Authorization: Bearer twoj-tajny-klucz-12345" \
  -H "Content-Type: application/json" \
  -d '{
    "leaderboard": [
      { "rank": 1, "model": "GPT-5.2 Pro (High)", "author": "OpenAI", "score": "54.2%" },
      { "rank": 2, "model": "Gemini 3 Pro (Refine.)", "author": "Poetiq", "score": "54.0%" },
      { "rank": 3, "model": "GPT-5.2 (X-High)", "author": "OpenAI", "score": "52.9%" },
      { "rank": 4, "model": "Gemini 3 Deep Think", "author": "Google", "score": "45.1%" },
      { "rank": 5, "model": "GPT-5.2 (High)", "author": "OpenAI", "score": "43.3%" }
    ]
  }'
```

---

## Alternatywa: Ręczne scrapowanie z AI

Jeśli masz dostęp do AI Agent w n8n z możliwością przeglądania stron:

### AI Agent Node
- **Prompt**: 
  ```
  Wejdź na stronę https://arcprize.org/leaderboard
  Znajdź tabelę z wynikami ARC-AGI-2.
  Zwróć top 5 systemów AI (bez Human Panel) w formacie JSON:
  {
    "leaderboard": [
      { "rank": 1, "model": "nazwa modelu", "author": "autor", "score": "wynik%" }
    ]
  }
  ```

---

## Testowanie

1. Otwórz w przeglądarce: `https://twoja-strona.vercel.app/api/arc-leaderboard`
2. Powinieneś zobaczyć instrukcję użycia API
3. Przetestuj workflow w n8n na trybie manual
4. Sprawdź czy dane na stronie się zaktualizowały

---

## Uwagi

- API aktualizuje oba pliki słowników (PL i EN)
- Dane są ograniczone do top 5 pozycji
- Wymaga redeployu na Vercel po aktualizacji (lub użyj ISR/webhooks)
