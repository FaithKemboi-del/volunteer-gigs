import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import type { Opportunity } from '../types'

interface StatItem {
  icon: string
  value: number
  suffix: string
  label: string
}

interface PopularTag {
  id: number
  name: string
}

const stats: StatItem[] = [
  { icon: '👥', value: 12400, suffix: '+', label: 'Volunteers' },
  { icon: '📍', value: 850, suffix: '+', label: 'Locations' },
  { icon: '❤️', value: 3200, suffix: '+', label: 'Gigs Completed' },
  { icon: '📅', value: 500, suffix: '+', label: 'Active Gigs' },
]

const popularTags: PopularTag[] = [
  { id: 1, name: 'KSPCA Visit' },
  { id: 2, name: 'Hospice Nairobi' },
  { id: 3, name: 'Hospice Nyeri' },
  { id: 4, name: 'Newlife Home Trust Kilimani' },
  { id: 5, name: 'Restoration of Victory' },
  { id: 6, name: 'Jacaranda' },
  { id: 7, name: 'Maziwa Methodist Church' },
]

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
]

const categoryColors: Record<string, string> = {
  'Animal Welfare': 'bg-orange-100 text-orange-700',
  'Healthcare': 'bg-blue-100 text-blue-700',
  'Education': 'bg-purple-100 text-purple-700',
  'Environment': 'bg-green-100 text-green-700',
  'Community': 'bg-pink-100 text-pink-700',
}

function useCountUp(target: number, duration: number = 4000): number {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)
    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

interface StatCardProps {
  stat: StatItem
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  const count = useCountUp(stat.value)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const delay = setTimeout(() => setVisible(true), index * 200)
    return () => clearTimeout(delay)
  }, [index])

  return (
    <div className={`
      flex flex-col items-center group cursor-pointer
      transition-all duration-700
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}>
      <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
        {stat.icon}
      </span>
      <span className="text-4xl font-bold text-gray-800 mb-1">
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="text-gray-500 text-sm font-medium">
        {stat.label}
      </span>
      <div className="w-8 h-1 bg-[#38bdf8] rounded-full mt-3 group-hover:w-16 transition-all duration-300" />
    </div>
  )
}

interface FeaturedCardProps {
  opportunity: Opportunity
}

function FeaturedCard({ opportunity }: FeaturedCardProps) {
  const spotsLeft: number = opportunity.totalSlots - opportunity.registeredCount
  const percentFilled: number = Math.round(
    (opportunity.registeredCount / opportunity.totalSlots) * 100
  )

  return (
    <div className="
      bg-white rounded-2xl overflow-hidden shadow-md
      hover:shadow-xl transition-all duration-300
      hover:-translate-y-2 flex flex-col border border-gray-100
    ">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <span className={`
          absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full
          ${categoryColors[opportunity.category]}
        `}>
          {opportunity.category}
        </span>
        <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-white text-gray-700">
          {spotsLeft} spots left
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {opportunity.title}
        </h3>
        <p className="text-[#38bdf8] text-sm font-medium mb-3">
          {opportunity.organization}
        </p>

        {/* Description with inline Learn More */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {opportunity.description.slice(0, 100)}...{' '}
          <Link
            to="/opportunities"
            className="text-[#38bdf8] font-semibold hover:underline"
          >
            Learn More
          </Link>
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{opportunity.registeredCount} registered</span>
            <span>{opportunity.totalSlots} total</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${percentFilled >= 90 ? 'bg-red-400' : 'bg-[#38bdf8]'}`}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span>📍 {opportunity.location}</span>
          <span>⏰ {opportunity.timing}</span>
        </div>

        {/* Sign Up to Volunteer button */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link
            to="/opportunities"
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

function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeTag, setActiveTag] = useState<number | null>(null)
  const [heroVisible, setHeroVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="
        bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
        pt-16 pb-16 flex flex-col items-center justify-center
        px-8 text-center relative overflow-hidden w-full
      ">
        <div className="pointer-events-none absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl" />

        {/* Badge */}
        <span className={`
          bg-blue-500 bg-opacity-20 text-blue-200
          text-xs font-semibold px-4 py-1.5 rounded-full mb-8
          border border-blue-400 border-opacity-30
          transition-all duration-700
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}>
          ✨ Make a difference today
        </span>

        {/* Headings */}
        <h1 className={`
          text-6xl md:text-7xl font-bold text-white mb-2
          transition-all duration-700 delay-100
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Find Your Next
        </h1>
        <h1 className={`
          text-6xl md:text-7xl font-bold text-[#38bdf8] mb-6
          transition-all duration-700 delay-200
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Volunteer Gig
        </h1>

        {/* Subtitle */}
        <p className={`
          text-blue-200 text-xl max-w-3xl mb-10 leading-relaxed
          transition-all duration-700 delay-300
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Connect with communities near you. Discover meaningful volunteer
          opportunities and make an impact across Kenya.
        </p>

        {/* Search bar */}
        <div className={`
          flex items-center bg-white rounded-xl shadow-2xl
          overflow-hidden w-full max-w-3xl mb-8
          transition-all duration-700 delay-500
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <span className="pl-5 text-gray-400 text-xl">📍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, cause, or organization..."
            className="flex-1 px-4 py-5 text-gray-700 outline-none text-base"
          />
          <Link
            to="/opportunities"
            className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-8 py-5 font-semibold text-sm transition duration-200"
          >
            🔍 Search
          </Link>
        </div>

        {/* Popular tags */}
        <div className={`
          flex flex-wrap justify-center gap-2 w-full max-w-5xl
          transition-all duration-700 delay-700
          ${heroVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <span className="text-blue-300 text-sm mt-1 mr-2">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id === activeTag ? null : tag.id)}
              className={`
                text-sm px-4 py-1.5 rounded-full transition-all duration-200
                ${activeTag === tag.id
                  ? 'bg-[#38bdf8] text-white border border-[#38bdf8]'
                  : 'border border-blue-400 border-opacity-40 text-blue-200 hover:bg-blue-500 hover:bg-opacity-20'
                }
              `}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* FEATURED OPPORTUNITIES SECTION */}
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOpportunities.map((opportunity) => (
              <FeaturedCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>

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

      {/* CALL TO ACTION SECTION */}
      <section className="
        bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
        py-20 px-8 text-center
      ">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-blue-200 text-lg max-w-xl mx-auto mb-10">
          Join thousands of volunteers across Kenya and start
          your journey today. Every hour you give matters!
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            className="
              bg-[#38bdf8] hover:bg-[#0ea5e9]
              text-white px-8 py-4 rounded-xl
              font-bold text-base transition duration-200
              shadow-lg hover:shadow-xl
            "
          >
            Get Started Today →
          </Link>
          <Link
            to="/opportunities"
            className="
              border-2 border-blue-400 border-opacity-50
              text-blue-200 px-8 py-4 rounded-xl
              font-bold text-base transition duration-200
              hover:bg-blue-500 hover:bg-opacity-20
            "
          >
            Browse Opportunities
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home