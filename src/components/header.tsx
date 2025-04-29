'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { ModeSwitcher } from './theme-switcher'
import { usePathname, useRouter } from 'next/navigation'
import { MobileHeader } from './mobile-header'
import Image from 'next/image'
import github_dark from '../../public/github_dark.svg'
import github_light from '../../public/github_light.svg'
import linkedin_dark from '../../public/linkedin_dark.svg'
import linkedin_light from '../../public/linkedin_light.svg'
import { useTheme } from 'next-themes'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('header')
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const toggleLanguage = () => {
    const currentLocale = pathname.startsWith('/en') ? 'en' : 'pt'
    const newLocale = currentLocale === 'pt' ? 'en' : 'pt'

    const newPathname = `/${newLocale}${pathname.replace(/^\/(en|pt)/, '')}`
    router.push(newPathname)
  }

  const githubLogoSrc =
    mounted && resolvedTheme === 'dark' ? github_dark : github_light

  const linkedinLogoSrc =
    mounted && resolvedTheme === 'dark' ? linkedin_dark : linkedin_light

  return (
    <header className='fixed top-6 max-w-[1440px] w-full z-10 min-h-16 rounded-2xl rounded-b-none shadow-xl flex items-center justify-between px-4 py-3 bg-accent/50 border-border/25 border backdrop-blur-xs'>
      <div className='flex items-center space-x-4'>
        <a
          href='https://github.com/arthurspedine'
          target='_blank'
          rel='noreferrer'
        >
          <Image src={githubLogoSrc} className='size-8' alt='GitHub Icon' />
        </a>
        <a
          href='https://linkedin.com/in/arthurspedine'
          target='_blank'
          rel='noreferrer'
        >
          <Image src={linkedinLogoSrc} className='size-8' alt='GitHub Icon' />
        </a>
      </div>

      <nav className='hidden md:flex gap-6'>
        <Link href='#about'>{t('about')}</Link>
        <Link href='#skills'>{t('skills')}</Link>
        <Link href='#projects'>{t('projects')}</Link>
        <Link href='#contact'>{t('contact')}</Link>
      </nav>

      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={toggleLanguage}
          className='text-lg size-8'
        >
          {pathname.startsWith('/en') ? '🇺🇸' : '🇧🇷'}
        </Button>
        <ModeSwitcher />
        <MobileHeader />
      </div>
    </header>
  )
}
