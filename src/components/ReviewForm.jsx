// ReviewForm.jsx
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";

const ReviewForm = ({ reviewData = null, isUpdate = false }) => {
  const { requestWithToken } = useContext(AuthContext);
  const { gameId } = useParams();
  const [content, setContent] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);

  useEffect(() => {
    if (isUpdate && reviewData) {
      setContent(reviewData.content);
      setIsRecommended(reviewData.isRecommended);
    }
  }, [reviewData, isUpdate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      content,
      isRecommended,
      gameId,
    };

    try {
      const endpoint = `/api/reviews${isUpdate ? `/${reviewData._id}` : ""}`;
      const method = isUpdate ? "PUT" : "POST";
      const response = await requestWithToken(endpoint, method, payload);

      if (response.status === 201 || response.status === 200) {
        console.log(
          isUpdate
            ? "Review updated successfully"
            : "Review added successfully",
          response.data
        );
      }
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  return (
    <div>
      <h2>Form to {isUpdate ? "update" : "add"} review</h2>
      <form onSubmit={handleSubmit} className={classes.formCtn}>
        <label>
          Review Content
          <textarea
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <label>
          Recommend this game?
          <input
            type="checkbox"
            checked={isRecommended}
            onChange={() => setIsRecommended(!isRecommended)}
          />
        </label>
        <input
          type="submit"
          value={isUpdate ? "Update Review" : "Add Review"}
        />
      </form>
    </div>
  );
};

export default ReviewForm;
