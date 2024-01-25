import { Link } from "react-router-dom"
import classes from "../styles/Navbar.module.css"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthContext"

const Navbar = () => {
  const { logout } = useContext(AuthContext)
  return (
    //content is temporary: once auth is implemented ->
    //Store - Categories - if loggedin (Profile)/ if not (Login) - if logged in: wishlist
    <nav className={classes.navCtn}>
      <Link to="/">Store</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile/1">Profile</Link>
      <button type="button" onClick={logout}>
        Logout
      </button>
      {/*replace the 1 with actual user ID */}
      <Link to="/profile/1/wishlist">Wishlist</Link>
    </nav>
  )
}

export default Navbar
