import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { mockProxyRequests } from '../data/mockData'

const ProxyRequests = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('my-requests')
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [newRequest, setNewRequest] = useState({
    subject: '',
    date: '',
    lectureSlot: 1,
    reason: '',
    facultyId: ''
  })

  const myRequests = mockProxyRequests.filter(r => r.requestingFaculty.id === user?.id)
  const availableRequests = mockProxyRequests.filter(r => 
    r.status === 'PENDING' && r.requestingFaculty.id !== user?.id
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'PROXY_ACCEPTED': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'HOD_APPROVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'HOD_REJECTED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSlotTime = (slot: number) => {
    const times = ['9:00-10:00', '10:00-11:00', '11:15-12:15', '12:15-1:15', '2:15-3:15', '3:15-4:15', '4:30-5:30', '5:30-6:30']
    return times[slot - 1] || 'Unknown'
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Proxy request submitted successfully!')
    setShowNewRequestModal(false)
    setNewRequest({ subject: '', date: '', lectureSlot: 1, reason: '', facultyId: '' })
  }

  const handleAcceptProxy = (requestId: string) => {
    alert(`Proxy request ${requestId} accepted!`)
  }

  const handleDeclineProxy = (requestId: string) => {
    alert(`Proxy request ${requestId} declined.`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proxy Requests</h1>
            <p className="text-gray-600 mt-1">Manage your proxy requests and accept others</p>
          </div>
          <button 
            onClick={() => setShowNewRequestModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            + New Request
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('my-requests')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'my-requests' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Requests ({myRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'available' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Available Requests ({availableRequests.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'my-requests' && (
            <div className="space-y-4">
              {myRequests.length > 0 ? (
                myRequests.map(request => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{request.subject.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Date:</span> {new Date(request.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Slot:</span> {request.lectureSlot}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {getSlotTime(request.lectureSlot)}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-gray-700">Reason:</span> {request.reason}
                        </div>
                        {request.proxyFaculty && (
                          <div className="mt-2">
                            <span className="font-medium text-gray-700">Proxy Faculty:</span> 
                            <span className="text-green-600"> {request.proxyFaculty.firstName} {request.proxyFaculty.lastName}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p>No proxy requests yet</p>
                  <p className="text-sm">Click "New Request" to create your first proxy request</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'available' && (
            <div className="space-y-4">
              {availableRequests.length > 0 ? (
                availableRequests.map(request => (
                  <div key={request.id} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{request.subject.name}</h3>
                          <span className="text-xs text-blue-600 font-medium">
                            Requested by {request.requestingFaculty.firstName} {request.requestingFaculty.lastName}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Date:</span> {new Date(request.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Slot:</span> {request.lectureSlot}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {getSlotTime(request.lectureSlot)}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-gray-700">Reason:</span> {request.reason}
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <button 
                          onClick={() => handleAcceptProxy(request.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
                        >
                          Accept Proxy
                        </button>
                        <button 
                          onClick={() => handleDeclineProxy(request.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📋</div>
                  <p>No available proxy requests</p>
                  <p className="text-sm">Check back later for new proxy requests from colleagues</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">New Proxy Request</h2>
                <button 
                  onClick={() => setShowNewRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={newRequest.subject}
                    onChange={(e) => setNewRequest({...newRequest, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Subject</option>
                    {user?.subjects?.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newRequest.date}
                    onChange={(e) => setNewRequest({...newRequest, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lecture Slot
                  </label>
                  <select
                    value={newRequest.lectureSlot}
                    onChange={(e) => setNewRequest({...newRequest, lectureSlot: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {[1,2,3,4,5,6,7,8].map(slot => (
                      <option key={slot} value={slot}>Slot {slot} ({getSlotTime(slot)})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <textarea
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Please provide reason for proxy request..."
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewRequestModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProxyRequests
