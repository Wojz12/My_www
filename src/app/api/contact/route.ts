import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
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
      { status: 200 }
    )
  } catch (error) {
    console.error('Błąd wysyłania wiadomości:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    )
  }
}

