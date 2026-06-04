import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdminBookings, getAdminRecommendations, getAdminStats, getOpportunities, createOpportunity, deleteOpportunity } from '../api'

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

interface OpportunityForm {
  title: string
  organization: string
  category: string
  location: string
  description: string
  full_description: string
  activities: string
  timing: string
  total_slots: string
  image: string
}

const emptyForm: OpportunityForm = {
  title: '',
  organization: '',
  category: '',
  location: '',
  description: '',
  full_description: '',
  activities: '',
  timing: '',
  total_slots: '',
  image: '',
}

const categoryOptions = [
  'Animal Welfare',
  'Healthcare',
  'Education',
  'Environment',
  'Community',
]

function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'bookings' | 'recommendations' | 'opportunities'>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [opportunityForm, setOpportunityForm] = useState<OpportunityForm>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

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
      const [bookingsData, recommendationsData, statsData, opportunitiesData] = await Promise.all([
        getAdminBookings(token!),
        getAdminRecommendations(token!),
        getAdminStats(token!),
        getOpportunities(),
      ])
      setBookings(bookingsData)
      setRecommendations(recommendationsData)
      setStats(statsData)
      setOpportunities(opportunitiesData)
    } catch (err) {
      navigate('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setOpportunityForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAddOpportunity = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createOpportunity(token!, {
        ...opportunityForm,
        total_slots: Number(opportunityForm.total_slots),
      })
      setOpportunityForm(emptyForm)
      setShowAddForm(false)
      const data = await getOpportunities()
      setOpportunities(data)
      alert('✅ Opportunity added successfully!')
    } catch (error) {
      alert('Something went wrong. Please try again!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteOpportunity(token!, id)
      setOpportunities(prev => prev.filter(opp => opp.id !== id))
      setDeleteConfirmId(null)
      alert('✅ Opportunity deleted!')
    } catch (error) {
      alert('Failed to delete opportunity!')
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
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition duration-200">
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
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('bookings')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === 'bookings' ? 'bg-[#38bdf8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            📋 Bookings ({bookings.length})
          </button>
          <button onClick={() => setActiveTab('recommendations')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === 'recommendations' ? 'bg-[#38bdf8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            📍 Recommendations ({recommendations.length})
          </button>
          <button onClick={() => setActiveTab('opportunities')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === 'opportunities' ? 'bg-[#38bdf8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            🌍 Opportunities ({opportunities.length})
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
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
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
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{new Date(booking.created_at).toLocaleDateString()}</td>
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
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
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
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{rec.category}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#38bdf8]">
                        {rec.website ? <a href={rec.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{rec.website}</a> : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{rec.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{new Date(rec.created_at).toLocaleDateString()}</td>
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

        {/* OPPORTUNITIES TAB */}
        {activeTab === 'opportunities' && (
          <div>

            {/* Add button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition duration-200"
              >
                {showAddForm ? '✕ Cancel' : '+ Add Opportunity'}
              </button>
            </div>

            {/* ADD FORM */}
            {showAddForm && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Opportunity</h3>
                <form onSubmit={handleAddOpportunity} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Title *</label>
                    <input name="title" value={opportunityForm.title} onChange={handleFormChange} required placeholder="e.g. KSPCA Visit" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Organization *</label>
                    <input name="organization" value={opportunityForm.organization} onChange={handleFormChange} required placeholder="e.g. Nairobi Hospice" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Category *</label>
                    <select name="category" value={opportunityForm.category} onChange={handleFormChange} required className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]">
                      <option value="">Select category...</option>
                      {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Location *</label>
                    <input name="location" value={opportunityForm.location} onChange={handleFormChange} required placeholder="e.g. Karen, Nairobi" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Timing *</label>
                    <input name="timing" value={opportunityForm.timing} onChange={handleFormChange} required placeholder="e.g. Sat 9am-1pm" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Total Slots *</label>
                    <input name="total_slots" value={opportunityForm.total_slots} onChange={handleFormChange} required type="number" placeholder="e.g. 50" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Activities * <span className="text-gray-400 font-normal">(comma separated)</span></label>
                    <input name="activities" value={opportunityForm.activities} onChange={handleFormChange} required placeholder="e.g. Dog walking, Feeding, Grooming" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Image URL <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input name="image" value={opportunityForm.image} onChange={handleFormChange} placeholder="https://..." className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8]" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Short Description *</label>
                    <textarea name="description" value={opportunityForm.description} onChange={handleFormChange} required rows={2} placeholder="Brief description shown on card..." className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8] resize-none" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Full Description <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea name="full_description" value={opportunityForm.full_description} onChange={handleFormChange} rows={3} placeholder="Full description shown when Learn More is clicked..." className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#38bdf8] resize-none" />
                  </div>

                  <div className="md:col-span-2">
                    <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-xl font-bold text-white transition duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#38bdf8] hover:bg-[#0ea5e9]'}`}>
                      {isSubmitting ? '⏳ Adding...' : '✅ Add Opportunity'}
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* OPPORTUNITIES LIST */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['#', 'Title', 'Organization', 'Category', 'Location', 'Timing', 'Slots', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {opportunities.map((opp) => (
                      <tr key={opp.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-4 py-3 text-sm text-gray-500">{opp.id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{opp.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{opp.organization}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{opp.category}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{opp.location}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{opp.timing}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{opp.total_slots}</td>
                        <td className="px-4 py-3 text-sm">
                          {deleteConfirmId === opp.id ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleDelete(opp.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition">
                                Confirm
                              </button>
                              <button onClick={() => setDeleteConfirmId(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium transition">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirmId(opp.id)} className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-xs font-medium transition">
                              🗑️ Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {opportunities.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p className="text-4xl mb-2">🌍</p>
                    <p>No opportunities yet. Add one above!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminDashboard