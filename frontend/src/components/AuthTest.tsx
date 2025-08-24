import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

interface AuthResponse {
  success: boolean
  data?: any
  error?: string
}

function AuthTest() {
  const [formData, setFormData] = useState({
    email: 'admin@faculty.edu',
    password: 'Admin@123'
  })
  const [response, setResponse] = useState<AuthResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState<string>('Checking...')

  // Check server connectivity on component mount
  useEffect(() => {
    const checkServer = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'}/health`, { 
          timeout: 5000 
        })
        setServerStatus(`✅ Connected - ${result.data.status}`)
      } catch (error) {
        setServerStatus('❌ Cannot connect to server')
        console.error('Server connection error:', error)
      }
    }
    checkServer()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/test-login`, formData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setResponse({
        success: true,
        data: result.data
      })
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>
      let errorMessage = 'Unknown error occurred'
      
      if (axiosError.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please check if the backend is running on port 5000.'
      } else if (axiosError.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your connection and CORS settings.'
      } else if (axiosError.response?.data?.error) {
        errorMessage = axiosError.response.data.error
      } else if (axiosError.message) {
        errorMessage = axiosError.message
      }
      
      setResponse({
        success: false,
        error: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🔐 Authentication Test
            </h1>
            <p className="text-gray-600">
              Testing Faculty Proxy Management System Login
            </p>
            <div className="text-sm mt-2 p-2 bg-gray-100 rounded">
              Server Status: <span className="font-mono">{serverStatus}</span>
            </div>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing...
                </div>
              ) : (
                'Test Login'
              )}
            </button>
          </form>

          {/* Test Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Test Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>👑 Admin: admin@faculty.edu / Admin@123</div>
              <div>👨‍🏫 Faculty: faculty@faculty.edu / Faculty@123</div>
            </div>
            <div className="text-xs text-blue-600 mt-2">
              🔗 Testing endpoint: http://localhost:5000/api/auth/test-login
            </div>
          </div>

          {/* Response Display */}
          {response && (
            <div className={`mt-6 p-4 rounded-md ${response.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <h3 className={`text-sm font-medium ${response.success ? 'text-green-800' : 'text-red-800'} mb-2`}>
                {response.success ? '✅ Success!' : '❌ Error!'}
              </h3>
              <pre className={`text-xs ${response.success ? 'text-green-700' : 'text-red-700'} overflow-auto`}>
                {JSON.stringify(response.success ? response.data : { error: response.error }, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthTest
