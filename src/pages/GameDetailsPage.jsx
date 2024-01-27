import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../providers/UserContext";

const GameDetailsPage = () => {
  const { requestWithToken, userId, isAuthenticated } = useContext(AuthContext);
  const { user, setNeedsRefresh } = useContext(UserContext);
  const { gameId } = useParams();
  const [game, setGame] = useState();
  const [gameOwned, setGameOwned] = useState(false);
  const [gameWishListed, setGameWishListed] = useState(false);

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

  const addGameToAccount = async (isWishlist) => {
    //can only buy game if user is auth
    if (isAuthenticated) {
      try {
        console.log(
          `/users/${isWishlist ? "wishlistgame" : "buygame"}/${userId}`
        );
        const response = await requestWithToken(
          `/users/${isWishlist ? "wishlistgame" : "buygame"}/${userId}`,
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
          isWishlist ? setGameWishListed(true) : setGameOwned(true);
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

  const removeGameFromWishlist = async () => {
    if (isAuthenticated) {
      try {
        const response = await requestWithToken(
          `/users/removewishlistgame/${userId}`,
          "PUT",
          { gameToRemove: gameId }
        );
        if (response.status === 200) {
          toast(
            `😒👍 game removed from your wishlist"
            }`,
            {
              theme: "dark",
              autoClose: 3000,
            }
          );
          setGameWishListed(false);
        }
      } catch (error) {
        toast("😒 you dont have this game wishlisted", {
          theme: "dark",
          autoClose: 3000,
        });
        console.log(error);
      }
    } else {
      console.error("please log in");
    }
  };

  return game ? (
    <>
      <h1>{game.title}</h1>
      <Link to={`/games/${gameId}/reviews`}>
        Reviews: {game.reviews.length}
      </Link>
      {/* conditionally render buttons/links depending if the user is logged in/ already has the game wishlisted*/}
      {isAuthenticated && (
        <>
          {!gameOwned &&
            !user?.ownedGames.some((game) => game._id == gameId) && (
              <button type="button" onClick={() => addGameToAccount(false)}>
                "Buy" Game - Will add game to your account
              </button>
            )}
          {!gameWishListed &&
          !user?.wishlistedGames.some((game) => game._id == gameId) ? (
            <button type="button" onClick={() => addGameToAccount(true)}>
              Add to Wishlist
            </button>
          ) : (
            <button type="button" onClick={removeGameFromWishlist}>
              Remove from Wishlist
            </button>
          )}

          <Link to={`/games/${gameId}/addReview`}>Add new review</Link>
          <Link to={`/games/${gameId}/update`}>Update Game</Link>
        </>
      )}

      <ToastContainer />
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default GameDetailsPage;
