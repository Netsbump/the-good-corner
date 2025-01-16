import { createContext, useContext, ReactNode } from 'react'
import { useQuery, ApolloQueryResult } from '@apollo/client'
import { GET_CURRENT_USER } from '@/api/api'
import type { MeQuery } from '@/gql/graphql'

type AuthContextType = {
  isAuthenticated: boolean
  user: { id: string; email: string } | null
  loading: boolean
  refetch: () => Promise<ApolloQueryResult<MeQuery>>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  //const client = useApolloClient()
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    pollInterval: 24 * 60 * 60 * 1000
  })

  const value = {
    isAuthenticated: !!data?.me,
    user: data?.me || null,
    loading,
    refetch
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
} 