// 🎓 This component handles the entire recommend a place form
// All the form logic lives HERE, not in Home.tsx!
import { useState } from 'react'
import { createRecommendation } from '../api'

// 🎓 Describes the shape of our form data
interface RecommendForm {
  organizationName: string
  location: string
  website: string
  category: string
  description: string
}

// 🎓 Describes possible validation errors
// ? means optional - field may or may not have an error
interface FormErrors {
  organizationName?: string
  location?: string
  category?: string
  description?: string
}

// 🎓 Category options for dropdown
const categoryOptions: string[] = [
  'Animal Welfare',
  'Healthcare',
  'Education',
  'Environment',
  'Community',
  'Other',
]

function RecommendForm() {
  // 🎓 Form data state - starts with all empty strings
  const [formData, setFormData] = useState<RecommendForm>({
    organizationName: '',
    location: '',
    website: '',
    category: '',
    description: '',
  })

  // 🎓 Validation errors state
  const [errors, setErrors] = useState<FormErrors>({})

  // 🎓 Tracks if form is submitting
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 🎓 Tracks if form was submitted successfully
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // 🎓 ONE function handles ALL input changes
  // Works for input, textarea AND select elements
  // React.ChangeEvent<...> = TypeScript type for change events
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    // 🎓 Destructure name and value from the element that changed
    // name = the input's name attribute e.g "organizationName"
    // value = what the user typed
    const { name, value } = e.target

    // 🎓 Spread operator (...prev) copies ALL existing form data
    // Then [name]: value updates ONLY the field that changed
    // This is called an "immutable update" - we never modify state directly
    setFormData(prev => ({ ...prev, [name]: value }))

    // 🎓 Clear error for this field as user types
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // 🎓 Validates all required fields before submitting
  // Returns true if valid, false if there are errors
  const validate = (): boolean => {
    // Start with empty errors object
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

    // 🎓 Object.keys gets all keys of newErrors
    // If length is 0 there are no errors - form is valid!
    return Object.keys(newErrors).length === 0
  }

  // 🎓 async function = can use await inside it
  // React.FormEvent = TypeScript type for form submit events
  // Promise<void> = this function returns a Promise that resolves to nothing
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)

    try {
      await createRecommendation({
        organization_name: formData.organizationName,
        location: formData.location,
        website: formData.website,
        category: formData.category,
        description: formData.description,
      })
      setIsSubmitted(true)
    } catch (error) {
      alert('Something went wrong. Please try again!')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  } 

  // 🎓 CONDITIONAL RENDERING at component level
  // If form was submitted successfully show thank you screen
  // Otherwise show the form
  if (isSubmitted) {
    return (
      <section id="recommend" className="bg-white py-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-50 rounded-3xl p-12">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Your recommendation for{' '}
              {/* 🎓 Shows the organization name they submitted */}
              <span className="text-[#38bdf8] font-semibold">
                {formData.organizationName}
              </span>{' '}
              has been submitted! We'll review it and add it soon.
            </p>
            <button
              onClick={() => {
                // 🎓 Reset everything back to initial state
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
      </section>
    )
  }

  return (
    // 🎓 id="recommend" allows navbar to scroll here with href="/#recommend"
    <section id="recommend" className="bg-white py-20 px-8">
      <div className="max-w-2xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📍</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Know a Great Volunteer Site?
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Help others discover amazing opportunities. Recommend
            a place where people can volunteer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Organization Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Organization Name *
            </label>
            {/* 🎓 focus-within:border-[#38bdf8] = border turns blue when input inside is focused */}
            <div className={`
              flex items-center border-2 rounded-xl px-4 py-3
              transition duration-200
              ${errors.organizationName
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus-within:border-[#38bdf8]'
              }
            `}>
              <span className="text-gray-400 mr-3">🏢</span>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="e.g. Nairobi Animal Rescue"
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
              />
            </div>
            {/* 🎓 && short circuit - only renders if errors.organizationName exists */}
            {errors.organizationName && (
              <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Location *
            </label>
            <div className={`
              flex items-center border-2 rounded-xl px-4 py-3
              transition duration-200
              ${errors.location
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus-within:border-[#38bdf8]'
              }
            `}>
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
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Category *
            </label>
            <div className={`
              flex items-center border-2 rounded-xl px-4 py-3
              transition duration-200
              ${errors.category
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus-within:border-[#38bdf8]'
              }
            `}>
              <span className="text-gray-400 mr-3">🏷️</span>
              {/* 🎓 select = dropdown element
                  Same handleChange works for selects too! */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
              >
                <option value="">Select a category...</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          {/* Website - optional */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Website{' '}
              <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="
              flex items-center border-2 rounded-xl px-4 py-3
              border-gray-200 focus-within:border-[#38bdf8]
              transition duration-200
            ">
              <span className="text-gray-400 mr-3">🌐</span>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g. www.organization.org"
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Tell us about this volunteer opportunity *
            </label>
            <div className={`
              border-2 rounded-xl px-4 py-3
              transition duration-200
              ${errors.description
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus-within:border-[#38bdf8]'
              }
            `}>
              {/* 🎓 textarea = multi line text input
                  rows={5} = 5 lines tall
                  resize-none = prevents user from resizing it */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about this volunteer opportunity, what activities are involved, who it helps..."
                rows={5}
                className="w-full bg-transparent outline-none text-gray-700 text-sm resize-none"
              />
              {/* 🎓 Character counter - updates in real time as user types */}
              <p className="text-gray-400 text-xs text-right mt-1">
                {formData.description.length} characters
              </p>
            </div>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-4 rounded-xl font-bold text-white text-base
              flex items-center justify-center gap-2
              transition-all duration-200
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#38bdf8] hover:bg-[#0ea5e9] hover:shadow-lg'
              }
            `}
          >
            {/* 🎓 Shows different content based on isLoading state */}
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Submitting...
              </>
            ) : (
              <>🚀 Submit Recommendation</>
            )}
          </button>

        </form>
      </div>
    </section>
  )
}

export default RecommendForm