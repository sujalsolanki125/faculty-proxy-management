import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './components/DashboardLayout'
import FacultyDashboard from './pages/FacultyDashboard'
import ProxyRequests from './pages/ProxyRequests'
import HODApprovals from './pages/HODApprovals'
import DemoNavigation from './pages/DemoNavigation'
import QuickAccess from './pages/QuickAccess'
import AuthTest from './components/AuthTest'
import { useState } from 'react'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" />
}

// Dashboard Routes
const DashboardRoutes = () => {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')
  
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'proxy-requests':
        return <ProxyRequests />
      case 'hod-approvals':
        return user?.role === 'HOD' ? <HODApprovals /> : <Navigate to="/dashboard" />
      case 'timetable':
        return <div className="p-6">Timetable (Coming Soon)</div>
      case 'profile':
        return <div className="p-6">Profile (Coming Soon)</div>
      case 'settings':
        return <div className="p-6">Settings (Coming Soon)</div>
      case 'admin-panel':
        return user?.role === 'ADMIN' ? <div className="p-6">Admin Panel (Coming Soon)</div> : <Navigate to="/dashboard" />
      case 'user-management':
        return user?.role === 'ADMIN' ? <div className="p-6">User Management (Coming Soon)</div> : <Navigate to="/dashboard" />
      case 'reports':
        return user?.role === 'ADMIN' ? <div className="p-6">Reports (Coming Soon)</div> : <Navigate to="/dashboard" />
      default:
        return <FacultyDashboard />
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </DashboardLayout>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<QuickAccess />} />
            <Route path="/demo" element={<DemoNavigation />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<AuthTest />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <DashboardRoutes />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
