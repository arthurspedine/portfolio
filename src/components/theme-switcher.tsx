'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { useTranslations } from 'next-intl'

export function ModeSwitcher() {
  const t = useTranslations()
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant='outline'
      size='icon'
      className='group/toggle size-8'
      onClick={toggleTheme}
    >
      <SunIcon className='hidden [html.dark_&]:block' />
      <MoonIcon className='hidden [html.light_&]:block' />
      <span className='sr-only'>{t('switchTheme')}</span>
    </Button>
  )
}
