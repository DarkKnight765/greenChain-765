"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserType = "company" | "ngo" | null

interface User {
  id: string
  name: string
  email: string
  type: UserType
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, type: UserType) => Promise<void>
  loginWithWallet: (address: string, type: UserType) => Promise<void>
  signup: (name: string, email: string, password: string, type: UserType) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("carbon-marketplace-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("carbon-marketplace-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("carbon-marketplace-user")
    }
  }, [user])

  const login = async (email: string, password: string, type: UserType) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would validate credentials with your backend
      setUser({
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        type,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithWallet = async (address: string, type: UserType) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser({
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: `${type === "company" ? "Company" : "NGO"} ${address.substring(0, 6)}`,
        email: `${address.substring(0, 6)}@wallet.com`,
        type,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, type: UserType) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would create a user in your backend
      setUser({
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        type,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithWallet, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

