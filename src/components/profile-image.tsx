import { cn } from '@/lib/utils'
import Image from 'next/image'

export function ProfileImage({
  width = 320,
  height = 320,
  className,
}: { width?: number; height?: number; className?: string }) {
  return (
    <Image
      src={'https://github.com/arthurspedine.png'}
      alt="Arthur's picture"
      className={cn('bg-accent/50 rounded-full shadow-2xl', className)}
      width={width}
      height={height}
      priority={false}
    />
  )
}
