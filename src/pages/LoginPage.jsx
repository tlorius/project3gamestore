import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <>
      <h1>Login</h1>
      <Link to="/signup">I dont have an account yet</Link>
    </>
  )
}

export default LoginPage
