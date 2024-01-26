import { createContext } from "react";

export const ReviewsContext = createContext();

const ReviewsContextProvider = ({ children }) => {
  const test = "test";
  return (
    <ReviewsContext.Provider value={{ test }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsContextProvider;
