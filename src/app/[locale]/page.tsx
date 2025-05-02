import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LandingComponent } from './_components/landing-component'

export default function HomePage() {
  return (
    <main className='bg-background relative'>
      <LandingComponent />
      <div className='max-w-[1440px] mx-auto'>
        <Header />
      </div>
      <Footer />
    </main>
  )
}
