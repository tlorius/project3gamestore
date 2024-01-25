import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [isLoading, setIsLoading] = useState()
  const [userId, setUserId] = useState()

  return (
    <AuthContext.Provider value={(isAuthenticated, isLoading, useEffect)}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
