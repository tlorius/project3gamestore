import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { isAuthenticated, requestWithToken, userId } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [gameCount, setGameCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await requestWithToken(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeGameFromWishlist = async (gameId) => {
    if (isAuthenticated) {
      try {
        const response = await requestWithToken(
          `/users/removewishlistgame/${userId}`,
          "PUT",
          { gameToRemove: gameId }
        );
        if (response.status === 200) {
          toast(
            `😒👍 game removed from your wishlist"
            }`,
            {
              theme: "dark",
              autoClose: 3000,
            }
          );
          setNeedsRefresh(true);
        }
      } catch (error) {
        toast("😒 you dont have this game wishlisted", {
          theme: "dark",
          autoClose: 3000,
        });
        console.log(error);
      }
    } else {
      console.error("please log in");
    }
  };

  const countGames = () => {
    setGameCount(user.ownedGames.length);
  };

  const countReviews = () => {
    setReviewCount(user.reviews.length);
  };

  const countWishlist = () => {
    setWishlistCount(user.wishlistedGames.length);
  };

  useEffect(() => {
    if (user) {
      countGames();
      countReviews();
      countWishlist();
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
      value={{
        user,
        setNeedsRefresh,
        gameCount,
        reviewCount,
        wishlistCount,
        removeGameFromWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
