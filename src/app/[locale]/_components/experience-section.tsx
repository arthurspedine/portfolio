'use client'

import { BookOpen, Briefcase, Calendar, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

type ExperienceType = 'professional' | 'academic'

interface Skill {
  name: string
  level?: number
}

interface ExperienceProps {
  title: string
  organization: string
  period: string
  description?: string
  type: ExperienceType
  skills?: Skill[]
  delay: number
}

function ExperienceCard({
  title,
  organization,
  period,
  description,
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

      <p className='text-secondary-foreground mt-2'>{organization}</p>

      {description && (
        <p className='text-muted-foreground text-sm mt-1'>{description}</p>
      )}

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

export function ExperienceSection() {
  const [professionalExperiences, setProfessionalExperiences] = useState<
    ExperienceProps[]
  >([])

  const [academicExperiences, setAcademicExperiences] = useState<
    ExperienceProps[]
  >([])

  const t = useTranslations('experiences')
  const locale = useLocale()

  useEffect(() => {
    async function getExperiences() {
      setProfessionalExperiences([])
      setAcademicExperiences([])
      const req = await fetch(`/api/experiences?locale=${locale}`)
      const response: ExperienceProps[] = await req.json()

      const professionalItems: ExperienceProps[] = []
      const academicItems: ExperienceProps[] = []

      response.forEach(element => {
        if (element.type === 'professional') {
          professionalItems.push(element)
        } else {
          academicItems.push(element)
        }
      })

      setProfessionalExperiences(professionalItems)
      setAcademicExperiences(academicItems)
    }
    getExperiences()
  }, [locale])

  return (
    <section
      className='w-full py-16 px-4 sm:px-6 lg:px-8 transition-all'
      id='experiences'
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

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12'>
        {/* Professional Experiences */}
        <div className='space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileInView={{ opacity: 1 }}
            className='flex items-center gap-2 mb-4'
          >
            <Briefcase className='size-5 text-primary' />
            <h3 className='text-xl font-semibold'>{t('professional')}</h3>
          </motion.div>
          <div className='space-y-4'>
            {professionalExperiences.map((exp, index) => (
              <ExperienceCard
                key={`prof-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: no problem in this case
                  index
                }`}
                title={exp.title}
                organization={exp.organization}
                period={exp.period}
                description={exp.description}
                type='professional'
                skills={exp.skills}
                delay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* ACADEMIC EXPERIENCES */}
        <div className='space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className='flex items-center gap-2 mb-4'
          >
            <BookOpen className='size-5 text-primary' />
            <h3 className='text-xl font-semibold'>{t('education')}</h3>
          </motion.div>
          <div className='space-y-4'>
            {academicExperiences.map((exp, index) => (
              <ExperienceCard
                key={`acad-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: no problem in this case
                  index
                }`}
                title={exp.title}
                organization={exp.organization}
                period={exp.period}
                description={exp.description}
                type='academic'
                skills={exp.skills}
                delay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
