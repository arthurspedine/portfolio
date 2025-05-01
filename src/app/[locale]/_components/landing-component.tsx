'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code, Terminal } from 'lucide-react'

export function LandingComponent() {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    const commands = [
      'sudo systemctl start portfolio.service',
      'connecting to databases...',
      'optimizing cache layers...',
      'initializing API endpoints...',
      'portfolio loaded successfully',
    ]

    let commandIndex = 0
    let charIndex = 0
    let currentOutput = ''
    let terminalContent = ''

    function typeCommand() {
      if (commandIndex >= commands.length) return

      if (charIndex < commands[commandIndex].length) {
        currentOutput += commands[commandIndex][charIndex]
        // biome-ignore lint/style/noNonNullAssertion: assertion already validated
        terminalRef.current!.innerHTML = `<div><span class="text-green-500">user@spedine:~$</span> ${currentOutput}</div>`
        if (commandIndex < commands.length - 1) {
          terminalContent += `<div class="text-yellow-500">[${new Date().toLocaleTimeString()}] ${getCommandResponse(commandIndex)}</div>`
        } else {
          terminalContent += `<div class="text-blue-500">[SUCCESS] Portfolio system operational. Welcome!</div>`
        }
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        terminalRef.current!.innerHTML = `${terminalContent}<span class="animate-pulse">_</span>`
        commandIndex++
        charIndex = 0
        currentOutput = ''
        if (commandIndex < commands.length) {
          setTimeout(typeCommand, 1000)
        }
      }
    }

    function getCommandResponse(index: number) {
      switch (index) {
        case 0:
          return 'Starting portfolio service... Done'
        case 1:
          return 'Connection established to PostgreSQL, MongoDB, Redis'
        case 2:
          return 'Cache optimization complete: 127ms response time'
        case 3:
          return 'Endpoints available: /projects, /skills, /contact, /resume'
        default:
          return ''
      }
    }

    setTimeout(typeCommand, 1000)
  }, [])

  return (
    <div className='relative h-screen w-full bg-background'>
      <div className='absolute inset-0 bg-grid-pattern opacity-5' />

      <div className='relative z-5 h-full w-full'>
        <div className='container mx-auto h-full'>
          <div className='flex h-full flex-col lg:flex-row items-center justify-between py-16 px-4'>
            <div className='w-full lg:w-3/5 space-y-6 mb-10 lg:mb-0'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className='inline-flex items-center space-x-2 mb-4 text-primary/80'>
                  <Terminal className='size-5' />
                  <span className='text-sm font-mono'>~/portfolio/main</span>
                </div>
                <h1 className='text-4xl md:text-6xl font-bold font-mono bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                  Arthur Spedine
                </h1>
                <p className='mt-4 text-lg md:text-xl text-muted-foreground font-mono'>
                  Backend Developer
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className='pt-6'
              >
                <h2 className='text-lg font-mono text-foreground/80 flex items-center gap-2'>
                  <Code className='size-5' /> <span>Tech Stack</span>
                </h2>
                <div className='mt-4 flex flex-wrap gap-3'>
                  {[
                    'Java',
                    'Spring Boot',
                    'PostgreSQL',
                    'Oracle SQL',
                    'Docker',
                    'AWS',
                    'Azure',
                  ].map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className='px-3 py-1 bg-secondary/30 border border-border rounded-md text-sm font-mono'
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className='mt-8 border border-border rounded-lg bg-card/80 backdrop-blur-sm overflow-hidden'
              >
                <div className='bg-muted p-2 flex items-center gap-2 border-b border-border'>
                  <div className='flex gap-1.5'>
                    <div className='size-3 rounded-full bg-red-500' />
                    <div className='size-3 rounded-full bg-yellow-500' />
                    <div className='size-3 rounded-full bg-green-500' />
                  </div>
                  <div className='text-xs font-mono text-foreground/70 flex-1 text-center'>
                    spedine-terminal
                  </div>
                </div>
                <div
                  ref={terminalRef}
                  className='font-mono text-sm p-4 h-32 overflow-hidden whitespace-pre-line text-foreground/90'
                >
                  <span className='animate-pulse'>_</span>
                </div>
              </motion.div>
            </div>
            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className='w-full lg:w-2/5 flex flex-col items-center justify-center relative'
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='size-64 rounded-full bg-primary/5 animate-pulse-slow' />
                <div className='absolute size-96 border border-primary/20 rounded-full animate-spin-slow' />
                <div className='absolute size-72 border border-dashed border-primary/30 rounded-full animate-reverse-spin' />
              </div>

              {/* MY IMAGE */}
              <div className='size-80 bg-accent/50 rounded-full z-10 shadow-2xl' />
            </motion.div>
          </div>
        </div>
      </div>

      <div className='absolute inset-0 bg-dots-pattern opacity-5 z-0' />
    </div>
  )
}
