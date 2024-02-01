// ReviewForm.jsx
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import classes from "../styles/ReviewForm.module.css";

const ReviewForm = ({ reviewData = null, isUpdate = false }) => {
  const { requestWithToken } = useContext(AuthContext);
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);

  useEffect(() => {
    if (isUpdate && reviewData) {
      setContent(reviewData.content);
      setIsRecommended(reviewData.recommend === "Recommended");
    }
  }, [reviewData, isUpdate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      comment: content,
      recommend: isRecommended,
    };

    try {
      const endpoint = isUpdate
        ? `/reviews/${reviewData._id}`
        : `/reviews/${gameId}`;
      const method = isUpdate ? "PUT" : "POST";
      const response = await requestWithToken(endpoint, method, payload);

      if (response.status === 201 || response.status === 200) {
        navigate(`/games/${gameId}/reviews/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  return (
    <div className={classes.pageCtn}>
      <form onSubmit={handleSubmit} className={classes.formCtn}>
        <label>
          <h2 className={classes.reviewTitle}>
            {isUpdate ? "Update" : "Add"} your review
          </h2>
          <textarea
            className={classes.textArea}
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <div className={classes.bottomText}>
          <label>
            Recommend this game?
            <input
              type="checkbox"
              checked={isRecommended}
              onChange={() => setIsRecommended(!isRecommended)}
            />
          </label>
          <input
            className={classes.addUpdateButton}
            type="submit"
            value={isUpdate ? "Update Review" : "Add Review"}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
