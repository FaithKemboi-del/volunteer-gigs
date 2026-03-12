import { useState } from 'react'
import Navbar from '../components/Navbar'

// 🎓 TYPESCRIPT INTERFACE
// Describes exactly what our recommendation form looks like
// Every field must match these types!
interface RecommendForm {
  organizationName: string
  location: string
  website: string
  category: string
  description: string
}

// 🎓 Optional errors - ? means field may or may not have an error
interface FormErrors {
  organizationName?: string
  location?: string
  category?: string
  description?: string
}

// 🎓 Category options for the dropdown
const categoryOptions: string[] = [
  'Animal Welfare',
  'Healthcare',
  'Education',
  'Environment',
  'Community',
  'Other',
]

function Recommend() {
  // 🎓 Form data state - starts with empty strings
  const [formData, setFormData] = useState<RecommendForm>({
    organizationName: '',
    location: '',
    website: '',
    category: '',
    description: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // 🎓 Tracks if form was submitted successfully
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // 🎓 Handles text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // 🎓 Validates the form before submitting
  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.organizationName) {
      newErrors.organizationName = 'Organization name is required'
    }
    if (!formData.location) {
      newErrors.location = 'Location is required'
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    if (!formData.description) {
      newErrors.description = 'Please tell us about this opportunity'
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    // 🎓 Simulating API call - we'll replace with Firebase later!
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  // 🎓 SUCCESS STATE
  // If form submitted successfully show thank you message
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
          <div className="bg-white bg-opacity-10 rounded-3xl p-12 max-w-md">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Thank You!
            </h2>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Your recommendation for <span className="text-white font-semibold">
              {formData.organizationName}</span> has been submitted!
              We'll review it and add it to our platform soon.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  organizationName: '',
                  location: '',
                  website: '',
                  category: '',
                  description: '',
                })
              }}
              className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-8 py-3 rounded-xl font-semibold transition duration-200"
            >
              Submit Another →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]">

      <Navbar />

      {/* Decorative circles */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-8 py-16 relative z-10">

        {/* PAGE HEADER */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📍</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Know a Great Volunteer Site?
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Help others discover amazing opportunities. Recommend
            a place where people can volunteer.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ORGANIZATION NAME */}
          <div>
            <label className="text-sm font-medium text-blue-200 block mb-1">
              Organization Name *
            </label>
            <div className={`
              flex items-center rounded-xl px-4 py-3
              bg-white bg-opacity-10 border
              transition duration-200
              ${errors.organizationName
                ? 'border-red-400'
                : 'border-white border-opacity-20 focus-within:border-[#38bdf8]'
              }
            `}>
              <span className="text-blue-300 mr-3">🏢</span>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="e.g. Nairobi Animal Rescue"
                className="flex-1 bg-transparent outline-none text-white placeholder-blue-300 text-sm"
              />
            </div>
            {errors.organizationName && (
              <p className="text-red-400 text-xs mt-1">{errors.organizationName}</p>
            )}
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm font-medium text-blue-200 block mb-1">
              Location *
            </label>
            <div className={`
              flex items-center rounded-xl px-4 py-3
              bg-white bg-opacity-10 border
              transition duration-200
              ${errors.location
                ? 'border-red-400'
                : 'border-white border-opacity-20 focus-within:border-[#38bdf8]'
              }
            `}>
              <span className="text-blue-300 mr-3">📍</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Westlands, Nairobi"
                className="flex-1 bg-transparent outline-none text-white placeholder-blue-300 text-sm"
              />
            </div>
            {errors.location && (
              <p className="text-red-400 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* CATEGORY DROPDOWN */}
          <div>
            <label className="text-sm font-medium text-blue-200 block mb-1">
              Category *
            </label>
            {/* 🎓 Select dropdown - same handleChange works for selects too! */}
            <div className={`
              flex items-center rounded-xl px-4 py-3
              bg-white bg-opacity-10 border
              transition duration-200
              ${errors.category
                ? 'border-red-400'
                : 'border-white border-opacity-20 focus-within:border-[#38bdf8]'
              }
            `}>
              <span className="text-blue-300 mr-3">🏷️</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-sm text-white"
              >
                <option value="" className="text-gray-800">Select a category...</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          {/* WEBSITE - optional */}
          <div>
            <label className="text-sm font-medium text-blue-200 block mb-1">
              Website <span className="text-blue-400 text-xs">(optional)</span>
            </label>
            <div className="
              flex items-center rounded-xl px-4 py-3
              bg-white bg-opacity-10 border
              border-white border-opacity-20 focus-within:border-[#38bdf8]
              transition duration-200
            ">
              <span className="text-blue-300 mr-3">🌐</span>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g. www.organization.org"
                className="flex-1 bg-transparent outline-none text-white placeholder-blue-300 text-sm"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-blue-200 block mb-1">
              Tell us about this volunteer opportunity *
            </label>
            <div className={`
              rounded-xl px-4 py-3
              bg-white bg-opacity-10 border
              transition duration-200
              ${errors.description
                ? 'border-red-400'
                : 'border-white border-opacity-20 focus-within:border-[#38bdf8]'
              }
            `}>
              {/* 🎓 textarea is for multi-line text input
                  rows controls how tall it is */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about this volunteer opportunity, what activities are involved, who it helps..."
                rows={5}
                className="w-full bg-transparent outline-none text-white placeholder-blue-300 text-sm resize-none"
              />
              {/* 🎓 Character counter - shows how many characters typed */}
              <p className="text-blue-400 text-xs text-right mt-1">
                {formData.description.length} characters
              </p>
            </div>
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-4 rounded-xl font-bold text-white text-base
              flex items-center justify-center gap-2
              transition-all duration-200
              ${isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#38bdf8] hover:bg-[#0ea5e9] hover:shadow-xl'
              }
            `}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Submitting...
              </>
            ) : (
              <>
                🚀 Submit Recommendation
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Recommend