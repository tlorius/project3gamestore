import React, { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";

function UpdateReviewPage({ match }) {
  const [reviewData, setReviewData] = useState(null);
  const reviewId = match.params.id;

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`/api/reviews/${reviewId}`);
        setReviewData(response.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleUpdateReview = async (updatedReviewData) => {
    try {
      await axios.put(`/api/reviews/${reviewId}`, updatedReviewData);
    } catch (error) {
      console.error("Error updating the review:", error);
    }
  };

  return (
    <div>
      <h1>Update Review</h1>
      {reviewData && <ReviewForm reviewData={reviewData} isUpdate />}
    </div>
  );
}

export default UpdateReviewPage;
