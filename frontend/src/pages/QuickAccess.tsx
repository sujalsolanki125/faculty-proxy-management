import { Link } from 'react-router-dom'

const QuickAccess = () => {
  // Mock user for demo access
  const setDemoUser = (role: 'ADMIN' | 'HOD' | 'FACULTY', email: string) => {
    const mockUser = {
      id: '1',
      email: email,
      firstName: role === 'ADMIN' ? 'System' : role === 'HOD' ? 'Dr. John' : 'Alice',
      lastName: role === 'ADMIN' ? 'Administrator' : role === 'HOD' ? 'Smith' : 'Johnson',
      role: role,
      department: role === 'ADMIN' ? null : {
        id: 'dept1',
        name: 'Computer Science and Engineering',
        code: 'CSE'
      },
      phoneNumber: '+1234567890',
      isActive: true
    }
    localStorage.setItem('demo-user', JSON.stringify(mockUser))
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              🎓 Faculty Proxy Management System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Quick Access - Choose your role to explore the system
            </p>
          </div>

          {/* Quick Role Access */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200 hover:border-red-300 transition-all">
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-2xl font-bold text-red-800 mb-4">Administrator</h3>
              <p className="text-red-600 mb-6">Manage users, view reports, system settings</p>
              <button 
                onClick={() => setDemoUser('ADMIN', 'admin@faculty.edu')}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Enter as Admin
              </button>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Head of Department</h3>
              <p className="text-green-600 mb-6">Approve proxy requests, manage department</p>
              <button 
                onClick={() => setDemoUser('HOD', 'hod.cse@faculty.edu')}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Enter as HOD
              </button>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Faculty Member</h3>
              <p className="text-purple-600 mb-6">Request proxy, view timetable, manage leaves</p>
              <button 
                onClick={() => setDemoUser('FACULTY', 'alice.faculty@faculty.edu')}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Enter as Faculty
              </button>
            </div>
          </div>

          {/* Direct Page Links */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔗 Direct Page Access</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/login" 
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <span className="text-2xl mr-3">🔐</span>
                <div>
                  <div className="font-semibold text-blue-800">Login Page</div>
                  <div className="text-sm text-blue-600">Authentication</div>
                </div>
              </Link>

              <a 
                href="http://localhost:5173/admin/dashboard" 
                className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                onClick={(e) => {
                  e.preventDefault()
                  setDemoUser('ADMIN', 'admin@faculty.edu')
                }}
              >
                <span className="text-2xl mr-3">👑</span>
                <div>
                  <div className="font-semibold text-red-800">Admin Dashboard</div>
                  <div className="text-sm text-red-600">User management</div>
                </div>
              </a>

              <a 
                href="http://localhost:5173/hod/dashboard" 
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                onClick={(e) => {
                  e.preventDefault()
                  setDemoUser('HOD', 'hod.cse@faculty.edu')
                }}
              >
                <span className="text-2xl mr-3">🏛️</span>
                <div>
                  <div className="font-semibold text-green-800">HOD Dashboard</div>
                  <div className="text-sm text-green-600">Approvals</div>
                </div>
              </a>

              <a 
                href="http://localhost:5173/faculty/dashboard" 
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                onClick={(e) => {
                  e.preventDefault()
                  setDemoUser('FACULTY', 'alice.faculty@faculty.edu')
                }}
              >
                <span className="text-2xl mr-3">🎓</span>
                <div>
                  <div className="font-semibold text-purple-800">Faculty Dashboard</div>
                  <div className="text-sm text-purple-600">Requests</div>
                </div>
              </a>
            </div>
          </div>

          {/* URL Information */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📍 Quick Access URLs</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-medium">Demo Navigation:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">localhost:5173/demo</code>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-medium">Quick Access:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">localhost:5173/</code>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">
              ✨ No login required - Click any role button to access that dashboard directly
            </p>
            <p className="text-sm text-gray-500">
              This demo uses mock data and simulates all system features
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickAccess
