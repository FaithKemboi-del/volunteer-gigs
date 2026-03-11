import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

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
        pt-16 pb-16
        flex flex-col items-center justify-center
        px-8 text-center
        relative overflow-hidden
        w-full
      ">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/4 w-64 h-64 bg-blue-300 opacity-5 rounded-full blur-2xl" />

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

        {/* White heading */}
        <h1 className={`
          text-6xl md:text-7xl font-bold text-white mb-2
          transition-all duration-700 delay-100
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Find Your Next
        </h1>

        {/* Blue heading */}
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

        {/* SEARCH BAR */}
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
            className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-8 py-5 font-semibold text-sm transition duration-200 flex items-center gap-2"
          >
            🔍 Search
          </Link>
        </div>

        {/* POPULAR TAGS */}
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
                text-sm px-4 py-1.5 rounded-full
                transition-all duration-200
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

    </div>
  )
}

export default Home