'use client'
import { ContactCard } from '@/components/contact-card'
import { Spinner } from '@/components/spinner'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, User } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

type ContactItemData = {
  iconName: string
  label: string
  value: string
}

export function ContactSection() {
  const locale = useLocale()
  const t = useTranslations('contact')
  const [contacts, setContacts] = useState<ContactItemData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const iconMap: Record<string, React.ReactNode> = {
    Mail: <Mail className='size-5' />,
    Github: <Github className='size-5' />,
    Linkedin: <Linkedin className='size-5' />,
  }

  useEffect(() => {
    async function getContactItems() {
      const response = await fetch(`/api/contacts?locale=${locale}`)
      if (!response.ok) {
        throw new Error('Failed to fetch contact data')
      }
      const data: ContactItemData[] = await response.json()
      setContacts(data)
      setIsLoading(false)
    }

    getContactItems()
  }, [locale])

  return (
    <section
      className='w-full py-16 px-4 sm:px-6 lg:px-8 transition-all'
      id='contact'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        className='text-center mb-12'
      >
        <h2 className='text-3xl font-bold bg-gradient-to-tr from-primary to-primary/60 bg-clip-text text-transparent'>
          {t('title')}
        </h2>
        <p className='text-muted-foreground mt-2'>{t('description')}</p>
      </motion.div>
      {isLoading ? (
        <div className='flex justify-center py-8'>
          <Spinner />
        </div>
      ) : (
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
          {contacts.map((contact, index) => {
            const isLast = index === contacts.length - 1
            const isOdd = contacts.length % 2 !== 0
            const shouldSpan = isLast && isOdd
            return (
              <ContactCard
                key={contact.label}
                icon={iconMap[contact.iconName] || <User className='size-5' />}
                label={contact.label}
                value={contact.value}
                className={shouldSpan ? 'md:col-span-2' : ''}
              />
            )
          })}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='text-center mt-10 text-sm text-muted-foreground'
      >
        <p>{t('clickToCopy')}</p>
      </motion.div>
    </section>
  )
}
