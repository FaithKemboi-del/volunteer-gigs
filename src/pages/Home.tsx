// 🎓 Home.tsx is now CLEAN and simple!
// It just imports components and arranges them on the page
// Each component handles its own logic internally
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import FeaturedOpportunities from '../components/FeaturedOpportunities'
import CallToAction from '../components/CallToAction'
import RecommendForm from '../components/RecommendForm'

function Home() {
  return (
    // 🎓 This div wraps everything on the page
    <div className="min-h-screen font-sans">

      {/* 🎓 Each component is used like an HTML tag
          React sees <Navbar /> and renders whatever Navbar returns
          This is the power of components - reusable building blocks! */}
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedOpportunities />
      <CallToAction />
      <RecommendForm />

    </div>
  )
}

export default Home