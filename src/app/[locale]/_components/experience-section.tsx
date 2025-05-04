'use client'

import { BookOpen, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { ExperienceProps } from '@/types'
import { ExperienceCard } from '@/components/experience-card'

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
                icon={exp.icon}
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
                icon={exp.icon}
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
