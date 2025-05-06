'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { ModeSwitcher } from './theme-switcher'
import { usePathname, useRouter } from 'next/navigation'
import { MobileHeader } from './mobile-header'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { routes } from '@/helper/routes'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('header')
  const { theme } = useTheme()
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

  return (
    <header className='fixed top-0 sm:top-2 max-w-[1440px] w-full z-50 min-h-16 rounded-2xl rounded-b-none shadow-xl flex items-center justify-between px-4 py-3 border-border/25 border backdrop-blur-md'>
      <div className='flex items-center space-x-4'>
        <a
          href='https://github.com/arthurspedine'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            src={
              mounted && theme === 'dark'
                ? '/svg/about/github_dark.svg'
                : '/svg/about/github_light.svg'
            }
            width={32}
            height={32}
            alt='GitHub Icon'
          />
        </a>
        <a
          href='https://linkedin.com/in/arthurspedine'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            src={
              mounted && theme === 'dark'
                ? '/svg/about/linkedin_dark.svg'
                : '/svg/about/linkedin_light.svg'
            }
            width={32}
            height={32}
            alt='Linkedin Icon'
          />
        </a>
      </div>

      <nav className='hidden md:flex gap-6 text-sm'>
        {routes.map(route => (
          <div key={route.label} className='relative group'>
            <Link href={route.href} className='relative'>
              {t(route.label)}
              <span className='absolute h-0.5 bg-current left-0 -bottom-0.5 w-0 group-hover:w-full transition-all duration-300' />
            </Link>
          </div>
        ))}
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
