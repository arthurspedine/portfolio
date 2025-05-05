import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type ContactItemProps = {
  icon: React.ReactNode
  label: string
  value: string
  delay: number
  className?: string
}

export function ContactCard({
  icon,
  label,
  value,
  delay,
  className,
}: ContactItemProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md hover:shadow-primary/10 transition-all hover:cursor-pointer',
        className
      )}
      onClick={handleCopy}
    >
      <div className='flex items-center justify-between w-full sm:w-fit'>
        <div className='flex-shrink-0 size-8 sm:size-10 flex items-center justify-center bg-primary/10 text-primary rounded-full'>
          {icon}
        </div>
        <button
          type='button'
          className='flex sm:hidden flex-shrink-0 size-8 items-center justify-center bg-secondary rounded-full text-secondary-foreground hover:bg-secondary/80 hover:cursor-pointer transition-colors'
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        >
          {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
        </button>
      </div>
      <div className='flex-1'>
        <p className='text-sm text-muted-foreground'>{label}</p>
        <p className='font-medium text-sm md:text-base break-words whitespace-normal'>
          {value}
        </p>
      </div>
      <button
        type='button'
        className='hidden sm:flex flex-shrink-0 size-6 sm:size-8 items-center justify-center bg-secondary rounded-full text-secondary-foreground hover:bg-secondary/80 hover:cursor-pointer transition-colors'
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      >
        {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
      </button>
    </motion.div>
  )
}
