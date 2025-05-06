import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {} from 'lucide-react'
import { CopyButton } from './copy-button'

type ContactItemProps = {
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}

export function ContactCard({
  icon,
  label,
  value,
  className,
}: ContactItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md hover:shadow-primary/10 transition-all',
        className
      )}
    >
      <div className='flex items-center justify-between w-full sm:w-fit'>
        <div className='flex-shrink-0 size-8 sm:size-10 flex items-center justify-center bg-primary/10 text-primary rounded-full'>
          {icon}
        </div>
        <CopyButton value={value} className='flex sm:hidden' />
      </div>
      <div className='flex-1'>
        <p className='text-sm text-muted-foreground'>{label}</p>
        <p className='font-medium text-sm md:text-base break-words whitespace-normal'>
          {value}
        </p>
      </div>
      <CopyButton value={value} />
    </motion.div>
  )
}
