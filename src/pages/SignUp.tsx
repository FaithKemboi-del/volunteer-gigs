import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../api'


// 🎓 TYPESCRIPT INTERFACE
// Notice SignUpForm has MORE fields than SignInForm
// because we need extra info when creating an account
interface SignUpForm {
  fullName: string
  email: string
  password: string
}

// 🎓 Optional error fields - the ? means they may or may not exist
interface FormErrors {
  fullName?: string
  email?: string
  password?: string
}

function SignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    fullName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  
  // 🎓 Same handleChange pattern as SignIn
  // One function handles ALL input fields!
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // 🎓 Validation - now checks THREE fields instead of two
  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

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
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)

    try {
      await signUp({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      })
      setIsSuccess(true)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* SUCCESS POPUP */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Welcome to Volunteer Gigs!
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Your account has been created successfully.
              Let's find you a volunteer opportunity!
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/signin"
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-8 py-3 rounded-xl font-semibold text-sm transition duration-200"
              >
                Sign In Now →
              </Link>
              <Link
                to="/opportunities"
                className="border-2 border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition duration-200"
              >
                Browse Opportunities
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== LEFT PANEL ===== */}
      {/* Same style as Sign In for consistency */}
      <div className="
        hidden md:flex w-1/2
        bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158]
        flex-col items-center justify-center
        relative overflow-hidden p-12
      ">
        {/* Decorative blurred circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl" />

        {/* Floating decorations */}
        <div className="absolute top-16 right-16 text-4xl opacity-20 animate-bounce">🌍</div>
        <div className="absolute bottom-24 left-16 text-3xl opacity-20 animate-pulse">❤️</div>
        <div className="absolute top-1/3 right-12 text-2xl opacity-20 animate-bounce">🤝</div>

        {/* Heart icon */}
        <div className="text-5xl mb-8 relative z-10">💙</div>

        {/* Quote */}
        <h2 className="text-3xl font-bold text-white text-center leading-tight mb-4 relative z-10">
          Every act of kindness creates
          <span className="text-[#38bdf8]"> a ripple effect</span>
        </h2>

        <p className="text-blue-200 text-center text-sm leading-relaxed relative z-10 max-w-sm">
          Join thousands of volunteers making a real difference
          in communities across Kenya.
        </p>

        {/* Decorative dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-blue-300 rounded-full" />
          ))}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="
        w-full md:w-1/2
        flex items-center justify-center
        bg-white px-8 py-12
      ">
        <div className="w-full max-w-md">

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Start your volunteer journey today
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* FULL NAME FIELD */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Full Name
              </label>
              <div className={`
                flex items-center border-2 rounded-xl px-4 py-3
                transition duration-200
                ${errors.fullName
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 focus-within:border-[#38bdf8]'
                }
              `}>
                <span className="text-gray-400 mr-3">👤</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

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
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                />
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

              {/* 🎓 Password strength indicator
                  Changes color based on password length */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {/* 3 bars that fill up as password gets stronger */}
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`
                          h-1 flex-1 rounded-full transition-all duration-300
                          ${formData.password.length >= level * 3
                            ? level === 1
                              ? 'bg-red-400'
                              : level === 2
                              ? 'bg-yellow-400'
                              : 'bg-green-400'
                            : 'bg-gray-200'
                          }
                        `}
                      />
                    ))}
                  </div>
                  {/* 🎓 Shows different text based on password length */}
                  <p className="text-xs mt-1 text-gray-400">
                    {formData.password.length < 3
                      ? '🔴 Weak password'
                      : formData.password.length < 6
                      ? '🟡 Medium password'
                      : '🟢 Strong password'
                    }
                  </p>
                </div>
              )}
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
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Creating account...
                </>
              ) : (
                <>Create Account →</>
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
             
            </div>

          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#38bdf8] font-semibold hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </div>
      
    </div>
  )
}

export default SignUp