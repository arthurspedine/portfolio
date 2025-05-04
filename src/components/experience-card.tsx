import type { ExperienceProps } from '@/types'
import { motion } from 'framer-motion'
import { Briefcase, BookOpen, Calendar, Code } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function ExperienceCard({
  title,
  organization,
  period,
  description,
  icon,
  type,
  skills,
  delay,
}: ExperienceProps) {
  const t = useTranslations('experiences')
  return (
    <motion.div
      initial={{ opacity: 0, x: type === 'professional' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: delay, duration: 0.3 }}
      className='border border-border rounded-lg p-4 bg-card/60 backdrop-blur-sm hover:shadow-md hover:shadow-primary/10 transition-all relative overflow-hidden'
    >
      <div className='absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary/80 to-primary/20' />

      <div className='flex items-start justify-between flex-col gap-1'>
        <div className='flex items-center gap-2'>
          {type === 'professional' ? (
            <Briefcase className='size-5 text-primary' />
          ) : (
            <BookOpen className='size-5 text-primary' />
          )}
          <h3 className='font-medium text-lg'>{title}</h3>
        </div>

        <div className='flex items-center gap-1 text-sm text-muted-foreground text-nowrap'>
          <Calendar className='size-4' />
          <span>{period}</span>
        </div>
      </div>

      <p className='text-secondary-foreground mt-2 flex gap-2'>
        <Image
          src={icon}
          alt={`${organization} icon`}
          width={64}
          height={24}
          className='rounded-md'
        />
        {organization}
      </p>

      <p className='text-muted-foreground text-sm mt-1'>{description}</p>

      {skills && skills.length > 0 && (
        <div className='mt-3'>
          <div className='flex items-center gap-1 mb-2 text-xs text-muted-foreground'>
            <Code className='size-3.5' />
            <span>{t('mainSkillsText')}</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            {skills.map(skill => (
              <span
                key={skill.name}
                className='px-2 py-1 bg-secondary/30 text-xs rounded-md border border-border'
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
