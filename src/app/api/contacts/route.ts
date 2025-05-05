import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'en'

  const contacts = [
    {
      iconName: 'Mail',
      label: locale === 'pt' ? 'E-mail' : 'Email',
      value: 'spedinearthur@gmail.com',
    },
    {
      iconName: 'Github',
      label: 'GitHub',
      value: 'github.com/arthurspedine',
    },
    {
      iconName: 'Linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/arthurspedine',
    },
  ]

  const response = NextResponse.json(contacts)
  const isDev = process.env.NODE_ENV === 'development'
  response.headers.set(
    'Cache-Control',
    isDev
      ? 'no-store'
      : // Cache for 1 hour
        'public, max-age=3600, stale-while-revalidate=86400'
  )

  return response
}
