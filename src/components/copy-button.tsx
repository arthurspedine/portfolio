'use client'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function CopyButton({
  value,
  className,
}: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      // Fallback para dispositivos sem clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.style.position = 'fixed' // evita rolagem
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  return (
    <button
      type='button'
      onClick={handleCopy}
      className={cn(
        'hidden sm:flex flex-shrink-0 size-8 items-center justify-center bg-secondary rounded-full text-secondary-foreground hover:bg-secondary/80 transition-colors hover:cursor-pointer',
        className
      )}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
    </button>
  )
}
