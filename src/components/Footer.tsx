import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialClass = "w-9 h-9 rounded-full border border-blue-400 border-opacity-40 flex items-center justify-center text-blue-300 text-xs hover:bg-[#38bdf8] hover:text-white hover:border-[#38bdf8] transition-all duration-200"

  return (
    <footer className="bg-[#0f2942] text-white pt-14 pb-8 px-8">
      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Volunteer Gigs 🤝
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Connecting passionate people with meaningful volunteer
              opportunities across Kenya. Every hour you give matters.
            </p>
            <div className="flex gap-3">
              {['T', 'I', 'F'].map((social) => (
                <a key={social} href="#" className={socialClass}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Opportunities', to: '/opportunities' },
                { label: 'Recommend a Place', to: '/#recommend' },
                { label: 'Sign In', to: '/signin' },
                { label: 'Sign Up', to: '/signup' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-blue-200 text-sm hover:text-[#38bdf8] transition duration-200"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                { label: '🐾 Animal Welfare' },
                { label: '🏥 Healthcare' },
                { label: '📚 Education' },
                { label: '🌿 Environment' },
                { label: '🤝 Community' },
              ].map((cat) => (
                <li key={cat.label}>
                  <Link
                    to="/opportunities"
                    className="text-blue-200 text-sm hover:text-[#38bdf8] transition duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-blue-400 border-opacity-20 mb-6" />

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-blue-300 text-xs">
          <p>© {currentYear} Volunteer Gigs. All rights reserved.</p>
          <p>Made with ❤️ for Kenya</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer