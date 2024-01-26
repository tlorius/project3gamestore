import { useParams } from "react-router-dom";

const GameReviewsPage = () => {
  const { gameId } = useParams();
  return (
    <>
      <h1>Shows all reviews for a game</h1>
    </>
  );
};

export default GameReviewsPage;
