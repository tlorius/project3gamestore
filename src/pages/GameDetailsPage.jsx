/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
      <div className={classes.gameCtn}>
        <div
          style={{ backgroundImage: `url(${game.imageUrl})` }}
          className={classes.gameImage}
          src={game.imageUrl}
          alt={game.title}
        />
        <div className={classes.gameContent}>
          <p className={classes.gameTitle}>{game.title}</p>
          <p className={classes.gameDescription}>{game.description}</p>
          {game.price === 0 ? (
            <p className={classes.smallP}>FREE</p>
          ) : (
            <p className={classes.smallP}>
              Price: <strong>{(game.price / 100).toFixed(2)}€</strong>
            </p>
          )}
          {game.price > 0 && game.discountInPercent > 0 && (
            <p>
              Discount:{" "}
              <strong className={classes.smallP}>
                {game.discountInPercent}% (Save{" "}
                {((game.price * (game.discountInPercent / 100)) / 100).toFixed(
                  2
                )}
              </strong>
              €)
            </p>
          )}
          <Link className={classes.review} to={`/games/${gameId}/reviews`}>
            <span className={classes.smallP}>Reviews</span>:{" "}
            {game.reviews.length}
          </Link>
          {game.reviewScorePercent && (
            <p>
              Review Score: <strong>{game.reviewScorePercent}%</strong>
            </p>
          )}
          <p className={classes.smallP}>
            Publisher: <strong>{game.publisher}</strong>
          </p>
          <p className={classes.smallP}>
            Developer: <strong>{game.developer}</strong>
          </p>
          <p className={classes.smallP}>
            Tags:{" "}
            <strong className={classes.tags}>
              {game.tags.map((tag, index) => (
                <span className={classes.tag} key={index}>
                  {tag}
                </span>
              ))}
            </strong>
          </p>

          {isAuthenticated && (
            <>
              {!user?.ownedGames.some((game) => game._id == gameId) &&
                game.price === 0 && (
                  <button
                    className={classes.cartButton}
                    type="button"
                    onClick={() => addGameToAccount("buyfree", gameId)}
                  >
                    Get game
                  </button>
                )}

              {!user?.ownedGames.some((game) => game._id == gameId) &&
                (!user?.cart.some((game) => game._id == gameId) &&
                game.price ? (
                  <button
                    className={classes.cartButton}
                    type="button"
                    onClick={() => addGameToAccount("cart", gameId)}
                  >
                    Add to Cart
                  </button>
                ) : game.price ? (
                  <button
                    className={classes.cartButton}
                    type="button"
                    onClick={() => removeGameFromAccount("cart", gameId)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  false
                ))}
              {!user?.ownedGames.some((game) => game._id == gameId) &&
                (!user?.wishlistedGames.some((game) => game._id == gameId) ? (
                  <button
                    className={classes.wishListButton}
                    type="button"
                    onClick={() => addGameToAccount("wishlist", gameId)}
                  >
                    Add to Wishlist
                  </button>
                ) : (
                  <button
                    className={classes.wishListButton}
                    type="button"
                    onClick={() => removeGameFromAccount("wishlist", gameId)}
                  >
                    Remove from Wishlist
                  </button>
                ))}
              {user?.ownedGames.some((game) => game._id == gameId) && (
                <Link
                  className={classes.reviewButton}
                  to={`/games/${gameId}/addReview`}
                >
                  Add new review
                </Link>
              )}
              {game.createdBy == userId && (
                <Link
                  className={classes.wishListButton}
                  to={`/games/${gameId}/update`}
                >
                  Update Game
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      {/* Conditionally render buttons/links depending on user authentication and game ownership */}
    </div>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default GameDetailsPage;
