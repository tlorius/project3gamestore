import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";

const ReviewDetailPage = () => {
  const [review, setReview] = useState([]);
  const { gameId, reviewId } = useParams();
  const { requestWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await requestWithToken(`/reviews/${reviewId}`, "GET");
        if (response && response.status === 200) {
          setReview(response.data);
        } else {
          console.error("Failed to fetch review:", response);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    /*     const fetchGameId = async () => {
        try {
            axios.get(`/games/${gameId}`);
        }
    }; */

    fetchReview();
  }, [reviewId]);

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
      <div>
        other detail will be added later
        <p>{review.comment}</p>
        <button onClick={() => handleDeleteReview(review._id)}>
          Delete Review
        </button>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
