export type Category =
  | 'All'
  | 'Animal Welfare'
  | 'Healthcare'
  | 'Education'
  | 'Environment'
  | 'Community'

export interface Opportunity {
  id: number
  title: string
  organization: string
  category: Category
  location: string
  description: string
  // 🎓 fullDescription is optional with ?
  // Not every opportunity needs it
  // If not provided we just show description
  fullDescription?: string
  activities: string[]
  timing: string
  totalSlots: number
  registeredCount: number
  image: string
}