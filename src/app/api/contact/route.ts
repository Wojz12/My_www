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

    // Build payload for n8n webhook
    const n8nPayload = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      source: 'website',
      source_url: 'https://wojteksoczynski.vercel.app/pl#contact',
    }

    // Send to n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    const webhookToken = process.env.N8N_WEBHOOK_TOKEN

    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL is not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    try {
      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(webhookToken && { 'x-webhook-token': webhookToken }),
        },
        body: JSON.stringify(n8nPayload),
      })

      if (!n8nResponse.ok) {
        console.error('n8n webhook failed:', n8nResponse.status, await n8nResponse.text())
        return NextResponse.json(
          { error: 'Failed to process message' },
          { status: 502 }
        )
      }

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
      console.error('Error calling n8n webhook:', fetchError)
      return NextResponse.json(
        { error: 'Failed to process message' },
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
