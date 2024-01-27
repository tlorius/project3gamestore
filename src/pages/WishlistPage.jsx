import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";

const WishlistPage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { user, setNeedsRefresh } = useContext(UserContext);

  useEffect(() => {
    setNeedsRefresh();
  }, [userId]);

  return isAuthenticated ? (
    <>
      <h1>Wishlist Page of {user && user.username}</h1>
      <div>
        {user.wishlistedGames.map((game) => {
          return (
            <div key={game._id}>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <p>Price: {game.price}</p>
              <button type="button"></button>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default WishlistPage;
