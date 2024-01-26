import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GameReviewsPage = () => {
  const { gameId } = useParams();
  const [reviews, setReviews] = useState();

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/game/${gameId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  return reviews ? (
    <>
      <h1>Shows all reviews for a game</h1>
      <div>
        {reviews.map((review) => {
          return (
            <div key={review._id}>
              <p>Comment: {review.comment}</p>
              <p>Recommended?: {review.recommend ? "YES" : "NO"}</p>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default GameReviewsPage;
