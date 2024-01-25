import { Link } from "react-router-dom";
import classes from "../styles/Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    //content is temporary: once auth is implemented ->
    //Store - Categories - if loggedin (Profile)/ if not (Login) - if logged in: wishlist
    <nav className={classes.navCtn}>
      <Link to="/">Store</Link>

      {isAuthenticated ? (
        <>
          <Link to="/profile/1">Profile</Link>
          <Link to="/profile/1/wishlist">Wishlist</Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {/*replace the 1 with actual user ID */}
    </nav>
  );
};

export default Navbar;
