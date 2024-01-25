import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [isLoading, setIsLoading] = useState()
  const [userId, setUserId] = useState()

  const saveToken = (tokenFromLogin) => {
    setToken(tokenFromLogin)
    setIsAuthenticated(true)
    window.localStorage.setItem("authToken", tokenFromLogin)
    //check if how userID is stored in the token
    const { userID } = jwtDecode(tokenFromLogin)
    setUserId(userId)
  }

  //might need to handle the cases where a token is expired more gracefully
  //to redirect user to home or login page
  const verifyToken = async (tokenFromLocalStorage) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`, {
        headers: { Authorization: `Bearer ${tokenFromLocalStorage}` },
      })
      if (response.status === 200) {
        setIsAuthenticated(true)
        setToken(tokenFromLocalStorage)
        setIsLoading(false)
        const { userId } = jwtDecode(tokenFromLocalStorage)
        setUserId(userId)
      } else {
        setIsLoading(false)
        window.localStorage.removeItem("authToken")
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      window.localStorage.removeItem("authToken")
    }
  }
  //make sure this function actually works
  const requestWithToken = async (endpoint, method = "GET", payload) => {
    const url = `${import.meta.env.VITE_API_URL}/api${endpoint}`
    const options = {
      method,
      url,
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    }
    try {
      const response = await axios(options)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    setToken()
    window.localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    setUserId()
  }

  /* only enable once backend part is done
 useEffect(() => {
    const tokenFromLocalStorage = window.localStorage.getItem("authToken")
    if (tokenFromLocalStorage) {
      verifyToken(tokenFromLocalStorage)
    } else {
      setIsLoading(false)
    }
  }, []) */

  return (
    <AuthContext.Provider
      value={
        (isAuthenticated,
        isLoading,
        saveToken,
        requestWithToken,
        logout,
        userId)
      }
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
