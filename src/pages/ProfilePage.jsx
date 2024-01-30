import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import { AuthContext } from "../providers/AuthContext";
import TwoFactorModal from "../components/TwoFactorModal";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, setNeedsRefresh, reviewCount, gameCount, wishlistCount } =
    useContext(UserContext);
  const { userId, authRequestWithToken } = useContext(AuthContext);

  const disableTwoFactor = async () => {
    try {
      const response = await authRequestWithToken("/otp/disable", "POST");
      if (response.status === 200) {
        toast.success("Two-Factor Auth Disabled Successfully", {
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
    <>
      <h1>{user.username}s Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Link to={`/profile/${userId}/wishlist`}>Wishlist: {wishlistCount}</Link>
      <Link to={`/profile/${userId}/reviews`}>All Reviews: {reviewCount}</Link>
      <Link to={`/profile/${userId}/games`}>All Games: {gameCount}</Link>
      <Link to="/dashboard/dev">My Developer Dashboard</Link>
      {user?.roles.includes("ADMIN") && (
        <Link to="/dashboard/admin">My Admin Dashboard</Link>
      )}
      <Link to={`/profile/${userId}/invoices`}>Invoices</Link>

      {user.otp_enabled ? (
        <>
          <p>2FA: ✅enabled</p>
          <button type="button" onClick={disableTwoFactor}>
            Disable 2FA
          </button>
        </>
      ) : (
        <TwoFactorModal />
      )}
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default ProfilePage;
