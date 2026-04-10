import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Opportunity } from '../types'

const categoryColors: Record<string, string> = {
  'Animal Welfare': 'bg-orange-100 text-orange-700',
  'Healthcare': 'bg-blue-100 text-blue-700',
  'Education': 'bg-purple-100 text-purple-700',
  'Environment': 'bg-green-100 text-green-700',
  'Community': 'bg-pink-100 text-pink-700',
}

interface OpportunityCardProps {
  opportunity: Opportunity
  linkTo?: string
}

function OpportunityCard({ opportunity, linkTo = '/opportunities' }: OpportunityCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const displayDescription: string = isExpanded && opportunity.fullDescription
    ? opportunity.fullDescription
    : opportunity.description.slice(0, 100) + '...'

  return (
    <div className="
      bg-white rounded-2xl overflow-hidden shadow-md
      hover:shadow-2xl transition-all duration-300
      hover:-translate-y-2 flex flex-col
      border border-gray-100
    ">

      {/* IMAGE SECTION */}
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
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col flex-1">

        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {opportunity.title}
        </h3>

        <p className="text-[#38bdf8] text-sm font-medium mb-3">
          {opportunity.organization}
        </p>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 transition-all duration-300">
          {displayDescription}{' '}
          {opportunity.fullDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#38bdf8] font-semibold hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show Less ↑' : 'Learn More ↓'}
            </button>
          )}
        </p>

        {/* Info row */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span>📍 {opportunity.location}</span>
          <span>⏰ {opportunity.timing}</span>
        </div>

        {/* Activity tags */}
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

        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link
            to={`/book/${opportunity.id}`}
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

export default OpportunityCard