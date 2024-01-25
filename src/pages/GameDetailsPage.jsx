import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";

const GameDetailsPage = () => {
  const { requestWithToken, userId, isAuthenticated } = useContext(AuthContext);
  const { gameId } = useParams();
  const addGameToAccount = async () => {
    //add if statement to check if user is authenticated
    try {
      const response = await requestWithToken(
        `/api/users/buygame/${userId}`,
        "PUT",
        gameId
      );
      if (response.status === 200) {
        console.log(`game successfully added to your account`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>GameDetails for game with ID: {gameId}</h1>
      <Link to={`/games/${gameId}/update`}>Update Game</Link>
      <button type="button">"Buy" Game - Will add game to your account</button>
      <Link to="/games/1/addreview">Add new review</Link>
    </>
  );
};

export default GameDetailsPage;
