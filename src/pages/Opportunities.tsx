import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import type { Opportunity, Category } from '../types'

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'KSPCA Visit',
    organization: 'Kenya Society for the Protection and Care of Animals',
    category: 'Animal Welfare',
    location: 'Karen, Nairobi',
    description: 'Visit and care for rescued animals at KSPCA. Help with feeding, grooming, walking dogs, and socializing animals to prepare them for adoption.',
    activities: ['Feeding animals', 'Dog walking', 'Grooming', 'Socialization'],
    timing: 'Sat 9am–1pm',
    totalSlots: 204,
    registeredCount: 189,
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
    totalSlots: 144,
    registeredCount: 134,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Hospice+Nairobi',
  },
  {
    id: 3,
    title: 'Hospice Nyeri',
    organization: 'Nyeri Hospice',
    category: 'Healthcare',
    location: 'Nyeri, Kenya',
    description: 'Support elderly and terminally ill patients at Nyeri Hospice. Assist with daily activities, provide companionship, and help with light duties.',
    activities: ['Patient care', 'Daily activities', 'Companionship', 'Light duties'],
    timing: 'Tue & Thu 9am–12pm',
    totalSlots: 107,
    registeredCount: 87,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Hospice+Nyeri',
  },
  {
    id: 4,
    title: 'Teach & Inspire',
    organization: 'Jacaranda School Kibera',
    category: 'Education',
    location: 'Kibera, Nairobi',
    description: 'Teach and mentor underprivileged children in Kibera. Help with literacy, numeracy, and life skills to build a brighter future.',
    activities: ['Teaching literacy', 'Numeracy support', 'Mentorship', 'Life skills'],
    timing: 'Mon, Wed & Fri 8am–12pm',
    totalSlots: 50,
    registeredCount: 32,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Teach+%26+Inspire',
  },
  {
    id: 5,
    title: 'Karura Forest Cleanup',
    organization: 'Friends of Karura Forest',
    category: 'Environment',
    location: 'Karura, Nairobi',
    description: 'Join us in keeping Karura Forest clean and green. Help with litter collection, tree planting, and trail maintenance.',
    activities: ['Litter collection', 'Tree planting', 'Trail maintenance', 'Environmental education'],
    timing: 'Every Saturday 7am–11am',
    totalSlots: 80,
    registeredCount: 45,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Karura+Cleanup',
  },
  {
    id: 6,
    title: 'Maziwa Community Kitchen',
    organization: 'Maziwa Methodist Church',
    category: 'Community',
    location: 'Maziwa, Nairobi',
    description: 'Help prepare and serve meals to vulnerable community members. Work alongside a warm team making a direct difference every week.',
    activities: ['Meal preparation', 'Food serving', 'Kitchen cleanup', 'Community outreach'],
    timing: 'Sun 10am–2pm',
    totalSlots: 30,
    registeredCount: 18,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Maziwa+Kitchen',
  },
  {
    id: 7,
    title: 'Newlife Home Trust',
    organization: 'Newlife Home Trust Kilimani',
    category: 'Community',
    location: 'Kilimani, Nairobi',
    description: 'Support children and families at Newlife Home Trust. Help with childcare, tutoring, and recreational activities for children in need.',
    activities: ['Childcare', 'Tutoring', 'Recreational activities', 'Family support'],
    timing: 'Sat & Sun 9am–1pm',
    totalSlots: 40,
    registeredCount: 28,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Newlife+Home',
  },
]

const categories: Category[] = [
  'All',
  'Animal Welfare',
  'Healthcare',
  'Education',
  'Environment',
  'Community',
]

const categoryColors: Record<string, string> = {
  'Animal Welfare': 'bg-orange-100 text-orange-700',
  'Healthcare':     'bg-blue-100 text-blue-700',
  'Education':      'bg-purple-100 text-purple-700',
  'Environment':    'bg-green-100 text-green-700',
  'Community':      'bg-pink-100 text-pink-700',
}

const categoryIcons: Record<string, string> = {
  'All':            '🌍',
  'Animal Welfare': '🐾',
  'Healthcare':     '🏥',
  'Education':      '📚',
  'Environment':    '🌿',
  'Community':      '🤝',
}

interface OpportunityCardProps {
  opportunity: Opportunity
}

function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const spotsLeft: number = opportunity.totalSlots - opportunity.registeredCount
  const percentFilled: number = Math.round(
    (opportunity.registeredCount / opportunity.totalSlots) * 100
  )
  const spotsColor: string =
    spotsLeft <= 10 ? 'text-red-500' :
    spotsLeft <= 20 ? 'text-orange-500' :
    'text-[#38bdf8]'

  return (
    <div className="
      bg-white rounded-2xl overflow-hidden shadow-md
      hover:shadow-2xl transition-all duration-300
      hover:-translate-y-2 flex flex-col
      border border-gray-100
    ">

      {/* CARD IMAGE */}
      <div className="relative overflow-hidden h-52">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <span className={`
          absolute top-3 left-3
          text-xs font-semibold px-3 py-1 rounded-full
          ${categoryColors[opportunity.category]}
        `}>
          {opportunity.category}
        </span>
        <span className={`
          absolute top-3 right-3
          text-xs font-bold px-3 py-1 rounded-full
          ${spotsLeft <= 10
            ? 'bg-red-100 text-red-600'
            : 'bg-white text-gray-700'
          }
        `}>
          {spotsLeft} spots left
        </span>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col flex-1">

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {opportunity.title}
        </h3>

        {/* Organization */}
        <p className="text-[#38bdf8] text-sm font-medium mb-3">
          {opportunity.organization}
        </p>

        {/* Description with inline Learn More */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {opportunity.description.slice(0, 100)}...{' '}
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="text-[#38bdf8] font-semibold hover:underline"
          >
            Learn More
          </Link>
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{opportunity.registeredCount} registered</span>
            <span>{opportunity.totalSlots} total slots</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${percentFilled >= 90
                  ? 'bg-red-400'
                  : percentFilled >= 70
                  ? 'bg-orange-400'
                  : 'bg-[#38bdf8]'
                }
              `}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Info row */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span>📍 {opportunity.location}</span>
          <span>⏰ {opportunity.timing}</span>
        </div>

        {/* Activities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {opportunity.activities.slice(0, 3).map((activity, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {activity}
            </span>
          ))}
        </div>

        {/* Sign Up to Volunteer button */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="
              w-full flex items-center justify-center
              bg-[#38bdf8] hover:bg-[#0ea5e9]
              text-white py-2.5 rounded-xl
              text-sm font-semibold transition duration-200
            "
          >
            Sign Up to Volunteer →
          </Link>
        </div>

      </div>
    </div>
  )
}

function Opportunities() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredOpportunities = useMemo((): Opportunity[] => {
    return opportunities.filter((opp) => {
      const matchesCategory =
        activeCategory === 'All' || opp.category === activeCategory
      const matchesSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* PAGE HEADER */}
      <div className="
        bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
        px-8 py-16 text-center
      ">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Explore Volunteer Opportunities
        </h1>
        <p className="text-blue-200 mb-8">
          {filteredOpportunities.length} gig{filteredOpportunities.length !== 1 ? 's' : ''} available across Kenya
        </p>

        {/* Search bar */}
        <div className="flex items-center bg-white rounded-xl px-4 py-3 max-w-2xl mx-auto shadow-lg">
          <span className="text-gray-400 mr-3 text-lg">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, organization or location..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex gap-2 overflow-x-auto max-w-6xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                flex items-center gap-2
                px-4 py-2 rounded-full text-sm font-medium
                whitespace-nowrap transition-all duration-200
                ${activeCategory === category
                  ? 'bg-[#38bdf8] text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <span>{categoryIcons[category]}</span>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* OPPORTUNITIES GRID */}
      <div className="px-8 py-10 max-w-7xl mx-auto">
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-700 text-xl font-semibold mb-2">
              No opportunities found
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Try a different search term or category
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('All')
              }}
              className="bg-[#38bdf8] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0ea5e9] transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">
              Showing {filteredOpportunities.length} opportunities
              {activeCategory !== 'All' && ` in ${activeCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default Opportunities