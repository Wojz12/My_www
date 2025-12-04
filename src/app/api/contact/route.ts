import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

export async function POST(request: Request) {
  try {
    // Rate limiting - 5 requestów na 15 minut per IP (bardziej restrykcyjne dla formularza)
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minut
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Zbyt wiele prób wysłania wiadomości. Spróbuj ponownie później.',
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
    const { name, email, subject, message } = body

    // Walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być wypełnione' },
        { status: 400 }
      )
    }

    // Tutaj możesz dodać:
    // 1. Wysyłanie emaila przez Nodemailer, Resend, SendGrid itp.
    // 2. Zapisywanie do bazy danych
    // 3. Integrację z zewnętrznym API
    
    console.log('Nowa wiadomość kontaktowa:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Przykład z komentarzem jak dodać wysyłanie emaila:
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'Portfolio <noreply@yourdomain.com>',
      to: 'your-email@example.com',
      subject: `Nowa wiadomość: ${subject || 'Brak tematu'}`,
      html: `
        <h2>Nowa wiadomość z portfolio</h2>
        <p><strong>Od:</strong> ${name} (${email})</p>
        <p><strong>Temat:</strong> ${subject || 'Brak tematu'}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `
    })
    */

    return NextResponse.json(
      { message: 'Wiadomość wysłana pomyślnie!' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )
  } catch (error) {
    console.error('Błąd wysyłania wiadomości:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    )
  }
}

