export type ExperienceType = 'professional' | 'academic'

export type Skill = {
  name: string
  level?: number
}

export type ExperienceProps = {
  title: string
  organization: string
  period: string
  description?: string
  type: ExperienceType
  skills?: Skill[]
  delay: number
}
