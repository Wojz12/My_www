import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './src/i18n-config'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale - always use Polish as default
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(
                `/pl${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|images|google8146757519a86b51.html|robots.txt|sitemap.xml).*)'],
}

