export type ExperienceType = 'professional' | 'academic'

export type Skill = {
  name: string
  level?: number
}

export type ExperienceProps = {
  title: string
  organization: string
  period: string
  description: string
  icon: string
  type: ExperienceType
  skills?: Skill[]
  delay: number
}

export type ProjectProps = {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  github?: string
  liveUrl?: string
  featured: boolean
  award?: string
}
