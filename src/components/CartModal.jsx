import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";

const CartModal = () => {
  const { isAuth } = useContext(AuthContext);
  const { user, cartCount } = useContext(UserContext);
  return isAuth ? (
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
