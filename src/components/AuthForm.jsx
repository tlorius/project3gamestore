import { useState } from "react"

const AuthForm = ({ isLogin = false }) => {
  const [loginCredential, setLoginCredential] = useState("")
  const [email, SetEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
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
        userName,
        password,
      }
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
            <label>signup email</label>
            <label>signup username</label>
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
