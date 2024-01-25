import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const GameDetailsPage = () => {
  const { requestWithToken, userId, isAuthenticated } = useContext(AuthContext);
  const { gameId } = useParams();
  const addGameToAccount = async () => {
    //can only buy game if user is auth
    if (isAuthenticated) {
      try {
        const response = await requestWithToken(
          `/users/buygame/${userId}`,
          "PUT",
          { gameToAdd: gameId }
        );
        if (response.status === 200) {
          toast("😎👍 game added to your account", {
            theme: "dark",
            autoClose: 3000,
          });
          console.log(`game successfully added to your account`);
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
  return (
    <>
      <h1>GameDetails for game with ID: {gameId}</h1>
      <Link to={`/games/${gameId}/update`}>Update Game</Link>
      <button type="button" onClick={addGameToAccount}>
        "Buy" Game - Will add game to your account
      </button>
      <Link to="/games/1/addreview">Add new review</Link>
      <ToastContainer />
    </>
  );
};

export default GameDetailsPage;
