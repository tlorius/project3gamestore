import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../providers/UserContext";

const GameDetailsPage = () => {
  const { requestWithToken, userId, isAuthenticated } = useContext(AuthContext);
  const { user, setNeedsRefresh, removeGameFromWishlist } =
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

  //pass one of 3 values - "wishlist, cart, buyfree"
  const addGameToAccount = async (isWishlist) => {
    //can only buy game if user is auth
    if (isAuthenticated) {
      try {
        const response = await requestWithToken(
          `/users/${isWishlist ? "wishlistgame" : "buygame"}`,
          "PUT",
          { gameToAdd: gameId }
        );
        if (response.status === 200) {
          toast(
            `😎👍 game ${
              isWishlist ? "wishlisted!" : "added to your account!"
            }`,
            {
              theme: "dark",
              autoClose: 3000,
            }
          );
          setNeedsRefresh(true);
        }
      } catch (error) {
        //for now just throwing this for every error, need to change later
        toast("😒 you already own this game", {
          theme: "dark",
          autoClose: 3000,
        });
        console.log(error);
      }
    } else {
      //replace with actual error handling
      console.log("please log in");
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
      {/* conditionally render buttons/links depending if the user is logged in/ already has the game wishlisted*/}
      {isAuthenticated && (
        <>
          {!user?.ownedGames.some((game) => game._id == gameId) && (
            <button type="button" onClick={() => addGameToAccount(false)}>
              "Buy" Game - Will add game to your account
            </button>
          )}
          {!user?.wishlistedGames.some((game) => game._id == gameId) ? (
            <button type="button" onClick={() => addGameToAccount(true)}>
              Add to Wishlist
            </button>
          ) : (
            <button
              type="button"
              onClick={() => removeGameFromWishlist(gameId)}
            >
              Remove from Wishlist
            </button>
          )}
          {!user?.cart.some((game) => game._id == gameId) ? (
            <button type="button">Add to Cart</button>
          ) : (
            <button type="button">Remove from Cart</button>
          )}

          <Link to={`/games/${gameId}/addReview`}>Add new review</Link>
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
