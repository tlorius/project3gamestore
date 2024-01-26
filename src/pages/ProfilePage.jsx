import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import { AuthContext } from "../providers/AuthContext";

const ProfilePage = () => {
  const { user, setNeedsRefresh, reviewCount, gameCount, wishlistCount } =
    useContext(UserContext);
  const { userId } = useContext(AuthContext);

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
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default ProfilePage;
