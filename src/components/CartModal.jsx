import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";

const CartModal = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { user, cartCount } = useContext(UserContext);
  return isAuthenticated ? (
    <>
      <p>Cart: {cartCount}</p>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default CartModal;
