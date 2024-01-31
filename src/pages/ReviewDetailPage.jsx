import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import axios from "axios";

const ReviewDetailPage = () => {
  const [review, setReview] = useState({});
  const { gameId, reviewId } = useParams();
  const { requestWithToken } = useContext(AuthContext);
  const [game, setGame] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews/${reviewId}`
        );
        if (response.status === 200) {
          setReview(response.data);
        } else {
          console.error("Failed to fetch review:", response);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/games/${gameId}`
        );
        if (response.status === 200) {
          setGame(response.data);
        } else {
          console.error("Failed to fetch game:", response);
        }
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchReview();
    fetchGame();
  }, [gameId, reviewId]);

  const handleDeleteReview = async () => {
    try {
      const response = await requestWithToken(`/reviews/${reviewId}`, "DELETE");

      if (response.status === 204) {
        console.log("Review deleted successfully:", response.data);
        navigate("/");
      } else {
        console.error("Failed to delete review:", response.status);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h1>Review Details</h1>
      {review && (
        <div>
          <p>{review.comment}</p>
          <p>Recommended: {review.recommend ? "✅" : "❌"}</p>
          {game && (
            <>
              <img src={game.imageUrl} alt={game.title} />
              <h2>{game.title}</h2>
              <Link to={`/games/${game._id}`}>View Game Details</Link>
            </>
          )}
          <Link to={`/games/${game._id}/updatereview/${reviewId}`}>
            Update review
          </Link>
          <button onClick={handleDeleteReview}>Delete Review</button>
        </div>
      )}
    </div>
  );
};

export default ReviewDetailPage;
