// 🎓 This component handles ONLY the stats section
// It has its own counting animation logic inside
import { useState, useEffect } from 'react'

// 🎓 Describes what one stat object looks like
interface StatItem {
  icon: string
  value: number
  suffix: string
  label: string
}

// 🎓 Our stats data
// Defined outside component so it's not recreated on every render
const stats: StatItem[] = [
  { icon: '👥', value: 1000, suffix: '+', label: 'Volunteers' },
  { icon: '📍', value: 10, suffix: '+', label: 'Locations' },
  { icon: '❤️', value: 50, suffix: '+', label: 'Gigs Completed' },
  { icon: '📅', value: 10, suffix: '+', label: 'Active Gigs' },
]

// 🎓 CUSTOM HOOK - useCountUp
// A custom hook is just a reusable function that uses React hooks inside
// This one counts a number from 0 up to a target over a duration
// target: number = the final number to reach e.g 12400
// duration: number = 4000 means default is 4 seconds
// : number at end = this function RETURNS a number
function useCountUp(target: number, duration: number = 4000): number {
  // count starts at 0 and updates as animation runs
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    // 🎓 steps = how many times to update the number
    const steps = 60
    // 🎓 increment = how much to add each step
    // e.g for 12400 over 60 steps = add ~207 each step
    const increment = target / steps
    // 🎓 stepDuration = how long to wait between steps
    // e.g 4000ms / 60 steps = wait 66ms between each update
    const stepDuration = duration / steps
    let current = 0

    // 🎓 setInterval runs a function repeatedly every X milliseconds
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        // 🎓 We've reached the target - stop exactly at target number
        setCount(target)
        clearInterval(timer) // stop the interval
      } else {
        // 🎓 Math.floor removes decimals e.g 207.3 becomes 207
        setCount(Math.floor(current))
      }
    }, stepDuration)

    // 🎓 Cleanup function - runs when component is removed
    // Stops the interval to prevent memory leaks
    return () => clearInterval(timer)
  }, [target, duration]) // 🎓 Re-run if target or duration changes

  return count // 🎓 Returns current animated number
}

// 🎓 StatCard props interface
// Tells TypeScript what props this component needs
interface StatCardProps {
  stat: StatItem  // the stat data object
  index: number   // position in array (0,1,2,3) used for staggered animation
}

// 🎓 StatCard - handles displaying ONE stat
// We separate this so each card can have its own animation state
function StatCard({ stat, index }: StatCardProps) {
  // 🎓 count = animated number from 0 to stat.value
  const count = useCountUp(stat.value)

  // 🎓 Controls fade-in animation for this specific card
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    // 🎓 index * 200 staggers animation
    // Card 0 appears after 0ms
    // Card 1 appears after 200ms
    // Card 2 appears after 400ms
    // Card 3 appears after 600ms
    // This creates a nice cascading effect!
    const delay = setTimeout(() => setVisible(true), index * 200)
    return () => clearTimeout(delay)
  }, [index])

  return (
    // 🎓 group = allows child elements to react to hover on parent
    // cursor-pointer = shows hand cursor on hover
    // transition-all duration-700 = smooth animation over 700ms
    // visible controls opacity and vertical position
    <div className={`
      flex flex-col items-center group cursor-pointer
      transition-all duration-700
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}>
      {/* 🎓 group-hover:scale-125 = icon grows to 125% when parent is hovered
          transition-transform duration-300 = smooth scale animation */}
      <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
        {stat.icon}
      </span>

      {/* 🎓 toLocaleString() adds commas e.g 12400 becomes 12,400
          {stat.suffix} adds the + sign */}
      <span className="text-4xl font-bold text-gray-800 mb-1">
        {count.toLocaleString()}{stat.suffix}
      </span>

      <span className="text-gray-500 text-sm font-medium">
        {stat.label}
      </span>

      {/* 🎓 Blue underline
          group-hover:w-16 = grows wider when parent is hovered
          transition-all duration-300 = smooth width animation */}
      <div className="w-8 h-1 bg-[#38bdf8] rounded-full mt-3 group-hover:w-16 transition-all duration-300" />
    </div>
  )
}

// 🎓 Main StatsSection component
function StatsSection() {
  return (
    // 🎓 bg-white = white background
    // py-16 = padding top and bottom 16
    // px-8 = padding left and right 8
    <section className="bg-white py-16 px-8">
      {/* 🎓 max-w-5xl = max width of 5xl, mx-auto = center horizontally
          grid = CSS grid layout
          grid-cols-2 = 2 columns on mobile
          md:grid-cols-4 = 4 columns on medium+ screens
          gap-8 = space between grid items
          text-center = center all text */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {/* 🎓 .map() creates a StatCard for each stat
            key={index} helps React track each card */}
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>
    </section>
  )
}

export default StatsSection