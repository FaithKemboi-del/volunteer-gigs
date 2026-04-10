import logo from '../assets/logo.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const categories = [
  { label: '🐾 Animal Welfare', value: 'Animal Welfare' },
  { label: '🏥 Healthcare', value: 'Healthcare' },
  { label: '📚 Education', value: 'Education' },
  { label: '🌿 Environment', value: 'Environment' },
  { label: '🤝 Community', value: 'Community' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleCategoryClick = (value: string) => {
    setCategoriesOpen(false)
    setMenuOpen(false)
    navigate(`/opportunities?category=${value}`)
  }

  return (
    <nav className="bg-white px-8 py-4 shadow-sm relative border-b border-gray-100">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
  <img
    src={logo}
    alt="Volunteer Gigs Logo"
    className="h-12 w-auto object-contain"
  />
</Link>

        {/* DESKTOP MIDDLE LINKS */}
        <div className="hidden md:flex gap-8 items-center">

          <Link
            to="/"
            className="text-gray-600 text-sm font-medium hover:text-[#38bdf8] transition duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38bdf8] group-hover:w-full transition-all duration-300" />
          </Link>

          <Link
            to="/opportunities"
            className="text-gray-600 text-sm font-medium hover:text-[#38bdf8] transition duration-200 relative group"
          >
            Opportunities
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38bdf8] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* CATEGORIES DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="text-gray-600 text-sm font-medium hover:text-[#38bdf8] transition duration-200 flex items-center gap-1 relative group"
            >
              Categories
              <span className={`text-xs transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38bdf8] group-hover:w-full transition-all duration-300" />
            </button>

            {categoriesOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCategoriesOpen(false)}
                />
                <div className="absolute top-8 left-0 bg-white rounded-2xl shadow-xl z-50 py-2 min-w-48 border border-gray-100">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryClick(cat.value)}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#38bdf8] transition duration-200 flex items-center gap-2"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          
           <a href="/#recommend"
            className="text-gray-600 text-sm font-medium hover:text-[#38bdf8] transition duration-200 relative group"
          >
            Recommend a Place
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38bdf8] group-hover:w-full transition-all duration-300" />
          </a>

        </div>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            to="/signin"
            className="text-[#0f2942] text-sm font-semibold px-5 py-2 rounded-xl border-2 border-[#0f2942] hover:bg-[#0f2942] hover:text-white transition duration-200"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-5 py-2 rounded-xl text-sm font-semibold transition duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>

        {/* HAMBURGER BUTTON - mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl z-50 px-8 py-6 flex flex-col gap-4 border-t border-gray-100">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 text-sm font-medium hover:text-[#38bdf8] transition duration-200 flex items-center gap-2"
          >
            🏠 Home
          </Link>

          <Link
            to="/opportunities"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 text-sm font-medium hover:text-[#38bdf8] transition duration-200 flex items-center gap-2"
          >
            🌍 Opportunities
          </Link>

          {/* Mobile categories */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Categories</p>
            <div className="flex flex-col gap-2 pl-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryClick(cat.value)}
                  className="text-left text-gray-700 text-sm font-medium hover:text-[#38bdf8] transition duration-200"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          
           <a href="/#recommend"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 text-sm font-medium hover:text-[#38bdf8] transition duration-200 flex items-center gap-2"
          >
            📍 Recommend a Place
          </a>

          <div className="border-t border-gray-200 pt-2 flex flex-col gap-3">
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="text-[#0f2942] text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-[#0f2942] hover:bg-[#0f2942] hover:text-white transition duration-200 text-center"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-200 text-center shadow-md"
            >
              Sign Up
            </Link>
          </div>

        </div>
      )}

    </nav>
  )
}

export default Navbar