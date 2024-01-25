import { Link } from "react-router-dom"
import AuthForm from "../components/AuthForm"

const LoginPage = () => {
  return (
    <>
      <h1>Login</h1>
      <AuthForm isLogin />
      <Link to="/signup">I dont have an account yet</Link>
    </>
  )
}

export default LoginPage
