import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import OpportunityCard from './OpportunityCard'
import { getOpportunities } from '../api'

function FeaturedOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getOpportunities()
        setOpportunities(data.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch opportunities:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOpportunities()
  }, [])

  return (
    <section className="bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Featured Opportunities
            </h2>
            <p className="text-gray-500">
              Handpicked volunteer gigs making a real difference
            </p>
          </div>
          <Link
            to="/opportunities"
            className="hidden md:flex items-center gap-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-6 py-3 rounded-xl font-semibold text-sm transition duration-200"
          >
            View All →
          </Link>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">⏳</p>
            <p className="text-gray-500">Loading opportunities...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-gray-500">No opportunities yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        )}

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