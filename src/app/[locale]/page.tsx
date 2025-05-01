import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LandingComponent } from './_components/landing-component'

export default function HomePage() {
  return (
    <main className='bg-background relative'>
      <div className='max-w-[1440px] mx-auto'>
        <Header />
        <LandingComponent />
      </div>
      <Footer />
    </main>
  )
}
