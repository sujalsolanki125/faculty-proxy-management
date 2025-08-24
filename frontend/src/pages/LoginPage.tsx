import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: 'alice.faculty@faculty.edu',
    password: 'password123'
  })
  const [error, setError] = useState('')
  const { login, isLoading, user } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const result = await login(formData.email, formData.password)
    if (result.success) {
      // Navigate to dashboard on successful login
      navigate('/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  const demoUsers = [
    { email: 'admin@faculty.edu', password: 'admin123', role: 'Admin' },
    { email: 'hod.cse@faculty.edu', password: 'password123', role: 'HOD' },
    { email: 'alice.faculty@faculty.edu', password: 'password123', role: 'Faculty' },
    { email: 'bob.faculty@faculty.edu', password: 'password123', role: 'Faculty' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎓 Faculty Proxy System
            </h1>
            <p className="text-gray-600">
              Demo Mode - Full Feature Preview
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">🎬 Demo Accounts:</h3>
            <div className="space-y-2">
              {demoUsers.map((user, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-100 text-xs"
                  onClick={() => setFormData({ email: user.email, password: user.password })}
                >
                  <span className="font-medium">{user.role}</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Click any row to auto-fill credentials</p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              ✨ This is a demo with simulated data and full UI workflow
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
