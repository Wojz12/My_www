/**
 * Prosty rate limiter oparty na IP
 * Dla produkcji na większą skalę rozważ użycie Redis (@upstash/ratelimit)
 */

interface RateLimitStore {
  count: number
  resetTime: number
}

// Map przechowująca limity per IP
const rateLimitStore = new Map<string, RateLimitStore>()

// Czyszczenie starego cache co 5 minut
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of rateLimitStore.entries()) {
    if (data.resetTime < now) {
      rateLimitStore.delete(ip)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitOptions {
  maxRequests: number // Maksymalna liczba requestów
  windowMs: number // Okno czasowe w milisekundach
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
  limit: number
}

/**
 * Sprawdza czy request nie przekracza limitu
 * @param identifier - Unikalny identyfikator (IP, user ID, etc.)
 * @param options - Opcje rate limitingu
 * @returns Wynik sprawdzenia limitu
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minuta domyślnie
  }
): RateLimitResult {
  const now = Date.now()
  const stored = rateLimitStore.get(identifier)

  // Jeśli nie ma wpisu lub okno czasowe minęło, utwórz nowy
  if (!stored || stored.resetTime < now) {
    const resetTime = now + options.windowMs
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    })

    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetTime,
      limit: options.maxRequests,
    }
  }

  // Jeśli limit został przekroczony
  if (stored.count >= options.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: stored.resetTime,
      limit: options.maxRequests,
    }
  }

  // Zwiększ licznik
  stored.count++
  rateLimitStore.set(identifier, stored)

  return {
    success: true,
    remaining: options.maxRequests - stored.count,
    resetTime: stored.resetTime,
    limit: options.maxRequests,
  }
}

/**
 * Pobiera IP z requestu (uwzględnia proxy/load balancer)
 */
export function getClientIP(request: Request): string {
  // Sprawdź nagłówki proxy (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback - użyj losowego identyfikatora (nie idealne, ale lepsze niż nic)
  return 'unknown'
}
