import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewForm = ({ reviewData = null, gameId, isUpdate = false }) => {
  const [content, setContent] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);

  useEffect(() => {
    if (reviewData) {
      setContent(reviewData.content);
      setIsRecommended(reviewData.isRecommended);
    }
  }, [reviewData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      gameId,
      content,
      isRecommended,
    };

    try {
      if (isUpdate) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/reviews/${reviewData._id}`,
          payload
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/reviews`,
          payload
        );
      }
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Review
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
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
      <button type="submit">{isUpdate ? "Update Review" : "Add Review"}</button>
    </form>
  );
};

export default ReviewForm;
