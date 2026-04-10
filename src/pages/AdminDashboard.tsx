import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdminBookings, getAdminRecommendations, getAdminStats } from '../api'

interface Booking {
  id: number
  full_name: string
  email: string
  phone: string
  location: string
  date: string
  opportunity_title: string
  opportunity_organization: string
  connect_with_others: boolean
  receive_reminder: boolean
  created_at: string
}

interface Recommendation {
  id: number
  organization_name: string
  location: string
  website: string
  category: string
  description: string
  created_at: string
}

interface Stats {
  total_bookings: number
  total_recommendations: number
  reminders_requested: number
  connect_requested: number
}

function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'bookings' | 'recommendations'>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [bookingsData, recommendationsData, statsData] = await Promise.all([
        getAdminBookings(token!),
        getAdminRecommendations(token!),
        getAdminStats(token!),
      ])
      setBookings(bookingsData)
      setRecommendations(recommendationsData)
      setStats(statsData)
    } catch (err) {
      navigate('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">⏳ Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#0f2942] via-[#1a3a5c] to-[#0d3158] px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">🛠️ Admin Dashboard</h1>
            <p className="text-blue-200 text-sm mt-1">Volunteer Gigs Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* STATS */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: stats.total_bookings, icon: '📋' },
              { label: 'Recommendations', value: stats.total_recommendations, icon: '📍' },
              { label: 'Reminder Requests', value: stats.reminders_requested, icon: '📧' },
              { label: 'Connect Requests', value: stats.connect_requested, icon: '🤝' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === 'bookings' ? 'bg-[#38bdf8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            📋 Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === 'recommendations' ? 'bg-[#38bdf8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            📍 Recommendations ({recommendations.length})
          </button>
        </div>

        {/* BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['#', 'Name', 'Email', 'Phone', 'Opportunity', 'Date', 'Location', 'Reminder', 'Connect', 'Booked On'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-4 py-3 text-sm text-gray-500">{booking.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{booking.full_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{booking.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{booking.phone}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{booking.opportunity_title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{booking.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{booking.location}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.receive_reminder ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {booking.receive_reminder ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.connect_with_others ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                          {booking.connect_with_others ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-2">📋</p>
                  <p>No bookings yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS TABLE */}
        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['#', 'Organization', 'Location', 'Category', 'Website', 'Description', 'Submitted On'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recommendations.map((rec) => (
                    <tr key={rec.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-4 py-3 text-sm text-gray-500">{rec.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{rec.organization_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{rec.location}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {rec.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#38bdf8]">
                        {rec.website ? (
                          <a href={rec.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {rec.website}
                          </a>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{rec.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(rec.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recommendations.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-2">📍</p>
                  <p>No recommendations yet</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminDashboard