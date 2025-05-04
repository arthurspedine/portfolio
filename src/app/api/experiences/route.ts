import { getTranslations } from 'next-intl/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const locale = url.searchParams.get('locale') || 'en'

  const t = await getTranslations({ locale, namespace: 'experiences.summmary' })
  const experiences = [
    {
      title: t('opella.title'),
      organization: 'Opella',
      period: t('opella.period'),
      description: t('opella.description'),
      icon: '/svg/experiences/opella.svg',
      type: 'professional' as const,
      skills: [
        { name: t('opella.mainSkills.1.label') },
        { name: t('opella.mainSkills.2.label') },
        { name: t('opella.mainSkills.3.label') },
      ],
    },
    {
      title: t('fiap.title'),
      organization: 'FIAP',
      period: t('fiap.period'),
      description: t('fiap.description'),
      icon: '/svg/experiences/fiap.svg',
      type: 'academic' as const,
      skills: [
        { name: t('fiap.mainSkills.1.label') },
        { name: t('fiap.mainSkills.2.label') },
        { name: t('fiap.mainSkills.3.label') },
      ],
    },
  ]
  const response = NextResponse.json(experiences)
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
