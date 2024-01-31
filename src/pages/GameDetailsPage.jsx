import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import axios from "axios";
import { UserContext } from "../providers/UserContext";
import { Loader } from "@mantine/core";
import classes from "../styles/GameDetails.module.css";

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

  // Fetch the game details when the component mounts
  useEffect(() => {
    fetchGame();
    setNeedsRefresh(true);
  }, [gameId]);

  return game ? (
    <div className={classes.contentCtn}>
      <div className={classes.header}>
        <h1 className={classes.gameTitle}>{game.title}</h1>
        <Link to={`/games/${gameId}/update`}>Update Game</Link>
      </div>
      <div className={classes.gameCtn}>
        <img
          className={classes.gameImage}
          src={game.imageUrl}
          alt={game.title}
        />
        <div className={classes.gameContent}>
          <p>{game.description}</p>
          <p>Price: {(game.price / 100).toFixed(2)}€</p>
          {game.discountInPercent > 0 && (
            <p>
              Discount: {game.discountInPercent}% (Save{" "}
              {((game.price * (game.discountInPercent / 100)) / 100).toFixed(2)}
              €)
            </p>
          )}
          <Link to={`/games/${gameId}/reviews`}>
            Reviews: {game.reviews.length}
          </Link>
          {game.reviewScorePercent && (
            <p>Review Score: {game.reviewScorePercent}%</p>
          )}
          <p>Publisher: {game.publisher}</p>
          <p>Developer: {game.developer}</p>
          <p>Tags: {game.tags.join(", ")}</p>
        </div>
      </div>
      {/* Conditionally render buttons/links depending on user authentication and game ownership */}
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
          {!user?.ownedGames.some((game) => game._id == gameId) &&
            (!user?.wishlistedGames.some((game) => game._id == gameId) ? (
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
            ))}
          {!user?.ownedGames.some((game) => game._id == gameId) &&
            (!user?.cart.some((game) => game._id == gameId) ? (
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
            ))}
          {user?.ownedGames.some((game) => game._id == gameId) && (
            <Link to={`/games/${gameId}/addReview`}>Add new review</Link>
          )}
        </>
      )}
    </div>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default GameDetailsPage;
