import { Link } from "react-router-dom";
import classes from "../styles/Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const { isAuthenticated, logout, userId } = useContext(AuthContext);
  const { wishlistCount } = useContext(UserContext);

  return (
    //content is temporary: once auth is implemented ->
    //Store - Categories - if loggedin (Profile)/ if not (Login) - if logged in: wishlist +cart
    <nav className={classes.navCtn}>
      <h4 className={classes.title}>Vanguard</h4>
      <Link className={classes.navLink} to="/">
        Store
      </Link>

      {isAuthenticated ? (
        <>
          <Link className={classes.navLink} to={`/profile/${userId}`}>
            Profile
          </Link>
          <Link className={classes.navLink} to={`/profile/${userId}/wishlist`}>
            Wishlist [{wishlistCount}]
          </Link>
          <CartModal />
          <button className={classes.logoutBtn} type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link className={classes.navLink} to="/login">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
