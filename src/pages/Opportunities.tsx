// 🎓 This is the FULL opportunities page at /opportunities
// It handles search, filtering and displaying ALL opportunities
// It uses the shared OpportunityCard component instead of defining its own!
import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import OpportunityCard from '../components/OpportunityCard'
import type { Opportunity, Category } from '../types'
import Footer from '../components/Footer'

// 🎓 All our opportunities data lives here
// When we connect Firebase later, this will come from the database instead!
const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'KSPCA Visit',
    organization: 'Kenya Society for the Protection and Care of Animals',
    category: 'Animal Welfare',
    location: 'Karen, Nairobi',
    description: 'Visit and care for rescued animals at KSPCA. Help with feeding, grooming, walking dogs, and socializing animals to prepare them for adoption.',
    fullDescription: 'Visit and care for rescued animals at KSPCA. Help with feeding, grooming, walking dogs, and socializing animals to prepare them for adoption. This is a wonderful opportunity to make a direct difference in the lives of animals while working alongside a passionate team of animal lovers. No prior experience needed — just a big heart!',
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
    fullDescription: 'Provide companionship and emotional support to patients receiving palliative care. Read, chat, or simply be present for patients and families. Your presence alone can bring enormous comfort to those going through difficult times. Volunteers are trained and supported by the hospice team throughout their service.',
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
    fullDescription: 'Support elderly and terminally ill patients at Nyeri Hospice. Assist with daily activities, provide companionship, and help with light duties. You will be making a profound difference in the final chapter of someone\'s life by bringing warmth, dignity and human connection to those who need it most.',
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
    fullDescription: 'Teach and mentor underprivileged children in Kibera. Help with literacy, numeracy, and life skills to build a brighter future. Education is the most powerful tool for breaking the cycle of poverty and your contribution, however small, plants seeds that grow for a lifetime. All teaching materials are provided.',
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
    fullDescription: 'Join us in keeping Karura Forest clean and green. Help with litter collection, tree planting, and trail maintenance. Karura Forest is one of Nairobi\'s most precious urban ecosystems and your hands-on contribution helps preserve it for generations to come. Come prepared with good walking shoes and a love for nature!',
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
    fullDescription: 'Help prepare and serve meals to vulnerable community members. Work alongside a warm team making a direct difference every week. Food is more than nutrition — it is dignity and community. By volunteering here you become part of a family that ensures no one in the neighbourhood goes to bed hungry.',
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
    fullDescription: 'Support children and families at Newlife Home Trust. Help with childcare, tutoring, and recreational activities for children in need. Every child deserves love, stability and the chance to learn. Your time here creates memories and moments of joy that stay with these children long after your visit.',
    activities: ['Childcare', 'Tutoring', 'Recreational activities', 'Family support'],
    timing: 'Sat & Sun 9am–1pm',
    totalSlots: 40,
    registeredCount: 28,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Newlife+Home',
  },
]

// 🎓 Category filter options
// Category type from types/index.ts ensures only valid categories are used
const categories: Category[] = [
  'All',
  'Animal Welfare',
  'Healthcare',
  'Education',
  'Environment',
  'Community',
]

// 🎓 Emoji icons for each category filter button
const categoryIcons: Record<string, string> = {
  'All':            '🌍',
  'Animal Welfare': '🐾',
  'Healthcare':     '🏥',
  'Education':      '📚',
  'Environment':    '🌿',
  'Community':      '🤝',
}

function Opportunities() {
  // 🎓 Tracks which category filter is active
  // Starts as 'All' so all opportunities show by default
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  // 🎓 Tracks what user types in search box
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 🎓 useMemo is a performance optimization hook
  // It only recalculates filteredOpportunities when
  // activeCategory OR searchQuery changes
  // Without useMemo it would recalculate on EVERY render (wasteful!)
  const filteredOpportunities = useMemo((): Opportunity[] => {
    return opportunities.filter((opp) => {
      // 🎓 Check if category matches
      // If activeCategory is 'All' show everything
      // Otherwise only show opportunities matching the selected category
      const matchesCategory =
        activeCategory === 'All' || opp.category === activeCategory

      // 🎓 Check if search query matches title, organization or location
      // toLowerCase() makes search case-insensitive
      // includes() checks if the string contains the search query
      const matchesSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchQuery.toLowerCase())

      // 🎓 Both must be true for opportunity to show
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* PAGE HEADER - dark navy like home page hero */}
      <div className="
        bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
        px-8 py-16 text-center
      ">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Explore Volunteer Opportunities
        </h1>

        {/* 🎓 Dynamic count - updates as filters change
            Ternary adds 'gig' or 'gigs' based on count */}
        <p className="text-blue-200 mb-8">
          {filteredOpportunities.length} gig{filteredOpportunities.length !== 1 ? 's' : ''} available across Kenya
        </p>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-white rounded-xl px-4 py-3 max-w-2xl mx-auto shadow-lg">
          <span className="text-gray-400 mr-3 text-lg">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, organization or location..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          {/* 🎓 Only shows ✕ button when there is text to clear */}
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
          {/* 🎓 .map() creates a button for each category
              active category gets blue background
              inactive categories get gray background */}
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

        {/* 🎓 Conditional rendering
            If no results show empty state message
            Otherwise show the grid of cards */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-700 text-xl font-semibold mb-2">
              No opportunities found
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Try a different search term or category
            </p>
            {/* 🎓 Clears both search and category filter */}
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
            {/* 🎓 Results summary text
                Shows different text based on active filters */}
            <p className="text-gray-500 text-sm mb-6">
              Showing {filteredOpportunities.length} opportunities
              {activeCategory !== 'All' && ` in ${activeCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            {/* 🎓 Responsive grid
                grid-cols-1 = 1 column on mobile
                md:grid-cols-2 = 2 columns on tablet
                lg:grid-cols-3 = 3 columns on desktop
                gap-6 = space between cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                // 🎓 We use the SHARED OpportunityCard component!
                // linkTo passes the detail page URL for each opportunity
                // opportunity.id = 1, 2, 3 etc makes URL /opportunities/1
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  linkTo={`/opportunities/${opportunity.id}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />

    </div>
  )
}

export default Opportunities