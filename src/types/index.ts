// 🎓 This file holds ALL our TypeScript types
// Any page can import from here instead of redefining types everywhere!

// 🎓 UNION TYPE - Category can ONLY be one of these exact strings
// TypeScript will error if you try to use any other string!
export type Category =
  | 'All'
  | 'Animal Welfare'
  | 'Healthcare'
  | 'Education'
  | 'Environment'
  | 'Community'

// 🎓 INTERFACE - describes exactly what one opportunity looks like
export interface Opportunity {
  id: number
  title: string
  organization: string
  category: Category
  location: string
  description: string
  activities: string[]
  timing: string
  totalSlots: number
  registeredCount: number
  image: string
}