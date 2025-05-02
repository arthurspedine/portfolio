'use client'

import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className='w-full py-1.5 text-center'>
      <span className='text-muted-foreground text-xs sm:text-sm'>
        {t('rights')}
      </span>
    </footer>
  )
}
