import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const { isAuthenticated, logout, userId } = useContext(AuthContext);
  const { wishlistCount } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    //content is temporary: once auth is implemented ->
    //Store - Categories - if loggedin (Profile)/ if not (Login) - if logged in: wishlist +cart
    <nav className={classes.navCtn}>
      <h4 onClick={() => navigate("/")} className={classes.title}>
        Vanguard
      </h4>
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
          <button className={classes.authBtn} type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => navigate("/login")} className={classes.authBtn}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
