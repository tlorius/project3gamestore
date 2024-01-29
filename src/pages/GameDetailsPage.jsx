import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import axios from "axios";
import { UserContext } from "../providers/UserContext";

const GameDetailsPage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { user, setNeedsRefresh, removeGameFromAccount, addGameToAccount } =
    useContext(UserContext);
  const { gameId } = useParams();
  const [game, setGame] = useState();

  const fetchGame = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/games/${gameId}`
      );
      setGame(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //fetching game and refetching user details
  useEffect(() => {
    fetchGame();
    setNeedsRefresh(true);
  }, [gameId]);

  return game ? (
    <>
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <Link to={`/games/${gameId}/reviews`}>
        Reviews: {game.reviews.length}
      </Link>
      {/* conditionally render buttons/links depending if the user is logged in/ already has the game on any list*/}
      {isAuthenticated && (
        <>
          {!user?.ownedGames.some((game) => game._id == gameId) &&
            game.price === 0 && (
              <button
                type="button"
                onClick={() => addGameToAccount("buyfree", gameId)}
              >
                Add Free Game to your Account
              </button>
            )}
          {!user?.wishlistedGames.some((game) => game._id == gameId) ? (
            <button
              type="button"
              onClick={() => addGameToAccount("wishlist", gameId)}
            >
              Add to Wishlist
            </button>
          ) : (
            <button
              type="button"
              onClick={() => removeGameFromAccount("wishlist", gameId)}
            >
              Remove from Wishlist
            </button>
          )}
          {!user?.cart.some((game) => game._id == gameId) ? (
            <button
              type="button"
              onClick={() => addGameToAccount("cart", gameId)}
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => removeGameFromAccount("cart", gameId)}
            >
              Remove from Cart
            </button>
          )}
          {user?.ownedGames.some((game) => game._id == gameId) && (
            <Link to={`/games/${gameId}/addReview`}>Add new review</Link>
          )}

          {/*might remove the update button or make it conditional */}
          <Link to={`/games/${gameId}/update`}>Update Game</Link>
        </>
      )}
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default GameDetailsPage;
