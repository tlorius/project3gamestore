import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "@mantine/core";
import classes from "../styles/GameReviews.module.css";

const GameReviewsPage = () => {
  const { gameId } = useParams();
  const [reviews, setReviews] = useState();
  const [expandedComments, setExpandedComments] = useState({}); // State to track expanded/collapsed comments

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

  const toggleCommentDisplay = (reviewId) => {
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [reviewId]: !prevExpandedComments[reviewId],
    }));
  };

  return reviews ? (
    <>
      <div className={classes.pageCtn}>
        {reviews.map((review) => {
          return (
            <div key={review._id}>
              <div>
                <div className={classes.reviewCtn}>
                  <div className={classes.oneReview}>
                    <p className={classes.recommended}>
                      Recommended?: {review.recommend ? "✅" : "❌"}
                    </p>
                    <p className={classes.commentTag}>Comment:</p>
                    {expandedComments[review._id] ? (
                      <p className={classes.reviewComments}>{review.comment}</p>
                    ) : (
                      <p className={classes.reviewComments}>
                        {review.comment.length > 800
                          ? review.comment.substring(0, 800) + "..."
                          : review.comment}
                      </p>
                    )}
                    {review.comment && review.comment.length > 800 && (
                      <button
                        onClick={() => toggleCommentDisplay(review._id)}
                        className={classes.readMoreButton}
                      >
                        {expandedComments[review._id]
                          ? "Show Less"
                          : "Read More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
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
