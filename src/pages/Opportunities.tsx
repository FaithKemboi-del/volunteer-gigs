import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOpportunities } from '../api'
import Navbar from '../components/Navbar'
import OpportunityCard from '../components/OpportunityCard'
import type { Category } from '../types'
import Footer from '../components/Footer'

const categories: Category[] = [
  'All',
  'Animal Welfare',
  'Healthcare',
  'Education',
  'Environment',
  'Community',
]

const categoryIcons: Record<string, string> = {
  'All':            '🌍',
  'Animal Welfare': '🐾',
  'Healthcare':     '🏥',
  'Education':      '📚',
  'Environment':    '🌿',
  'Community':      '🤝',
}

function Opportunities() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<Category>(
    (searchParams.get('category') as Category) || 'All'
  )
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') as Category
    setActiveCategory(categoryFromUrl || 'All')
  }, [searchParams])

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities()
        setOpportunities(data)
      } catch (error) {
        console.error('Failed to fetch opportunities:', error)
      } finally {
        setIsLoadingOpportunities(false)
      }
    }
    fetchOpportunities()
  }, [])

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesCategory =
        activeCategory === 'All' || opp.category === activeCategory
      const matchesSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, opportunities])

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158] px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Explore Volunteer Opportunities
        </h1>
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
        {isLoadingOpportunities ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">⏳</p>
            <p className="text-gray-500">Loading opportunities...</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
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

      <Footer />
    </div>
  )
}

export default Opportunities