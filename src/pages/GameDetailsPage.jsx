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
          `/api/users/buygame/${userId}`,
          "PUT",
          gameId
        );
        if (response.status === 200) {
          toast("😎👍 game added to your account", {
            theme: "dark",
            autoClose: 3000,
          });
          console.log(`game successfully added to your account`);
        }
      } catch (error) {
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
