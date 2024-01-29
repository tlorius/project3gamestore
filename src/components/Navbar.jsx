import { Link } from "react-router-dom";
import classes from "../styles/Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";

const Navbar = () => {
  const { isAuthenticated, logout, userId } = useContext(AuthContext);
  const { user, wishlistCount, cartCount } = useContext(UserContext);

  return (
    //content is temporary: once auth is implemented ->
    //Store - Categories - if loggedin (Profile)/ if not (Login) - if logged in: wishlist +cart
    <nav className={classes.navCtn}>
      <Link to="/">Store</Link>

      {isAuthenticated ? (
        <>
          <Link to={`/profile/${userId}`}>Profile</Link>
          <Link to={`/profile/${userId}/wishlist`}>
            Wishlist [{wishlistCount}]
          </Link>
          {/*replace this by icon later and fix link once site exists */}
          <Link>Cart [{cartCount}]</Link>
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
