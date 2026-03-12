// 🎓 This component handles ONLY the hero section
// It has its own state and logic inside it
// The Home page doesn't need to know HOW it works, just that it exists!
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// 🎓 PopularTag interface lives here because only HeroSection uses it
interface PopularTag {
  id: number
  name: string
}

// 🎓 Defined OUTSIDE component so it's not recreated on every render
const popularTags: PopularTag[] = [
  { id: 1, name: 'KSPCA Visit' },
  { id: 2, name: 'Hospice Nairobi' },
  { id: 3, name: 'Hospice Nyeri' },
  { id: 4, name: 'Newlife Home Trust Kilimani' },
  { id: 5, name: 'Restoration of Victory' },
  { id: 6, name: 'Jacaranda' },
  { id: 7, name: 'Maziwa Methodist Church' },
]

function HeroSection() {
  // 🎓 Tracks what user types in search box
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 🎓 Tracks which popular tag is clicked/active
  const [activeTag, setActiveTag] = useState<number | null>(null)

  // 🎓 Controls fade-in animation when page loads
  // Starts false (invisible) then becomes true (visible)
  const [heroVisible, setHeroVisible] = useState<boolean>(false)

  // 🎓 useEffect runs AFTER component appears on screen
  // setTimeout waits 100ms then sets heroVisible to true
  // This triggers the fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    // 🎓 Cleanup - cancels timer if component is removed before it fires
    return () => clearTimeout(timer)
  }, []) // 🎓 Empty [] means run only ONCE when component first loads

  return (
    // 🎓 section is a semantic HTML element meaning "a section of content"
    // bg-gradient-to-br = background gradient going bottom-right
    // from/via/to = the three colors in the gradient
    // pt-16 pb-16 = padding top 16 and padding bottom 16
    // flex flex-col = display flex, direction column (stack items vertically)
    // items-center = center items horizontally
    // justify-center = center items vertically
    // px-8 = padding left and right 8
    // text-center = center all text
    // relative = allows absolute positioned children
    // overflow-hidden = hides anything that goes outside the section
    <section className="
      bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
      pt-16 pb-16 flex flex-col items-center justify-center
      px-8 text-center relative overflow-hidden w-full
    ">
      {/* 🎓 Decorative circles
          absolute = positioned relative to parent section
          pointer-events-none = mouse clicks pass through them
          blur-3xl = very blurry, creates soft glow effect
          opacity-10 = 10% visible, mostly transparent */}
      <div className="pointer-events-none absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl" />

      {/* 🎓 Badge - "Make a difference today"
          Template literal ${} lets us put variables inside className
          heroVisible controls opacity and position
          When heroVisible=false: opacity-0 (invisible) and -translate-y-4 (moved up)
          When heroVisible=true: opacity-100 (visible) and translate-y-0 (normal position)
          transition-all duration-700 = smooth animation over 700ms */}
      <span className={`
        bg-blue-500 bg-opacity-20 text-blue-200
        text-xs font-semibold px-4 py-1.5 rounded-full mb-8
        border border-blue-400 border-opacity-30
        transition-all duration-700
        ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}>
        ✨ Make a difference today
      </span>

      {/* 🎓 Main heading - white part
          delay-100 = waits 100ms before starting animation
          This makes it animate AFTER the badge */}
      <h1 className={`
        text-6xl md:text-7xl font-bold text-white mb-2
        transition-all duration-700 delay-100
        ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        Find Your Next
      </h1>

      {/* 🎓 Main heading - blue part
          delay-200 = animates after white heading */}
      <h1 className={`
        text-6xl md:text-7xl font-bold text-[#38bdf8] mb-6
        transition-all duration-700 delay-200
        ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        Volunteer Gig
      </h1>

      {/* 🎓 Subtitle paragraph
          max-w-3xl = maximum width of 3xl so text doesn't stretch too wide
          leading-relaxed = more space between lines, easier to read */}
      <p className={`
        text-blue-200 text-xl max-w-3xl mb-10 leading-relaxed
        transition-all duration-700 delay-300
        ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        Connect with communities near you. Discover meaningful volunteer
        opportunities and make an impact across Kenya.
      </p>

      {/* 🎓 Search bar container
          overflow-hidden = clips the search button corners to match rounded-xl
          w-full max-w-3xl = full width but never wider than 3xl
          delay-500 = animates last, after subtitle */}
      <div className={`
        flex items-center bg-white rounded-xl shadow-2xl
        overflow-hidden w-full max-w-3xl mb-8
        transition-all duration-700 delay-500
        ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* Location pin icon */}
        <span className="pl-5 text-gray-400 text-xl">📍</span>

        {/* 🎓 CONTROLLED INPUT
            value={searchQuery} = shows current state value in the box
            onChange fires every time user types a character
            e = the event object
            e.target.value = the new text typed
            setSearchQuery updates state with new text */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by city, cause, or organization..."
          className="flex-1 px-4 py-5 text-gray-700 outline-none text-base"
        />

        {/* 🎓 Search button - Link takes user to opportunities page
            clicking search always goes to opportunities regardless of what's typed
            We'll add real search filtering later with Firebase */}
        <Link
          to="/opportunities"
          className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-8 py-5 font-semibold text-sm transition duration-200"
        >
          🔍 Search
        </Link>
      </div>

      {/* 🎓 Popular tags section
          flex-wrap = tags wrap to next line if they don't fit
          delay-700 = last thing to animate in */}
      <div className={`
        flex flex-wrap justify-center gap-2 w-full max-w-5xl
        transition-all duration-700 delay-700
        ${heroVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        <span className="text-blue-300 text-sm mt-1 mr-2">Popular:</span>

        {/* 🎓 .map() loops through popularTags array
            For EACH tag it creates a button
            tag = the current tag object { id, name }
            key={tag.id} = required by React to track each item in a list */}
        {popularTags.map((tag) => (
          <button
            key={tag.id}
            // 🎓 onClick toggles active tag
            // If clicking active tag → set to null (deselect)
            // If clicking new tag → set to that tag's id
            onClick={() => setActiveTag(tag.id === activeTag ? null : tag.id)}
            className={`
              text-sm px-4 py-1.5 rounded-full transition-all duration-200
              ${activeTag === tag.id
                // 🎓 Active tag gets solid blue background
                ? 'bg-[#38bdf8] text-white border border-[#38bdf8]'
                // 🎓 Inactive tags get transparent border
                : 'border border-blue-400 border-opacity-40 text-blue-200 hover:bg-blue-500 hover:bg-opacity-20'
              }
            `}
          >
            {/* 🎓 {tag.name} renders the tag's name text */}
            {tag.name}
          </button>
        ))}
      </div>
    </section>
  )
}

// 🎓 export default makes this component available to import in other files
export default HeroSection