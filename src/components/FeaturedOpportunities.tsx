// 🎓 This component shows 3 featured opportunities on the home page
// It imports OpportunityCard so we don't duplicate card code!
import { Link } from 'react-router-dom'
import OpportunityCard from './OpportunityCard'
import type { Opportunity } from '../types'

// 🎓 Only 3 featured opportunities for the home page preview
// The full list lives in Opportunities.tsx
const featuredOpportunities: Opportunity[] = [
  {
    id: 1,
    title: 'KSPCA Visit',
    organization: 'Kenya Society for the Protection and Care of Animals',
    category: 'Animal Welfare',
    location: 'Karen, Nairobi',
    description: 'Visit and care for rescued animals at KSPCA. Help with feeding, grooming, walking dogs, and socializing animals to prepare them for adoption.',
    activities: ['Feeding animals', 'Dog walking', 'Grooming', 'Socialization'],
    timing: 'Sat 9am–1pm',
    totalSlots: 15,
    registeredCount: 13,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=KSPCA+Visit',
  },
  {
    id: 2,
    title: 'Hospice Nairobi',
    organization: 'Nairobi Hospice',
    category: 'Healthcare',
    location: 'Nairobi, Kenya',
    description: 'Provide companionship and emotional support to patients receiving palliative care. Read, chat, or simply be present for patients and families.',
    activities: ['Companionship', 'Reading to patients', 'Emotional support', 'Family assistance'],
    timing: 'Wed & Fri 10am–1pm',
    totalSlots: 15,
    registeredCount: 9,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Hospice+Nairobi',
  },
  {
    id: 3,
    title: 'Karura Forest Cleanup',
    organization: 'Friends of Karura Forest',
    category: 'Environment',
    location: 'Karura, Nairobi',
    description: 'Join us in keeping Karura Forest clean and green. Help with litter collection, tree planting, and trail maintenance.',
    activities: ['Litter collection', 'Tree planting', 'Trail maintenance', 'Environmental education'],
    timing: 'Every Saturday 7am–11am',
    totalSlots: 10,
    registeredCount: 5,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Karura+Cleanup',
  },
]

function FeaturedOpportunities() {
  return (
    // 🎓 bg-gray-50 = very light gray background
    // This alternates with white sections for visual variety
    <section className="bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">

        {/* 🎓 Section header row
            flex items-center justify-between = logo left, button right */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Featured Opportunities
            </h2>
            <p className="text-gray-500">
              Handpicked volunteer gigs making a real difference
            </p>
          </div>

          {/* 🎓 hidden md:flex = hidden on mobile, shows on medium+ screens */}
          <Link
            to="/opportunities"
            className="
              hidden md:flex items-center gap-2
              bg-[#38bdf8] hover:bg-[#0ea5e9]
              text-white px-6 py-3 rounded-xl
              font-semibold text-sm transition duration-200
            "
          >
            View All →
          </Link>
        </div>

        {/* 🎓 Responsive grid
            1 column on mobile
            2 columns on medium screens
            3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opportunity) => (
            // 🎓 We reuse OpportunityCard component here!
            // linkTo="/opportunities" means clicking goes to opportunities page
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              linkTo="/opportunities"
            />
          ))}
        </div>

        {/* 🎓 md:hidden = only shows on mobile
            On desktop the View All button is in the header row */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/opportunities"
            className="bg-[#38bdf8] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#0ea5e9] transition"
          >
            View All Opportunities →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedOpportunities