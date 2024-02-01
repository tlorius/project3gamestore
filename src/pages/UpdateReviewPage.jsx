import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { AuthContext } from "../providers/AuthContext";
import classes from "../styles/ReviewForm.module.css";

const UpdateReviewPage = () => {
  const { gameId, reviewId } = useParams();
  const [reviewData, setReviewData] = useState(null);
  const { requestWithToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await requestWithToken(`/reviews/${reviewId}`, "GET");

        if (response.status === 200) {
          setReviewData(response.data);
        } else {
          console.error("Failed to fetch review data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [gameId, reviewId, requestWithToken]);

  return (
    <div className={classes.pageCtn}>
      {reviewData ? (
        <ReviewForm
          className={classes.reviewCommentBox}
          reviewData={reviewData}
          isUpdate={true}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateReviewPage;
