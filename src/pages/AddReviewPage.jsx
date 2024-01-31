import React from "react";
import ReviewForm from "../components/ReviewForm";

const AddReviewPage = () => {
  return (
    <>
      <h1>Add New Review</h1>
      <ReviewForm isUpdate={false} />
    </>
  );
};

export default AddReviewPage;
