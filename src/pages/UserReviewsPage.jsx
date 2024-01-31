import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";

const UserReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const { requestWithToken, userId } = useContext(AuthContext);
  //const { userId } = useParams();

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
    <>
      <h1>Show all reviews a user has done</h1>
      <div>
        {reviews &&
          reviews.map((review) => {
            return (
              <Link
                to={`/games/${review.game._id}/reviews/${review._id}`}
                key={review._id}
              >
                <p>Game: {review.game.title}</p>
                <p>Comment: {review.comment}</p>
                <p>Recommended?: {review.recommend ? "✅" : "❌"}</p>
              </Link>
            );
          })}
      </div>
      <Link to="/games/1/addreview">Add new review</Link>
      {/*this wont work from here
      because we dont have a game id here, either refactor 
      to modal, or make a small selector to
      show a list of games the user owns to add a review from here */}
    </>
  );
};

export default UserReviewsPage;
