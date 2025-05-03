'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { routes } from '@/helper/routes'

export function MobileHeader() {
  const t = useTranslations('header')

  return (
    <div className='md:hidden relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Toggle Menu'
            className='size-8 flex items-center'
          >
            <Menu className='size-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 mr-4 p-2'>
          {routes.map(item => (
            <motion.div
              key={item.href}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <DropdownMenuItem asChild>
                <Link
                  href={item.href}
                  className='text-md font-medium hover:cursor-pointer'
                >
                  {t(item.label)}
                </Link>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
