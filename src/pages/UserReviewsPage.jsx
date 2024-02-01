import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import classes from "../styles/UserReviews.module.css";

const UserReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
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

  return (
    <div className={classes.pageCtn}>
      <h1 className={classes.titleText}>ALL YOUR REVIEWS</h1>
      <div className={classes.reviewCtn}>
        {reviews &&
          reviews.map((review) => {
            return (
              <Link
                className={classes.oneReview}
                to={`/games/${review.game._id}/reviews/${review._id}`}
                key={review._id}
              >
                <div className={classes.oneReview}>
                  {" "}
                  <p>Game: {review.game.title}</p>
                  <div>
                    {" "}
                    <p>Recommended?: {review.recommend ? "✅" : "❌"}</p>
                    <p>Comment: {review.comment}</p>{" "}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>{" "}
    </div>
  );
};

export default UserReviewsPage;
