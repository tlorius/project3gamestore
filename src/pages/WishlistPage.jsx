import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";

const WishlistPage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { user, setNeedsRefresh, removeGameFromAccount } =
    useContext(UserContext);

  useEffect(() => {
    setNeedsRefresh();
  }, [userId]);

  return isAuthenticated && user ? (
    <>
      <h1>Wishlist Page of {user && user.username}</h1>
      <div>
        {user.wishlistedGames.length !== 0 ? (
          user.wishlistedGames.map((game) => {
            return (
              <div key={game._id}>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <p>Price: {game.price}</p>
                <button
                  type="button"
                  onClick={() => removeGameFromAccount("wishlist", game._id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            );
          })
        ) : (
          <div>
            <h2>You have no games wishlisted right now.</h2>
            <Link to="/">
              In the store you can wishlist your favorite games!
            </Link>
          </div>
        )}
      </div>
    </>
  ) : (
    <Loader color="blue" size="xl" type="dots" />
  );
};

export default WishlistPage;
