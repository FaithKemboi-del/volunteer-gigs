import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0f2942] text-white pt-8 pb-4 px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="text-xl font-bold text-white mb-3">
              Volunteer Gigs 🤝
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Connecting passionate people with meaningful volunteer
              opportunities across Kenya. Every hour you give matters.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mb-4">
              {}
              <a href="https://www.instagram.com/volunteergigske/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-blue-400 border-opacity-40 flex items-center justify-center text-blue-300 text-xs hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-200">
                IG
              </a>
              {/* 🔗 TIKTOK - replace # with your TikTok link when ready */}
              <a href="https://www.tiktok.com/@brownscooper?_r=1&_t=ZS-94xcg8UXGxV" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-blue-400 border-opacity-40 flex items-center justify-center text-blue-300 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-200">
                TT
              </a>
            </div>

            {/* 🔗 EMAIL - replace with your actual email when ready */}
            <div>
              <p className="text-blue-300 text-xs uppercase tracking-wider mb-1">Email Us</p>
              <a href="mailto:fchepkosgei21@gmail.com" className="text-blue-200 text-sm hover:text-[#38bdf8] transition duration-200">
                volunteergigske@gmail.com
              </a>
            </div>
          </div>

          {/* Quick links - just a few important ones */}
          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Navigate
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Opportunities', to: '/opportunities' },
                  { label: 'Recommend a Place', to: '/#recommend' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-blue-200 text-sm hover:text-[#38bdf8] transition duration-200">
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-blue-400 border-opacity-20 mb-4" />

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