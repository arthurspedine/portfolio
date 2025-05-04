'use client'

import { ProjectCard } from '@/components/project-card'
import { Spinner } from '@/components/spinner'
import type { ProjectProps } from '@/types'
import { motion } from 'framer-motion'
import {} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [loading, setLoading] = useState(true)

  const t = useTranslations('projects')
  const locale = useLocale()

  useEffect(() => {
    async function getProjects() {
      setLoading(true)
      const req = await fetch(`/api/projects?locale=${locale}`)
      const res: ProjectProps[] = await req.json()
      setProjects(res)
      setLoading(false)
    }
    getProjects()
  }, [locale])

  return (
    <section
      className='w-full py-20 px-4 sm:px-6 lg:px-8 transition-all'
      id='projects'
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
      {loading ? (
        <div className='flex justify-center items-center py-20'>
          <Spinner />
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      )}
    </section>
  )
}
