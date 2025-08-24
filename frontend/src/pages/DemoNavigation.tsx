import { Link } from 'react-router-dom'

const DemoNavigation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎓 Faculty Proxy System - Demo Navigation
            </h1>
            <p className="text-lg text-gray-600">
              Direct links to all pages - No login required!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Authentication Pages */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">🔐 Authentication</h3>
              <div className="space-y-2">
                <Link 
                  to="/login" 
                  className="block w-full text-left p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Login Page
                </Link>
              </div>
            </div>

            {/* Admin Dashboards */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-4">👑 Admin Pages</h3>
              <div className="space-y-2">
                <Link 
                  to="/admin/dashboard" 
                  className="block w-full text-left p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Admin Dashboard
                </Link>
                <Link 
                  to="/admin/users" 
                  className="block w-full text-left p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  User Management
                </Link>
                <Link 
                  to="/admin/reports" 
                  className="block w-full text-left p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Admin Reports
                </Link>
              </div>
            </div>

            {/* HOD Pages */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">🏛️ HOD Pages</h3>
              <div className="space-y-2">
                <Link 
                  to="/hod/dashboard" 
                  className="block w-full text-left p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  HOD Dashboard
                </Link>
                <Link 
                  to="/hod/approvals" 
                  className="block w-full text-left p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Proxy Approvals
                </Link>
                <Link 
                  to="/hod/reports" 
                  className="block w-full text-left p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  HOD Reports
                </Link>
              </div>
            </div>

            {/* Faculty Pages */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">🎓 Faculty Pages</h3>
              <div className="space-y-2">
                <Link 
                  to="/faculty/dashboard" 
                  className="block w-full text-left p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Faculty Dashboard
                </Link>
                <Link 
                  to="/faculty/proxy-request" 
                  className="block w-full text-left p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Request Proxy
                </Link>
                <Link 
                  to="/faculty/history" 
                  className="block w-full text-left p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Request History
                </Link>
                <Link 
                  to="/faculty/timetable" 
                  className="block w-full text-left p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  My Timetable
                </Link>
              </div>
            </div>

            {/* System Pages */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">⚙️ System Pages</h3>
              <div className="space-y-2">
                <Link 
                  to="/notifications" 
                  className="block w-full text-left p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                >
                  Notifications
                </Link>
                <Link 
                  to="/profile" 
                  className="block w-full text-left p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Profile Settings
                </Link>
              </div>
            </div>

            {/* Demo Data Pages */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🎬 Demo Features</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => window.open('http://localhost:5173/', '_blank')}
                  className="block w-full text-left p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Open New Tab
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="block w-full text-left p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>

          {/* Quick Access URLs */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔗 Direct URLs (Copy & Paste)</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Admin:</p>
                <code className="bg-white p-1 rounded">http://localhost:5173/admin/dashboard</code>
              </div>
              <div>
                <p className="font-medium text-gray-700">HOD:</p>
                <code className="bg-white p-1 rounded">http://localhost:5173/hod/dashboard</code>
              </div>
              <div>
                <p className="font-medium text-gray-700">Faculty:</p>
                <code className="bg-white p-1 rounded">http://localhost:5173/faculty/dashboard</code>
              </div>
              <div>
                <p className="font-medium text-gray-700">Proxy Request:</p>
                <code className="bg-white p-1 rounded">http://localhost:5173/faculty/proxy-request</code>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ✨ This demo navigation bypasses authentication - All pages are accessible directly!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoNavigation
