// 🎓 This file handles ALL communication between React and FastAPI
// Instead of writing fetch() calls everywhere, we write them once here
// and import them wherever we need them

const BASE_URL = 'http://127.0.0.1:8000'

// ============================================================
// AUTH
// ============================================================

// 🎓 Sends signup data to POST /auth/signup
export const signUp = async (data: {
  full_name: string
  email: string
  password: string
}) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  return response.json()
}

// 🎓 Sends signin data to POST /auth/signin
export const signIn = async (data: {
  email: string
  password: string
}) => {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  return response.json()
}

// ============================================================
// BOOKINGS
// ============================================================

// 🎓 Sends booking data to POST /bookings
export const createBooking = async (data: {
  full_name: string
  email: string
  phone: string
  location: string
  date: string
  opportunity_id: number
  opportunity_title: string
  opportunity_organization: string
  connect_with_others: boolean
  receive_reminder: boolean
}) => {
  const response = await fetch(`${BASE_URL}/bookings/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  return response.json()
}

// ============================================================
// RECOMMENDATIONS
// ============================================================

// 🎓 Sends recommendation data to POST /recommendations
export const createRecommendation = async (data: {
  organization_name: string
  location: string
  website?: string
  category: string
  description: string
}) => {
  const response = await fetch(`${BASE_URL}/recommendations/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  return response.json()
}

// ============================================================
// ADMIN
// ============================================================

export const adminLogin = async (data: {
  email: string
  password: string
}) => {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  return response.json()
}

export const getAdminBookings = async (token: string) => {
  const response = await fetch(`${BASE_URL}/admin/bookings?token=${token}`)
  if (!response.ok) throw new Error('Unauthorized')
  return response.json()
}

export const getAdminRecommendations = async (token: string) => {
  const response = await fetch(`${BASE_URL}/admin/recommendations?token=${token}`)
  if (!response.ok) throw new Error('Unauthorized')
  return response.json()
}

export const getAdminStats = async (token: string) => {
  const response = await fetch(`${BASE_URL}/admin/stats?token=${token}`)
  if (!response.ok) throw new Error('Unauthorized')
  return response.json()
}