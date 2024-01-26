import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { isAuthenticated, requestWithToken, userId } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [gameCount, setGameCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await requestWithToken(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const countGames = () => {
    setGameCount(user.ownedGames.length);
  };

  const countReviews = () => {
    setReviewCount(user.reviews.length);
  };

  useEffect(() => {
    if (user) {
      countGames();
      countReviews();
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    if (needsRefresh && isAuthenticated) {
      fetchUser();
      setNeedsRefresh(false);
    } else if (isAuthenticated) {
      fetchUser();
    } else {
      setUser();
    }
  }, [isAuthenticated, needsRefresh]);

  return (
    <UserContext.Provider
      value={{ user, setNeedsRefresh, gameCount, reviewCount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
