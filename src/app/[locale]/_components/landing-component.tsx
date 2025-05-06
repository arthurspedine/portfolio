'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Terminal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ProfileImage } from '@/components/profile-image'
import { useTranslations } from 'next-intl'
import { ProfileInfoButton } from '@/components/profile-info-button'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export function LandingComponent() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('landingPage')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  const techStack = [
    { name: 'Java', icon: 'java.svg' },
    { name: 'Spring Boot', icon: 'spring-boot.svg' },
    { name: 'PostgreSQL', icon: 'postgresql.svg' },
    { name: 'Oracle SQL', icon: 'oracle-sql.svg' },
    { name: 'Docker', icon: 'docker.svg' },
    { name: 'AWS', icon: 'aws-light.svg', dark: 'aws-dark.svg' },
    { name: 'Azure', icon: 'azure.svg' },
    { name: 'Next.Js', icon: 'next-light.svg', dark: 'next-dark.svg' },
    { name: 'React', icon: 'react.svg' },
  ]

  const pathname = usePathname()

  const userPwd =
    '<span class="text-green-500">spedine@server:<span class="text-blue-500">~/portfolio/main</span><span class="text-foreground">$</span></span>'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!terminalRef.current || !pathname) return

    const terminalEl = terminalRef.current

    const lines = [
      { type: 'command', text: 'sudo systemctl start portfolio.service' },
      { type: 'output', text: 'Starting portfolio service... Done' },
      { type: 'status', text: 'connecting to databases...' },
      {
        type: 'output',
        text: 'Connection established to PostgreSQL, MongoDB',
      },
      { type: 'status', text: 'optimizing cache layers...' },
      {
        type: 'output',
        text: 'Cache optimization complete: 127ms response time',
      },
      { type: 'status', text: 'initializing API endpoints...' },
      {
        type: 'output',
        text: 'Endpoints available: /api/projects, /api/experiences, /api/contacts, /api/resume',
      },
      { type: 'status', text: 'portfolio loaded successfully' },
      { type: 'success', text: 'Portfolio system operational. Welcome!' },
    ]

    let lineIndex = 0
    let charIndex = 0
    let currentOutput = ''
    let terminalContent = ''
    let timeoutId: NodeJS.Timeout | null = null
    let isCancelled = false

    const typeLine = () => {
      if (!terminalRef.current || isCancelled || lineIndex >= lines.length)
        return

      const currentLine = lines[lineIndex]

      if (charIndex < currentLine.text.length) {
        currentOutput += currentLine.text[charIndex]

        if (currentLine.type === 'command') {
          terminalEl.innerHTML = `${terminalContent}<div>${userPwd} ${currentOutput}<span class="animate-pulse">_</span></div>`
        } else if (currentLine.type === 'status') {
          terminalEl.innerHTML = `${terminalContent}<div class="text-muted-foreground">${currentOutput}<span class="animate-pulse">_</span></div>`
        } else {
          terminalEl.innerHTML = `${terminalContent}<div><span class="animate-pulse">_</span></div>`
        }

        charIndex++
        timeoutId = setTimeout(typeLine, Math.random() * 100 + 50)
      } else {
        if (currentLine.type === 'command') {
          terminalContent += `<div>${userPwd} ${currentOutput}</div>`
        } else if (currentLine.type === 'output') {
          terminalContent += `<div class="text-yellow-500">[${new Date().toLocaleTimeString()}] ${currentOutput}</div>`
        } else if (currentLine.type === 'status') {
          terminalContent += `<div class="text-muted-foreground">${currentOutput}</div>`
        } else if (currentLine.type === 'success') {
          terminalContent += `<div class="text-blue-500">[${new Date().toLocaleTimeString()}] [SUCCESS] ${currentOutput}</div>`
        }

        if (lineIndex + 1 === lines.length) {
          terminalEl.innerHTML = `${terminalContent}${userPwd} <span class="animate-pulse">_</span>`
        } else {
          terminalEl.innerHTML = `${terminalContent}<span class="animate-pulse">_</span>`
        }
        terminalEl.scrollTo({
          top: terminalEl.scrollHeight,
          behavior: 'smooth',
        })

        lineIndex++
        charIndex = 0
        currentOutput = ''

        let delay = 100
        if (lineIndex < lines.length) {
          const nextLine = lines[lineIndex]
          if (nextLine.type === 'output') delay = 300
          else if (nextLine.type === 'status') delay = 700

          timeoutId = setTimeout(typeLine, delay)
        }
      }
    }

    timeoutId = setTimeout(typeLine, 3000)

    return () => {
      isCancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [pathname])

  return (
    <>
      <div className='absolute bg-grid-pattern min-h-screen w-full shadow-lg shadow-foreground/10' />
      <div
        id='about'
        className='relative min-h-screen z-5 w-full max-w-[1440px] mx-auto flex flex-col items-center justify-between pt-20 pb-4 px-4 overflow-x-hidden md:py-24 lg:flex-row'
      >
        <div className='w-full space-y-2 lg:w-3/5 lg:space-y-4 mb-6 lg:mb-0'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='flex space-y-4 flex-col sm:flex-row sm:justify-between sm:space-y-0'
          >
            <div>
              <div className='inline-flex items-center space-x-2 lg:mb-4 text-primary/80'>
                <Terminal className='size-5' />
                <span className='text-sm font-code'>~/portfolio/main</span>
              </div>
              <h1 className='text-3xl lg:text-6xl font-bold bg-gradient-to-tr from-primary to-primary/60 bg-clip-text text-transparent'>
                <span className='text-2xl lg:text-4xl font-medium text-wrap'>
                  {t('greeting')}{' '}
                </span>
                Arthur Spedine
              </h1>
              <p className='mt-2 text-lg md:text-xl text-secondary-foreground'>
                {t('role')}
              </p>
              <p className='text-sm md:text-lg text-muted-foreground w-full sm:max-w-3/4'>
                {t('description')}
              </p>
            </div>

            <div className='flex flex-col items-center lg:hidden gap-4 sm:pt-6'>
              <ProfileImage
                width={160}
                height={160}
                className={
                  'shadow-md shadow-primary/50 sm:mx-auto object-cover'
                }
              />
              <ProfileInfoButton className='sm:flex-row sm:items-center' />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='pt-0 md:pt-6'
          >
            <h2 className='text-lg text-foreground/80 flex items-center gap-2'>
              <Code className='size-5' /> <span>Tech Stack</span>
            </h2>
            <div className='my-2 sm:mt-4 flex flex-wrap gap-2'>
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex items-center gap-2 px-2 py-1 bg-secondary/30 border border-border rounded-md text-xs sm:text-sm font-code'
                >
                  <Image
                    src={
                      mounted && tech.dark && resolvedTheme === 'dark'
                        ? `/svg/tech-stack/${tech.dark}`
                        : `/svg/tech-stack/${tech.icon}`
                    }
                    width={20}
                    height={20}
                    alt={`${tech.name} icon`}
                  />
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
          {/* TERMINAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='sm:mt-8 border border-border rounded-lg bg-card/80 backdrop-blur-sm overflow-hidden'
          >
            <div className='bg-muted p-2 flex items-center border-b border-border'>
              <div className='flex gap-1.5'>
                <div className='size-3 rounded-full bg-red-500' />
                <div className='size-3 rounded-full bg-yellow-500' />
                <div className='size-3 rounded-full bg-green-500' />
              </div>
              <div className='text-xs font-code text-foreground/70 flex-1 -ml-10 text-center'>
                spedine-terminal
              </div>
            </div>
            <div
              ref={terminalRef}
              className='font-code text-sm py-2 px-1 h-44 sm:h-72 overflow-y-auto whitespace-pre-line text-foreground/90 sm:px-4
                  [&::-webkit-scrollbar]:w-2 
                  [&::-webkit-scrollbar-track]:bg-accent
                  [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:hover:bg-border/80
                  dark:[&::-webkit-scrollbar-track]:bg-secondary dark:[&::-webkit-scrollbar-thumb]:bg-border
                  dark:[&::-webkit-scrollbar-thumb]:hover:bg-border/80
                  '
            >
              <span className='text-green-500'>
                spedine@server:
                <span className='text-blue-500'>~/portfolio/main</span>
                <span className='text-foreground'>$</span>
              </span>{' '}
              <span className='animate-pulse'>_</span>
            </div>
          </motion.div>
        </div>
        {/* RIGHT SIDE */}
        <div className='w-full lg:w-2/5 gap-12 flex-col hidden lg:flex'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex-col items-center justify-center relative hidden lg:flex'
          >
            <div className='absolute inset-0 flex items-center justify-center z-10'>
              <div className='size-72 rounded-full bg-primary/10 animate-pulse-slow' />
              <div className='absolute size-96 border border-primary/20 rounded-full animate-spin-slow' />
              <div className='absolute size-80 border border-dashed border-primary/30 rounded-full animate-reverse-spin' />
            </div>

            {/* MY IMAGE */}
            <ProfileImage />
          </motion.div>
          <ProfileInfoButton />
        </div>
      </div>
    </>
  )
}
