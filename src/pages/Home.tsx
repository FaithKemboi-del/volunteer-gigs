import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

// 🎓 TYPESCRIPT INTERFACE
// An interface is like a blueprint that describes the shape of an object
// Every stat object MUST have these exact fields with these exact types
interface StatItem {
  icon: string
  value: number    // the final number we count up to
  suffix: string   // the + sign after the number
  label: string
}

interface PopularTag {
  id: number
  name: string
}

// 🎓 Our stats data - each object follows the StatItem interface exactly
// TypeScript will show an error if any field is missing or wrong type!
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

// 🎓 CUSTOM HOOK - useCountUp
// This is a reusable function that counts a number up from 0 to a target
// TypeScript tells us: target is a number, duration is a number, returns a number
function useCountUp(target: number, duration: number = 2000): number {
  // count starts at 0 and will count up to target
  const [count, setCount] = useState<number>(0)

  // 🎓 useEffect runs code AFTER the component appears on screen
  // The [] at the end means "only run this once when component first loads"
  useEffect(() => {
    // How many steps to count in
    const steps = 60
    // How much to add each step
    const increment = target / steps
    // How long to wait between each step
    const stepDuration = duration / steps
    let current = 0

    // setInterval runs a function repeatedly every X milliseconds
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer) // stop counting when we reach the target
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    // 🎓 Cleanup function - stops the timer if component is removed
    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

// 🎓 CHILD COMPONENT - StatCard
// Instead of putting everything in one big component
// we break it into smaller pieces - StatCard handles ONE stat
// Props are like arguments we pass into a component
interface StatCardProps {
  stat: StatItem
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  // 🎓 useCountUp is our custom hook - it counts from 0 to stat.value
  const count = useCountUp(stat.value)

  // 🎓 We use index to delay each card's animation slightly
  // so they animate one after another instead of all at once
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    // Each card appears slightly later than the previous one
    const delay = setTimeout(() => setVisible(true), index * 200)
    return () => clearTimeout(delay)
  }, [index])

  return (
    // 🎓 We use template literals to combine static and dynamic classes
    // visible controls whether the card has faded in or not
    <div
      className={`
        flex flex-col items-center group cursor-pointer
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Icon with hover scale effect */}
      <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
        {stat.icon}
      </span>

      {/* 🎓 count is the animated number from our custom hook */}
      <span className="text-4xl font-bold text-gray-800 mb-1">
        {count.toLocaleString()}{stat.suffix}
      </span>

      <span className="text-gray-500 text-sm font-medium">
        {stat.label}
      </span>

      {/* Blue underline that grows on hover */}
      <div className="w-8 h-1 bg-[#38bdf8] rounded-full mt-3 group-hover:w-16 transition-all duration-300" />
    </div>
  )
}

function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  // 🎓 tracks which tag is currently active/selected
  const [activeTag, setActiveTag] = useState<number | null>(null)
  // 🎓 controls whether hero text has faded in
  const [heroVisible, setHeroVisible] = useState<boolean>(false)

  useEffect(() => {
    // Small delay then fade in the hero text
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
        min-h-[90vh]
        flex flex-col items-center justify-center
        px-4 text-center
        relative overflow-hidden
      ">

        {/* 🎓 Decorative blurred circles in background for depth effect */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl" />

        {/* Badge - fades in first */}
        <span className={`
          bg-blue-500 bg-opacity-20 text-blue-200
          text-xs font-semibold px-4 py-1.5 rounded-full mb-8
          border border-blue-400 border-opacity-30
          transition-all duration-700
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}>
          ✨ Make a difference today
        </span>

        {/* Heading white - fades in slightly after badge */}
        <h1 className={`
          text-5xl md:text-6xl font-bold text-white mb-2
          transition-all duration-700 delay-100
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Find Your Next
        </h1>

        {/* Heading blue */}
        <h1 className={`
          text-5xl md:text-6xl font-bold text-[#38bdf8] mb-6
          transition-all duration-700 delay-200
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Volunteer Gig
        </h1>

        {/* Subtitle */}
        <p className={`
          text-blue-200 text-lg max-w-xl mb-10 leading-relaxed
          transition-all duration-700 delay-300
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Connect with communities near you. Discover meaningful volunteer
          opportunities and make an impact.
        </p>

        {/* SEARCH BAR */}
        <div className={`
          flex items-center bg-white rounded-xl shadow-2xl
          overflow-hidden w-full max-w-xl mb-8
          transition-all duration-700 delay-500
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <span className="pl-4 text-gray-400 text-lg">📍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, cause, or organization..."
            className="flex-1 px-4 py-4 text-gray-700 outline-none text-sm"
          />
          <Link
            to="/opportunities"
            className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-6 py-4 font-semibold text-sm transition duration-200 flex items-center gap-2"
          >
            🔍 Search
          </Link>
        </div>

        {/* POPULAR TAGS */}
        <div className={`
          flex flex-wrap justify-center gap-2 max-w-2xl
          transition-all duration-700 delay-700
          ${heroVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <span className="text-blue-300 text-sm mt-1 mr-1">Popular:</span>

          {/* 🎓 When a tag is clicked we set it as activeTag
              This highlights it differently from the others */}
          {popularTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id === activeTag ? null : tag.id)}
              className={`
                text-xs px-3 py-1.5 rounded-full
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
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* 🎓 We pass each stat and its index into StatCard as props */}
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home