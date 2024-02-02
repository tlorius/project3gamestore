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
  const [cartCount, setCartCount] = useState(0);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [cartTotalBeforeDiscount, setCartTotalBeforeDiscount] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await requestWithToken(`/users/${userId}`);
      setUser(response.data);
      setNeedsRefresh(false);
    } catch (error) {
      console.error(error);
    }
  };

  //takes 2 values "wishlist", "cart" and ID
  const removeGameFromAccount = async (whereToRemove, gameId) => {
    let toastText = "";
    let urlVariable = "";
    switch (whereToRemove) {
      case "wishlist":
        toastText = "Game removed from your Wishlist!";
        urlVariable = "removewishlistgame";
        break;
      case "cart":
        toastText = "Game removed from your Shopping Cart!";
        urlVariable = "removefromcart";
        break;
    }
    if (isAuthenticated) {
      try {
        const response = await requestWithToken(
          `/users/${urlVariable}/`,
          "PUT",
          { gameToRemove: gameId }
        );
        if (response.status === 200) {
          toast(
            `😒👍 ${toastText}
            `,
            {
              theme: "dark",
              autoClose: 3000,
            }
          );
          setNeedsRefresh(true);
        }
      } catch (error) {
        toast("😒 Unable to remove this game", {
          theme: "dark",
          autoClose: 3000,
        });
        console.log(error);
      }
    } else {
      console.error("please log in");
    }
  };

  //pass one of 3 values - "wishlist, cart, buyfree"
  const addGameToAccount = async (whereToAdd, gameId) => {
    let toastText = "";
    let urlVariable = "";
    switch (whereToAdd) {
      case "wishlist":
        toastText = "Game added to your Wishlist!";
        urlVariable = "wishlistgame";
        break;
      case "buyfree":
        toastText = "Free Game added to your account!";
        urlVariable = "buygame";
        break;
      case "cart":
        toastText = "Game added to your Shopping Cart!";
        urlVariable = "addtocart";
        break;
    }
    if (isAuthenticated) {
      try {
        const response = await requestWithToken(
          `/users/${urlVariable}`,
          "PUT",
          { gameToAdd: gameId }
        );
        if (response.status === 200) {
          toast(`😎👍  ${toastText}`, {
            theme: "dark",
            autoClose: 3000,
          });
          setNeedsRefresh(true);
        }
      } catch (error) {
        //for now just throwing this for every error- lol just keep it
        toast("😒 Unable to add game again", {
          theme: "dark",
          autoClose: 3000,
        });
      }
    } else {
      //replace with actual error handling
      toast.error("Failed to add game");
    }
  };

  const calculateCartTotal = () => {
    if (user && user.cart.length > 0) {
      const total = user.cart.reduce((total, item) => {
        return total + item.price * (1 - item.discountInPercent / 100);
      }, 0);
      setCartTotalBeforeDiscount(total);
    }
  };

  const countUserLists = () => {
    setGameCount(user.ownedGames.length);
    setReviewCount(user.reviews.length);
    setWishlistCount(user.wishlistedGames.length);
    setCartCount(user.cart.length);
    calculateCartTotal();
  };

  useEffect(() => {
    if (user) {
      countUserLists();
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
        cartCount,
        removeGameFromAccount,
        addGameToAccount,
        cartTotalBeforeDiscount,
        calculateCartTotal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
