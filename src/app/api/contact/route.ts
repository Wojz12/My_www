import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    // Rate limiting - 5 requests per 15 minutes per IP
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
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

    // Parse JSON body
    const body = await request.json()
    const { name, email, message, company } = body

    // Trim and normalize inputs
    const trimmedName = (name || '').trim()
    const trimmedEmail = (email || '').trim().toLowerCase()
    const trimmedMessage = (message || '').trim()
    const honeypotValue = (company || '').trim()

    // Honeypot check - if company field is filled, it's a bot
    // Return success to fool the bot, but don't process
    if (honeypotValue) {
      console.log('Honeypot triggered, ignoring submission')
      return NextResponse.json(
        { ok: true },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    // Validation
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Send email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail = process.env.CONTACT_EMAIL || 'soczynskiwojtek@gmail.com'

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipientEmail,
          subject: `Nowa wiadomość od ${trimmedName}`,
          html: `
            <h2>Nowa wiadomość z formularza kontaktowego</h2>
            <p><strong>Imię:</strong> ${trimmedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${trimmedEmail}">${trimmedEmail}</a></p>
            <p><strong>Wiadomość:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 8px;">${trimmedMessage}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Wysłano ze strony portfolio</p>
          `,
          reply_to: trimmedEmail,
        }),
      })

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json()
        console.error('Resend API failed:', resendResponse.status, errorData)
        return NextResponse.json(
          { error: 'Failed to send message' },
          { status: 502 }
        )
      }

      // Send auto-reply to the sender
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Wojtek Soczyński <onboarding@resend.dev>',
          to: trimmedEmail,
          subject: 'Dziękuję za wiadomość! 👋',
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #6366f1;">Cześć ${trimmedName}! 👋</h2>
              <p style="color: #374151; line-height: 1.6;">
                Dziękuję za Twoją wiadomość! Otrzymałem ją i postaram się odpowiedzieć najszybciej jak to możliwe.
              </p>
              <p style="color: #374151; line-height: 1.6;">
                W międzyczasie zapraszam do sprawdzenia moich projektów na 
                <a href="https://github.com/Wojz12" style="color: #6366f1;">GitHubie</a>.
              </p>
              <p style="color: #374151; line-height: 1.6;">
                Pozdrawiam,<br>
                <strong>Wojtek Soczyński</strong>
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #9ca3af; font-size: 12px;">
                To jest automatyczna odpowiedź. Nie odpowiadaj na tego maila.
              </p>
            </div>
          `,
        }),
      }).catch(err => {
        // Don't fail the whole request if auto-reply fails
        console.error('Failed to send auto-reply:', err)
      })

      console.log('Contact form submitted successfully:', {
        name: trimmedName,
        email: trimmedEmail,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        { ok: true },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    } catch (fetchError) {
      console.error('Error sending email via Resend:', fetchError)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
