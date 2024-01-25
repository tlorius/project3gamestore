import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";

function AddReviewPage() {
  const { id } = useParams();
  const gameId = id;

  const handleAddReview = async (reviewData) => {
    try {
      const payload = { ...reviewData, gameId };
      const response = await axios.post("/api/reviews", payload);

      console.log("Review added successfully:", response.data);
    } catch (error) {
      console.error("Error adding the review:", error);
    }
  };

  return (
    <div>
      <h1>Add Review</h1>
      <ReviewForm />
    </div>
  );
}

export default AddReviewPage;
