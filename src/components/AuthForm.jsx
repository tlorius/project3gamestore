import { useState } from "react"

const AuthForm = ({ isLogin = false }) => {
  const [loginCredential, setLoginCredential] = useState("")
  const [email, SetEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username / E-Mail
          <input
            type="text"
            value={loginCredential}
            onChange={(event) => setLoginCredential(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </form>
    </>
  )
}

export default AuthForm
