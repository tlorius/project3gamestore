import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "../styles/CartModal.module.css";

import shoppingcart from "../assets/shoppingcart.svg";

const CartModal = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { user, cartCount, removeGameFromAccount, cartTotalBeforeDiscount } =
    useContext(UserContext);
  const [opened, { open, close }] = useDisclosure();

  const navigate = useNavigate();

  const handleCheckoutRedirect = () => {
    close();
    navigate("/checkout");
  };

  return isAuthenticated && user ? (
    <>
      {/*first div is the image of the cart, on CLICK the modal should open */}
      {cartCount === 0 ? (
        <></>
      ) : (
        <button type="button" onClick={open} className={classes.cartBtn}>
          <img
            className={classes.cartBtnImg}
            src={shoppingcart}
            alt="shopping cart"
          />
          CART [{cartCount}]
        </button>
      )}
      <Modal opened={opened} onClose={close} title="Cart">
        <h2>Total Items: {cartCount}</h2>
        <div>
          {user.cart.map((item) => (
            <div key={item._id}>
              <h4>
                {item.title} -{" "}
                {(
                  (item.price * (1 - item.discountInPercent / 100)) /
                  100
                ).toFixed(2)}
                €
              </h4>
              <button onClick={() => removeGameFromAccount("cart", item._id)}>
                x
              </button>
            </div>
          ))}
        </div>
        <h4>Total: {(cartTotalBeforeDiscount / 100).toFixed(2)}€</h4>
        <button onClick={handleCheckoutRedirect}>CHECKOUT</button>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default CartModal;
