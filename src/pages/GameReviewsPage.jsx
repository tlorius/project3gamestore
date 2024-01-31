import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "@mantine/core";

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
              <p>Recommended?: {review.recommend ? "✅" : "❌"}</p>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default GameReviewsPage;
