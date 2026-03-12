// 🎓 This is a REUSABLE component
// Both Home page and Opportunities page can import and use it!
// This avoids duplicating the same card code in two places
import { Link } from 'react-router-dom'
import type { Opportunity } from '../types'

// 🎓 Category colors map
// Record<string, string> = object where both keys and values are strings
const categoryColors: Record<string, string> = {
  'Animal Welfare': 'bg-orange-100 text-orange-700',
  'Healthcare': 'bg-blue-100 text-blue-700',
  'Education': 'bg-purple-100 text-purple-700',
  'Environment': 'bg-green-100 text-green-700',
  'Community': 'bg-pink-100 text-pink-700',
}

// 🎓 Props interface - what this component needs to work
interface OpportunityCardProps {
  opportunity: Opportunity  // the full opportunity object
  // 🎓 linkTo is optional (?) - defaults to opportunities page
  // This lets Home page and Opportunities page use different links
  linkTo?: string
}

// 🎓 We destructure props - pulls out opportunity and linkTo from props object
// linkTo has a default value of '/opportunities' if not provided
function OpportunityCard({ opportunity, linkTo = '/opportunities' }: OpportunityCardProps) {
  // 🎓 Calculate spots left
  // TypeScript knows both are numbers because of our interface
  const spotsLeft: number = opportunity.totalSlots - opportunity.registeredCount

  // 🎓 Calculate percentage filled for progress bar
  // Math.round removes decimals e.g 92.3 becomes 92
  const percentFilled: number = Math.round(
    (opportunity.registeredCount / opportunity.totalSlots) * 100
  )

  // 🎓 Ternary chain - picks color based on spots left
  // If spotsLeft <= 10 → red
  // Else if spotsLeft <= 20 → orange
  // Else → blue
  const spotsColor: string =
    spotsLeft <= 10 ? 'text-red-500' :
    spotsLeft <= 20 ? 'text-orange-500' :
    'text-[#38bdf8]'

  return (
    // 🎓 hover:-translate-y-2 = card moves up 2px on hover (lift effect)
    // flex flex-col = stack content vertically
    // border border-gray-100 = very subtle border
    <div className="
      bg-white rounded-2xl overflow-hidden shadow-md
      hover:shadow-2xl transition-all duration-300
      hover:-translate-y-2 flex flex-col
      border border-gray-100
    ">

      {/* 🎓 IMAGE SECTION
          relative = allows absolute positioned children (the badges)
          overflow-hidden = clips image when it scales on hover
          h-52 = fixed height so all cards look the same */}
      <div className="relative overflow-hidden h-52">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          // 🎓 hover:scale-110 = image zooms in on hover
          // The overflow-hidden on parent clips the zoomed image
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />

        {/* 🎓 Category badge
            absolute top-3 left-3 = positioned 3 units from top-left
            categoryColors[opportunity.category] = looks up color for this category */}
        <span className={`
          absolute top-3 left-3
          text-xs font-semibold px-3 py-1 rounded-full
          ${categoryColors[opportunity.category]}
        `}>
          {opportunity.category}
        </span>

        {/* 🎓 Spots left badge - turns red when very few spots */}
        <span className={`
          absolute top-3 right-3
          text-xs font-bold px-3 py-1 rounded-full
          ${spotsLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-white text-gray-700'}
        `}>
          {spotsLeft} spots left
        </span>
      </div>

      {/* 🎓 CARD CONTENT
          flex flex-col flex-1 = takes up remaining space
          This ensures all cards have same height in a grid */}
      <div className="p-5 flex flex-col flex-1">

        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {opportunity.title}
        </h3>

        {/* Organization name in blue */}
        <p className="text-[#38bdf8] text-sm font-medium mb-3">
          {opportunity.organization}
        </p>

        {/* 🎓 Description with inline Learn More
            slice(0, 100) = takes first 100 characters only
            {' '} = adds a space before Learn More link */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {opportunity.description.slice(0, 100)}...{' '}
          <Link
            to={linkTo}
            className="text-[#38bdf8] font-semibold hover:underline"
          >
            Learn More
          </Link>
        </p>

        {/* 🎓 PROGRESS BAR
            Shows visually how full the slots are */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{opportunity.registeredCount} registered</span>
            <span>{opportunity.totalSlots} total slots</span>
          </div>
          {/* 🎓 Outer bar = gray background track */}
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            {/* 🎓 Inner bar = colored fill
                style={{ width: `${percentFilled}%` }} = dynamic width!
                This is inline style because Tailwind can't handle dynamic values */}
            <div
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${percentFilled >= 90 ? 'bg-red-400' :
                  percentFilled >= 70 ? 'bg-orange-400' :
                  'bg-[#38bdf8]'
                }
              `}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Info row - location and timing */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span>📍 {opportunity.location}</span>
          <span>⏰ {opportunity.timing}</span>
        </div>

        {/* 🎓 Activity tags
            slice(0, 3) = show only first 3 activities
            So cards don't get too tall */}
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

        {/* 🎓 mt-auto pushes this to BOTTOM of card
            So all cards have button at same position regardless of content height */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link
            to={linkTo}
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