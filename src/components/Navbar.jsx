import { Link } from "react-router-dom"
import classes from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    //content is temporary: once auth is implemented ->
    //Store - Categories - if loggedin (Profile)/ if not (Login) - if logged in: wishlist
    <nav className={classes.navCtn}>
      <Link to="/">Store</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile/1">Profile</Link>
      {/*replace the 1 with actual user ID */}
      <Link to="/profile/1/wishlist">Wishlist</Link>
    </nav>
  )
}

export default Navbar
