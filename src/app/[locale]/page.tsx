import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Threads } from '@/components/threads-bg'

export default function HomePage() {
  return (
    <main className='bg-background relative'>
      <section className='h-screen relative'>
        <Threads amplitude={1} distance={0} enableMouseInteraction={false} />
      </section>
      <div className='max-w-[1440px] mx-auto'>
        <Header />
      </div>
      <Footer />
    </main>
  )
}
