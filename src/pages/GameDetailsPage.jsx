import { Link, useParams } from "react-router-dom";

const GameDetailsPage = () => {
  const { gameId } = useParams();
  return (
    <>
      <h1>GameDetails for game with ID: {gameId}</h1>
      <Link to={`/games/${gameId}/update`}>Update Game</Link>
      <Link to="/games/1/addreview">Add new review</Link>
    </>
  );
};

export default GameDetailsPage;
