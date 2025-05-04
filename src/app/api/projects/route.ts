import { getTranslations } from 'next-intl/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const locale = url.searchParams.get('locale') || 'en'

  const t = await getTranslations({ locale, namespace: 'projects.summary' })

  const projects = [
    {
      id: 'penaestrada-app',
      title: 'Pé na Estrada',

      description: t('pe-na-estrada.description'),
      technologies: [
        'Java',
        'Jersey',
        'Oracle SQL',
        'Next.Js',
        'Docker',
        'Google Gemini',
        'IBM Watson',
      ],
      image: '/projects/penaestrada.png',
      github: 'https://github.com/arthurspedine/pe-na-estrada-frontend',
      liveUrl: 'https://penaestrada.vercel.app',
      featured: true,
      award: t('pe-na-estrada.award'),
    },
    {
      id: 'spotit-app',
      title: 'spot.it',
      description: t('spot-it.description'),
      technologies: [
        'Next.js',
        'Deepface',
        'PostgreSQL',
        'Azure',
        'Docker',
        'Node.Js',
      ],
      image: '/projects/spotit.png',
      liveUrl: 'https://ic-spot-it.vercel.app',
      featured: false,
    },
  ]

  const response = NextResponse.json(projects)
  const isDev = process.env.NODE_ENV === 'development'
  response.headers.set(
    'Cache-Control',
    isDev
      ? 'no-store'
      : // Cache for 1 hour
        'public, max-age=3600, stale-while-revalidate=86400'
  )

  return NextResponse.json(projects)
}
