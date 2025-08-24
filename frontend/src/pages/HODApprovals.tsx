import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { mockProxyRequests } from '../data/mockData'

const HODApprovals = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('pending')

  // Filter requests for HOD's department
  const departmentRequests = mockProxyRequests.filter(r => 
    r.requestingFaculty.department?.id === user?.department?.id
  )

  const pendingRequests = departmentRequests.filter(r => r.status === 'PROXY_ACCEPTED')
  const approvedRequests = departmentRequests.filter(r => r.status === 'HOD_APPROVED')
  const rejectedRequests = departmentRequests.filter(r => r.status === 'HOD_REJECTED')

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

  const handleApprove = (requestId: string) => {
    alert(`Request ${requestId} approved successfully!`)
  }

  const handleReject = (requestId: string, reason?: string) => {
    alert(`Request ${requestId} rejected${reason ? ': ' + reason : ''}`)
  }

  const RequestCard = ({ request, showActions }: { request: any, showActions: boolean }) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-gray-900">{request.subject.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
              {request.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Requesting Faculty:</span>
                <div className="text-gray-900">
                  {request.requestingFaculty.firstName} {request.requestingFaculty.lastName}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Proxy Faculty:</span>
                <div className="text-gray-900">
                  {request.proxyFaculty?.firstName} {request.proxyFaculty?.lastName} 
                  <span className="text-green-600 ml-1">✓</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Date & Time:</span>
                <div className="text-gray-900">
                  {new Date(request.date).toLocaleDateString()} - Slot {request.lectureSlot}
                </div>
                <div className="text-gray-600 text-xs">{getSlotTime(request.lectureSlot)}</div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Subject Code:</span>
                <div className="text-gray-900">{request.subject.code}</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Reason:</span>
              <div className="text-gray-900 mt-1">{request.reason}</div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-3 pt-2 border-t">
            <span>Requested: {new Date(request.requestedAt).toLocaleString()}</span>
            {request.proxyAcceptedAt && (
              <span>Proxy Accepted: {new Date(request.proxyAcceptedAt).toLocaleString()}</span>
            )}
          </div>
        </div>

        {showActions && (
          <div className="ml-4 flex flex-col space-y-2">
            <button 
              onClick={() => handleApprove(request.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Approve
            </button>
            <button 
              onClick={() => handleReject(request.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Reject
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded text-xs">
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HOD Approvals</h1>
            <p className="text-gray-600 mt-1">Review and approve proxy requests for {user?.department?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{pendingRequests.length}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedRequests.length}</div>
              <div className="text-xs text-gray-500">Approved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                ⏳
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingRequests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                ✅
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved Today</p>
              <p className="text-2xl font-semibold text-gray-900">{approvedRequests.filter(r => 
                new Date(r.hodApprovedAt || '').toDateString() === new Date().toDateString()
              ).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                ❌
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">{rejectedRequests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                📊
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{departmentRequests.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'pending' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending Review ({pendingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'approved' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Approved ({approvedRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'rejected' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rejected ({rejectedRequests.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map(request => (
                  <div key={request.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <RequestCard request={request} showActions={true} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">✨</div>
                  <p>No pending requests</p>
                  <p className="text-sm">All proxy requests have been reviewed</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'approved' && (
            <div className="space-y-4">
              {approvedRequests.length > 0 ? (
                approvedRequests.map(request => (
                  <div key={request.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <RequestCard request={request} showActions={false} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📋</div>
                  <p>No approved requests</p>
                  <p className="text-sm">Approved requests will appear here</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'rejected' && (
            <div className="space-y-4">
              {rejectedRequests.length > 0 ? (
                rejectedRequests.map(request => (
                  <div key={request.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <RequestCard request={request} showActions={false} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🗃️</div>
                  <p>No rejected requests</p>
                  <p className="text-sm">Rejected requests will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HODApprovals
