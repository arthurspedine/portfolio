'use client'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function ProfileInfoButton({ className }: { className?: string }) {
  const t = useTranslations('landingPage')
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className={cn('flex flex-col items-center gap-4', className)}
    >
      <Button className='w-40' asChild>
        <Link href={'#contact'}>{t('contactBtn')}</Link>
      </Button>
      <Button className='w-40' variant={'secondary'}>
        {t('resumeBtn')}
      </Button>
    </motion.div>
  )
}
