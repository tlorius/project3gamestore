import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthContext"

const AuthForm = ({ isLogin = false }) => {
  const [loginCredential, setLoginCredential] = useState("")
  const [email, SetEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { saveToken } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    let payload
    if (isLogin) {
      payload = {
        //update this depending on backend
        loginCredential,
        password,
      }
    } else {
      payload = {
        email,
        username,
        password,
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "signup"}`,
        payload
      )
      if (response.status === 201) {
        navigate("/login")
      }
      if (response.status === 200) {
        //navigate user to page they were trying to access before loggin in if possible
        console.log(response.data.token)
        saveToken(response.data.token)
        console.log("login successful")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <label>
            Username / E-Mail
            <input
              type="text"
              value={loginCredential}
              onChange={(event) => setLoginCredential(event.target.value)}
            />
          </label>
        ) : (
          <>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => SetEmail(event.target.value)}
              />
            </label>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </>
        )}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value={isLogin ? "Login" : "Sign Up"} />
      </form>
    </>
  )
}

export default AuthForm
