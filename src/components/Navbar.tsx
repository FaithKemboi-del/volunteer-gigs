// Link lets us navigate between pages without reloading
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
      
      {/* Logo on the left */}
      <Link to="/" className="text-gray-800 font-bold text-xl">
        Volunteer Gigs
      </Link>

      {/* Buttons on the right */}
      <div className="flex gap-3 items-center">
        <Link
          to="/signin"
          className="border-2 border-gray-700 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-200"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-200"
        >
          Sign Up
        </Link>
      </div>

    </nav>
  )
}

export default Navbar