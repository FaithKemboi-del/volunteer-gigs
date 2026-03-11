import { useState } from 'react'
import { Link } from 'react-router-dom'

// 🎓 TYPESCRIPT INTERFACE
// This describes exactly what our form data looks like
// Every field must be a string - TypeScript will warn us if we try to put a number!
interface SignInForm {
  email: string
  password: string
}

// 🎓 This describes what errors look like
// The ? means the field is OPTIONAL - there may or may not be an error
interface FormErrors {
  email?: string
  password?: string
}

function SignIn() {
  // 🎓 Our form data state - starts with empty strings
  // TypeScript knows this must follow the SignInForm interface
  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: '',
  })

  // 🎓 Tracks any validation errors
  const [errors, setErrors] = useState<FormErrors>({})

  // 🎓 Tracks if password is visible or hidden
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // 🎓 Tracks if form is being submitted
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 🎓 This function handles ANY input change
  // e is the event, e.target.name is which field changed
  // e.target.value is the new value typed
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    
    // 🎓 Spread operator (...) copies all existing formData
    // then we update only the field that changed
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field as user types
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // 🎓 FORM VALIDATION using TypeScript
  // Returns true if valid, false if there are errors
  const validate = (): boolean => {
    // newErrors follows our FormErrors interface
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)

    // If newErrors is empty object, form is valid!
    return Object.keys(newErrors).length === 0
  }

  // 🎓 Handles form submission
  // React.FormEvent is the TypeScript type for form submit events
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault() // stops page from reloading on submit

    if (!validate()) return // stop if validation fails

    setIsLoading(true)

    // 🎓 We simulate an API call with a delay
    // Later we will replace this with real Firebase auth!
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsLoading(false)
    alert('Signed in successfully! Firebase coming soon 🔥')
  }

  return (
    // Full screen split layout
    <div className="min-h-screen flex">

      {/* ===== LEFT PANEL ===== */}
      {/* Dark blue gradient side with decorative elements */}
      <div className="
        hidden md:flex
        w-1/2
        bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
        flex-col items-center justify-center
        relative overflow-hidden
        p-12
      ">
        {/* Decorative blurred circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-300 opacity-5 rounded-full blur-2xl" />

        {/* Floating volunteer emoji decorations */}
        <div className="absolute top-16 right-16 text-4xl opacity-20 animate-bounce">🌍</div>
        <div className="absolute bottom-24 left-16 text-3xl opacity-20 animate-pulse">❤️</div>
        <div className="absolute top-1/3 right-12 text-2xl opacity-20 animate-bounce">🤝</div>

        {/* Heart icon */}
        <div className="text-5xl mb-8 relative z-10">💙</div>

        {/* Inspirational quote */}
        <h2 className="text-3xl font-bold text-white text-center leading-tight mb-4 relative z-10">
          Every act of kindness creates
          <span className="text-[#38bdf8]"> a ripple effect</span>
        </h2>

        <p className="text-blue-200 text-center text-sm leading-relaxed relative z-10 max-w-sm">
          Join thousands of volunteers making a real difference
          in communities across Kenya.
        </p>

        {/* Decorative dots pattern */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-blue-300 rounded-full" />
          ))}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      {/* White form side */}
      <div className="
        w-full md:w-1/2
        flex items-center justify-center
        bg-white px-8 py-12
      ">
        <div className="w-full max-w-md">

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Sign in to continue making an impact
          </p>

          {/* FORM */}
          {/* 🎓 onSubmit calls our handleSubmit function when form is submitted */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL FIELD */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <div className={`
                flex items-center border-2 rounded-xl px-4 py-3
                transition duration-200
                ${errors.email
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus-within:border-[#38bdf8]'
                }
              `}>
                <span className="text-gray-400 mr-3">✉️</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                />
              </div>
              {/* 🎓 Only shows error message IF errors.email exists */}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <div className={`
                flex items-center border-2 rounded-xl px-4 py-3
                transition duration-200
                ${errors.password
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus-within:border-[#38bdf8]'
                }
              `}>
                <span className="text-gray-400 mr-3">🔒</span>
                {/* 🎓 type changes based on showPassword state
                    if showPassword is true → show text
                    if showPassword is false → show dots */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                />
                {/* Toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[#38bdf8] text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 rounded-xl font-semibold text-white
                transition-all duration-200
                flex items-center justify-center gap-2
                ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-700 hover:shadow-lg'
                }
              `}
            >
              {/* 🎓 Shows different text based on isLoading state */}
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In →
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition duration-200"
              >
                <span>G</span> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition duration-200"
              >
                <span>⌥</span> GitHub
              </button>
            </div>

          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#38bdf8] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default SignIn