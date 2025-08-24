import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { mockUsers } from '../data/mockData'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'HOD' | 'FACULTY'
  department?: {
    id: string
    name: string
    code: string
  } | null
  phoneNumber?: string
  subjects?: string[]
  leaveBalance?: {
    casualLeaves: number
    sickLeaves: number
    earnedLeaves: number
    usedCasualLeaves: number
    usedSickLeaves: number
    usedEarnedLeaves: number
  }
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('demo-user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(u => u.email === email)
    
    if (!foundUser) {
      setIsLoading(false)
      return { success: false, error: 'Invalid email or password' }
    }
    
    // Demo passwords - matching mock users
    const demoPasswords: { [key: string]: string } = {
      'admin@faculty.edu': 'admin123',
      'hod.cse@faculty.edu': 'password123',
      'alice.faculty@faculty.edu': 'password123',
      'bob.faculty@faculty.edu': 'password123'
    }
    
    if (demoPasswords[email] !== password) {
      setIsLoading(false)
      return { success: false, error: 'Invalid email or password' }
    }
    
    setUser(foundUser as User)
    localStorage.setItem('demo-user', JSON.stringify(foundUser))
    setIsLoading(false)
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('demo-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
