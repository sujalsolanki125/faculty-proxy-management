import { useAuth } from '../contexts/AuthContext'
import { mockProxyRequests, mockTimetable } from '../data/mockData'

const FacultyDashboard = () => {
  const { user } = useAuth()

  const myRequests = mockProxyRequests.filter(r => r.requestingFaculty.id === user?.id)
  const pendingRequests = mockProxyRequests.filter(r => r.status === 'PENDING' && r.requestingFaculty.id !== user?.id)
  const todayClasses = mockTimetable.filter(t => t.facultyId === user?.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'PROXY_ACCEPTED': return 'bg-blue-100 text-blue-800'
      case 'HOD_APPROVED': return 'bg-green-100 text-green-800'
      case 'HOD_REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              {user?.department?.name} • {user?.subjects?.join(', ')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today's Date</div>
            <div className="text-lg font-semibold">{new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                📝
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">My Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{myRequests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                ⏳
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {myRequests.filter(r => r.status === 'PENDING').length}
              </p>
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
              <p className="text-sm font-medium text-gray-500">Leave Balance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(user?.leaveBalance?.casualLeaves || 0) - (user?.leaveBalance?.usedCasualLeaves || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                📅
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Classes</p>
              <p className="text-2xl font-semibold text-gray-900">{todayClasses.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">My Recent Requests</h2>
          </div>
          <div className="p-6">
            {myRequests.length > 0 ? (
              <div className="space-y-4">
                {myRequests.slice(0, 3).map(request => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{request.subject.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(request.date).toLocaleDateString()} - Slot {request.lectureSlot}
                      </p>
                      <p className="text-xs text-gray-500">{request.reason}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No requests yet</p>
            )}
          </div>
        </div>

        {/* Available Proxy Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Available Proxy Requests</h2>
          </div>
          <div className="p-6">
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.slice(0, 3).map(request => (
                  <div key={request.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.requestingFaculty.firstName} {request.requestingFaculty.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{request.subject.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(request.date).toLocaleDateString()} - Slot {request.lectureSlot}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                          Accept
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No pending requests</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm font-medium">New Request</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium">View Timetable</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium">Leave Balance</div>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium">Profile</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard
