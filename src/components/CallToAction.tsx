// 🎓 This component handles the "Ready to Make a Difference" section
// It's simple - just UI, no state needed!
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    // 🎓 Same dark navy gradient as hero for consistency
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

      {/* 🎓 flex-wrap = buttons wrap to next line on small screens */}
      <div className="flex items-center justify-center gap-4 flex-wrap">

        {/* Primary button - solid blue */}
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

        {/* Secondary button - outlined */}
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
  )
}

export default CallToAction