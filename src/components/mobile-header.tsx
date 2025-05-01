'use client'

import { useState } from 'react'
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

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('header')

  const menuItems = [
    { href: '#about', label: 'about' },
    { href: '#skills', label: 'skills' },
    { href: '#projects', label: 'projects' },
    { href: '#contact', label: 'contact' },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleLinkClick = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className='md:hidden relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleToggle}
            aria-label='Toggle Menu'
            className='size-8 flex items-center'
          >
            <Menu className='size-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 mr-4'>
          {menuItems.map(item => (
            <motion.div
              key={item.href}
              variants={menuItemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <DropdownMenuItem asChild>
                <Link
                  href={item.href}
                  className='text-md font-medium hover:cursor-pointer'
                  onClick={handleLinkClick}
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
