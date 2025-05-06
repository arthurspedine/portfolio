import type { ProjectProps } from '@/types'
import { motion } from 'framer-motion'
import { Trophy, Github, ExternalLink } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'

export function ProjectCard({ project }: { project: ProjectProps }) {
  const locale = useLocale()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col border border-border rounded-lg overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-md hover:shadow-primary/10 transition-all ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className='relative h-48 overflow-hidden'>
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={300}
          quality={100}
          className='w-full h-full object-cover transition-transform hover:scale-105'
        />
        {project.featured && (
          <div className='absolute top-4 right-2'>
            <span className='p-2 rounded-lg border bg-input shadow-xs dark:bg-input/30 dark:border-input'>
              {locale === 'en' ? 'Featured' : 'Destaque'}
            </span>
          </div>
        )}
      </div>

      <div className='p-4 flex flex-col justify-between grow'>
        <div className='space-y-4'>
          <div>
            <h3 className='text-xl font-semibold'>{project.title}</h3>
            {project.award ? (
              <div className='flex items-center gap-2 text-sm font-medium text-yellow-600'>
                <Trophy className='size-4' />
                <span>{project.award}</span>
              </div>
            ) : (
              <div className='size-4' />
            )}
          </div>
          <p className='text-muted-foreground text-sm'>{project.description}</p>

          <div className='flex flex-wrap gap-2 mt-3'>
            {project.technologies.map(tech => (
              <span
                key={tech}
                className='flex items-center gap-2 px-2 py-1 bg-secondary/30 border border-border rounded-md text-xs sm:text-sm font-code'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className='flex justify-end space-x-3 pt-2'>
          {project.github && (
            <a
              href={project.github}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-primary transition-colors'
              aria-label='View GitHub repository'
            >
              <Github className='size-5' />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-primary transition-colors'
              aria-label='Visit live site'
            >
              <ExternalLink className='size-5' />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
