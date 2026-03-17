import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// 🎓 Hardcoded opportunities - same ids as the cards
// When Firebase is connected this will be fetched from the database
const opportunities = [
  {
    id: 1,
    title: 'KSPCA Visit',
    organization: 'Kenya Society for the Protection and Care of Animals',
    category: 'Animal Welfare',
    location: 'Karen, Nairobi',
    description: 'Visit and care for rescued animals at KSPCA. Help with feeding, grooming, walking dogs, and socializing animals to prepare them for adoption.',
    activities: ['Feeding animals', 'Dog walking', 'Grooming', 'Socialization'],
    timing: 'Sat 9am–1pm',
    totalSlots: 204,
    registeredCount: 189,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=KSPCA+Visit',
  },
  {
    id: 2,
    title: 'Hospice Nairobi',
    organization: 'Nairobi Hospice',
    category: 'Healthcare',
    location: 'Nairobi, Kenya',
    description: 'Provide companionship and emotional support to patients receiving palliative care. Read, chat, or simply be present for patients and families.',
    activities: ['Companionship', 'Reading to patients', 'Emotional support', 'Family assistance'],
    timing: 'Wed & Fri 10am–1pm',
    totalSlots: 144,
    registeredCount: 134,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Hospice+Nairobi',
  },
  {
    id: 3,
    title: 'Hospice Nyeri',
    organization: 'Nyeri Hospice',
    category: 'Healthcare',
    location: 'Nyeri, Kenya',
    description: 'Support elderly and terminally ill patients at Nyeri Hospice. Assist with daily activities, provide companionship, and help with light duties.',
    activities: ['Patient care', 'Daily activities', 'Companionship', 'Light duties'],
    timing: 'Tue & Thu 9am–12pm',
    totalSlots: 107,
    registeredCount: 87,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Hospice+Nyeri',
  },
  {
    id: 4,
    title: 'Teach & Inspire',
    organization: 'Jacaranda School Kibera',
    category: 'Education',
    location: 'Kibera, Nairobi',
    description: 'Teach and mentor underprivileged children in Kibera. Help with literacy, numeracy, and life skills to build a brighter future.',
    activities: ['Teaching literacy', 'Numeracy support', 'Mentorship', 'Life skills'],
    timing: 'Mon, Wed & Fri 8am–12pm',
    totalSlots: 50,
    registeredCount: 32,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Teach+%26+Inspire',
  },
  {
    id: 5,
    title: 'Karura Forest Cleanup',
    organization: 'Friends of Karura Forest',
    category: 'Environment',
    location: 'Karura, Nairobi',
    description: 'Join us in keeping Karura Forest clean and green. Help with litter collection, tree planting, and trail maintenance.',
    activities: ['Litter collection', 'Tree planting', 'Trail maintenance', 'Environmental education'],
    timing: 'Every Saturday 7am–11am',
    totalSlots: 80,
    registeredCount: 45,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Karura+Cleanup',
  },
  {
    id: 6,
    title: 'Maziwa Community Kitchen',
    organization: 'Maziwa Methodist Church',
    category: 'Community',
    location: 'Maziwa, Nairobi',
    description: 'Help prepare and serve meals to vulnerable community members. Work alongside a warm team making a direct difference every week.',
    activities: ['Meal preparation', 'Food serving', 'Kitchen cleanup', 'Community outreach'],
    timing: 'Sun 10am–2pm',
    totalSlots: 30,
    registeredCount: 18,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Maziwa+Kitchen',
  },
  {
    id: 7,
    title: 'Newlife Home Trust',
    organization: 'Newlife Home Trust Kilimani',
    category: 'Community',
    location: 'Kilimani, Nairobi',
    description: 'Support children and families at Newlife Home Trust. Help with childcare, tutoring, and recreational activities for children in need.',
    activities: ['Childcare', 'Tutoring', 'Recreational activities', 'Family support'],
    timing: 'Sat & Sun 9am–1pm',
    totalSlots: 40,
    registeredCount: 28,
    image: 'https://placehold.co/600x400/1a3a5c/white?text=Newlife+Home',
  },
]

const categoryColors: Record<string, string> = {
  'Animal Welfare': 'bg-orange-100 text-orange-700',
  'Healthcare': 'bg-blue-100 text-blue-700',
  'Education': 'bg-purple-100 text-purple-700',
  'Environment': 'bg-green-100 text-green-700',
  'Community': 'bg-pink-100 text-pink-700',
}

interface BookingForm {
  fullName: string
  email: string
  phone: string
  location: string
  date: string
  connectWithOthers: boolean
  receiveReminder: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  location?: string
  date?: string
}

function Book() {
  const { id } = useParams<{ id: string }>()
  const opportunity = opportunities.find((opp) => opp.id === Number(id))

  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    connectWithOthers: false,
    receiveReminder: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  // 🎓 If no opportunity matches the id in the URL show a not found screen
  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center px-8">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Opportunity not found</h2>
          <p className="text-gray-500 mb-6">This volunteer opportunity doesn't exist or has been removed.</p>
          <Link to="/opportunities" className="bg-[#38bdf8] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#0ea5e9] transition">
            Browse Opportunities
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const spotsLeft = opportunity.totalSlots - opportunity.registeredCount
  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.location.trim()) newErrors.location = 'Your location is required'
    if (!formData.date) newErrors.date = 'Please select a date'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowPopup(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 🎓 THANK YOU POPUP
          Only shows when showPopup is true
          Fixed covers entire screen and floats above everything */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Dark overlay - clicking it closes popup */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowPopup(false)}
          />

          {/* Popup card */}
          <div className="relative z-10 bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Thanks for Volunteering!
            </h2>
            <p className="text-gray-500 leading-relaxed mb-2">
              Every hour counts and yours will make a real difference.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              You're signed up for{' '}
              <span className="text-[#38bdf8] font-semibold">{opportunity.title}</span>
              {' '}on{' '}
              <span className="font-semibold text-gray-700">{formData.date}</span>.
            </p>

            {/* Only shows if they checked receive reminder */}
            {formData.receiveReminder && (
              <p className="text-sm text-green-600 bg-green-50 rounded-xl px-4 py-3 mb-4">
                📧 A reminder will be sent to <span className="font-semibold">{formData.email}</span> before your visit!
              </p>
            )}

            {/* Only shows if they checked connect with others */}
            {formData.connectWithOthers && (
              <p className="text-sm text-blue-600 bg-blue-50 rounded-xl px-4 py-3 mb-6">
                🤝 We'll connect you with other volunteers on the same date!
              </p>
            )}

            <div className="flex flex-col gap-3">
              <Link
                to="/opportunities"
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-8 py-3 rounded-xl font-semibold text-sm transition duration-200"
              >
                Browse More Opportunities
              </Link>
              <Link
                to="/"
                className="border-2 border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158] px-8 py-12 text-center">
        <p className="text-blue-300 text-sm mb-2">You're signing up for</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{opportunity.title}</h1>
        <p className="text-blue-200 text-sm">{opportunity.organization}</p>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT - Opportunity summary */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Opportunity Details</h2>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <img src={opportunity.image} alt={opportunity.title} className="w-full h-44 object-cover" />
            <div className="p-5">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[opportunity.category]}`}>
                {opportunity.category}
              </span>
              <h3 className="text-base font-bold text-gray-800 mt-3 mb-1">{opportunity.title}</h3>
              <p className="text-[#38bdf8] text-sm font-medium mb-3">{opportunity.organization}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{opportunity.description}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📍 {opportunity.location}</p>
                <p>⏰ {opportunity.timing}</p>
                <p className={`font-semibold ${spotsLeft <= 10 ? 'text-red-500' : 'text-[#38bdf8]'}`}>
                  🎯 {spotsLeft} spots remaining
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <h4 className="text-sm font-bold text-gray-800 mb-3">What you'll be doing</h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.activities.map((activity, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - Booking form */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Details</h2>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition duration-200 ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200 focus-within:border-[#38bdf8]'}`}>
                  <span className="text-gray-400 mr-3">👤</span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Faith Wanjiru"
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address *</label>
                <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition duration-200 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus-within:border-[#38bdf8]'}`}>
                  <span className="text-gray-400 mr-3">✉️</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. faith@gmail.com"
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number *</label>
                <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition duration-200 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus-within:border-[#38bdf8]'}`}>
                  <span className="text-gray-400 mr-3">📞</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 0712 345 678"
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Your Location *</label>
                <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition duration-200 ${errors.location ? 'border-red-400 bg-red-50' : 'border-gray-200 focus-within:border-[#38bdf8]'}`}>
                  <span className="text-gray-400 mr-3">📍</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Westlands, Nairobi"
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                  />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Date *</label>
                <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition duration-200 ${errors.date ? 'border-red-400 bg-red-50' : 'border-gray-200 focus-within:border-[#38bdf8]'}`}>
                  <span className="text-gray-400 mr-3">📅</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                  />
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              {/* 🎓 CHECKBOXES SECTION */}
              <div className="space-y-3 pt-2">

                {/* Connect with others checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name="connectWithOthers"
                      checked={formData.connectWithOthers}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {/* 🎓 Custom styled checkbox
                        sr-only hides the real checkbox visually
                        We show our own styled box below */}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${formData.connectWithOthers ? 'bg-[#38bdf8] border-[#38bdf8]' : 'border-gray-300 group-hover:border-[#38bdf8]'}`}>
                      {formData.connectWithOthers && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Connect with other volunteers</p>
                    <p className="text-xs text-gray-400 mt-0.5">We'll introduce you to others visiting on the same date</p>
                  </div>
                </label>

                {/* Receive reminder checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name="receiveReminder"
                      checked={formData.receiveReminder}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${formData.receiveReminder ? 'bg-[#38bdf8] border-[#38bdf8]' : 'border-gray-300 group-hover:border-[#38bdf8]'}`}>
                      {formData.receiveReminder && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Send me a reminder email</p>
                    <p className="text-xs text-gray-400 mt-0.5">We'll email you the day before your visit</p>
                  </div>
                </label>

              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#38bdf8] hover:bg-[#0ea5e9] hover:shadow-lg'}`}
              >
                {isLoading
                  ? <><span className="animate-spin">⏳</span> Confirming...</>
                  : <>🎉 Confirm Booking</>
                }
              </button>

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Book