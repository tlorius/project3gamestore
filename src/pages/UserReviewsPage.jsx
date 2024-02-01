import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import classes from "../styles/UserReviews.module.css";

const UserReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const { requestWithToken, userId } = useContext(AuthContext);

  const fetchReviewsByUser = async () => {
    try {
      const response = await requestWithToken(`/reviews/user/${userId}`, "GET");
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviewsByUser();
  }, [userId]);

  const toggleCommentDisplay = (reviewId) => {
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [reviewId]: !prevExpandedComments[reviewId],
    }));
  };

  return (
    <div className={classes.pageCtn}>
      <h1 className={classes.titleText}>ALL YOUR REVIEWS</h1>
      <div className={classes.reviewCtn}>
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className={classes.oneReview}>
              <Link to={`/games/${review.game._id}/reviews/${review._id}`}>
                <div className={classes.imageContainer}>
                  {review.game.imageUrl && (
                    <img
                      src={review.game.imageUrl}
                      alt={`Image for ${review.game.title}`}
                      className={classes.gameImage}
                    />
                  )}
                </div>
              </Link>
              <div className={classes.reviewDetails}>
                <Link
                  className={classes.gameTitle}
                  to={`/games/${review.game._id}/reviews/${review._id}`}
                >
                  <span>{review.game.title}</span>
                </Link>
                <div className={classes.reviewStats}>
                  <p className={classes.recommended}>
                    Recommended?: {review.recommend ? "✅" : "❌"}
                  </p>
                  <div>
                    {expandedComments[review._id] ? (
                      <p className={classes.reviewComment}>{review.comment}</p>
                    ) : (
                      <p className={classes.reviewComment}>

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
          ))}
      </div>
    </div>
  );
};

export default UserReviewsPage;
