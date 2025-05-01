import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Threads } from '@/components/threads-bg'

export default function HomePage() {
  return (
    <main className='bg-background relative'>
      {/* BACKGROUND */}
      <Threads amplitude={1} distance={0} enableMouseInteraction={false} />

      <div className='max-w-[1440px] mx-auto'>
        <Header />
        <div className='h-screen'>the div</div>
      </div>
      <Footer />
    </main>
  )
}
