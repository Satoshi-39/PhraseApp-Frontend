"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "@/lib/api"
import { getCurrentUser, isAuthenticated, signInWithGoogle, signOut } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signIn: () => Promise<User | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // 初期ロード時に認証状態を確認
    const checkAuth = () => {
      const isAuth = isAuthenticated()
      setAuthenticated(isAuth)

      if (isAuth) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const signIn = async () => {
    setLoading(true)
    const user = await signInWithGoogle()
    setUser(user)
    setAuthenticated(!!user)
    setLoading(false)
    return user
  }

  const logout = () => {
    signOut()
    setUser(null)
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: authenticated,
        signIn,
        logout,
      }}
    >
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
