import { useState, ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { mockNotifications } from '../data/mockData'

interface DashboardLayoutProps {
  children: ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const DashboardLayout = ({ children, currentPage, onPageChange }: DashboardLayoutProps) => {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'profile', label: 'Profile', icon: '👤' }
    ]

    if (user?.role === 'FACULTY') {
      return [
        ...baseItems,
        { id: 'proxy-requests', label: 'Proxy Requests', icon: '📝' },
        { id: 'my-requests', label: 'My Requests', icon: '📋' },
        { id: 'timetable', label: 'Timetable', icon: '📅' }
      ]
    }

    if (user?.role === 'HOD') {
      return [
        ...baseItems,
        { id: 'approvals', label: 'Approvals', icon: '✅' },
        { id: 'department', label: 'Department', icon: '🏢' },
        { id: 'reports', label: 'Reports', icon: '📊' }
      ]
    }

    if (user?.role === 'ADMIN') {
      return [
        ...baseItems,
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'departments', label: 'Departments', icon: '🏢' },
        { id: 'system', label: 'System', icon: '⚙️' }
      ]
    }

    return baseItems
  }

  const unreadCount = mockNotifications.filter(n => !n.isRead).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                🎓 Faculty Proxy System
              </h1>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                DEMO
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border">
                    <div className="p-3 border-b">
                      <h3 className="text-sm font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {mockNotifications.map(notification => (
                        <div key={notification.id} className={`p-3 border-b hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start">
                            <span className="mr-2">
                              {notification.type === 'SUCCESS' ? '✅' : notification.type === 'WARNING' ? '⚠️' : 'ℹ️'}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {user?.role}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white h-screen shadow-sm">
          <div className="p-4">
            <div className="space-y-2">
              {getNavigationItems().map(item => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
