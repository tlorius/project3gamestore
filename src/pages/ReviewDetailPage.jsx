import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import axios from "axios";
import classes from "../styles/ReviewDetails.module.css";

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
    <div className={classes.pageCtn}>
      <h1 className={classes.pageTitle}>YOUR REVIEW</h1>
      {review && (
        <div className={classes.reviewCtn}>
          <Link to={`/games/${game._id}`}>
            <img src={game.imageUrl} alt={game.title} />
          </Link>
          <div className={classes.reviewContent}>
            <div className={classes.createrInfo}>
              <div className={classes.titleHeader}>
                <h2 className={classes.reviewGameTitle}>{game.title}</h2>
                <button
                  className={classes.deleteReviewButton}
                  onClick={handleDeleteReview}
                >
                  Delete Review
                </button>
                <Link to={`/games/${game._id}/updatereview/${reviewId}`}>
                  <button className={classes.updateReviewButton}>
                    Update review{" "}
                  </button>
                </Link>
              </div>
              <p>
                Publisher:{" "}
                <span className={classes.highlighted}>{game.publisher} </span>
              </p>
              <p>
                Developer:{" "}
                <span className={classes.highlighted}>{game.developer}</span>
              </p>
            </div>
            <p className={classes.recommended}>
              Recommended: {review.recommend ? "✅" : "❌"}
            </p>
            <div className={classes.reviewComment}>
              <span>{review.comment}</span>
            </div>
          </div>
          <div className={classes.reviewActionButton}>
            {game && (
              <>
                {" "}
                <Link
                  className={classes.gameDetailsButton}
                  to={`/games/${game._id}`}
                >
                  View Game Details
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewDetailPage;
