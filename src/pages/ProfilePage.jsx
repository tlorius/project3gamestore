import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import { AuthContext } from "../providers/AuthContext";
import TwoFactorModal from "../components/TwoFactorModal";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import classes from "../styles/ProfilePage.module.css";

const ProfilePage = () => {
  const { user, setNeedsRefresh, reviewCount, gameCount, wishlistCount } =
    useContext(UserContext);
  const { userId, authRequestWithToken } = useContext(AuthContext);

  const disableTwoFactor = async () => {
    try {
      const response = await authRequestWithToken("/otp/disable", "POST");
      if (response.status === 200) {
        toast.success("🔓Two-Factor Authentication Disabled Successfully", {
          theme: "dark",
        });
        setNeedsRefresh(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setNeedsRefresh(true);
  }, []);

  return user && userId ? (
    <div className={classes.pageCtn}>
      <div className={classes.profileCtn}>
        <h1 className={classes.profileTag}>{user.username}'s PROFILE</h1>
        <Link className={classes.invoices} to={`/profile/${userId}/invoices`}>
          <span className={classes.highlightedSpan}>Invoices</span>
        </Link>
        <div className={classes.innerCtn}>
          <div>
            <p className={classes.subTitle}>DETAILS</p>
            <p className={classes.username}>{user.username}</p>
            <p className={classes.userEmail}>Email: {user.email}</p>

            <p className={classes.subTitle}>SECURITY</p>
            <p className={classes.twoFactorText}>
              Two Factor Authentification:{" "}
              {user.otp_enabled ? "Enabled ✅" : "Disabled ❌"}
            </p>
            {user.otp_enabled ? (
              <button
                className={`${classes.authenticationBtn} ${classes.redButton}`}
                type="button"
                onClick={disableTwoFactor}
              >
                Disable 2FA
              </button>
            ) : (
              <TwoFactorModal />
            )}
          </div>
          <div className={classes.linksCtn}>
            <Link className={classes.links} to={`/profile/${userId}/wishlist`}>
              <span className={classes.highlightedSpan}>Wishlist:</span>{" "}
              {wishlistCount}
            </Link>
            <Link className={classes.links} to={`/profile/${userId}/reviews`}>
              <span className={classes.highlightedSpan}>All Reviews:</span>{" "}
              {reviewCount}
            </Link>
            <Link className={classes.links} to={`/profile/${userId}/games`}>
              <span className={classes.highlightedSpan}>All Games:</span>{" "}
              {gameCount}
            </Link>
            {user?.roles.includes("GAMEDEVELOPER") && (
              <Link className={classes.links} to="/dashboard/dev">
                <span className={classes.highlightedSpan}>
                  My Developer Dashboard
                </span>
              </Link>
            )}
            {user?.roles.includes("ADMIN") && (
              <Link className={classes.links} to="/dashboard/admin">
                <span className={classes.highlightedSpan}>
                  My Admin Dashboard
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader color="blue" size="xl" type="dots" />
  );
};

export default ProfilePage;
