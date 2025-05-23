import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LandingComponent } from './_components/landing-component'
import { ExperienceSection } from './_components/experience-section'
import { ProjectsSection } from './_components/projects-section'
import { ContactSection } from './_components/contact-section'

export default function HomePage() {
  return (
    <main className='bg-background relative overflow-x-hidden'>
      <LandingComponent />
      <div className='max-w-[1440px] mx-auto'>
        <Header />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
