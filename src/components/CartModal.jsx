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
          />{" "}
          <span className={classes.cartBtnText}>[{cartCount}]</span>
        </button>
      )}
      <Modal opened={opened} onClose={close} title="Shopping Cart">
        <h2>Total Items: {cartCount}</h2>
        <hr />
        <div>
          {user.cart.map((item) => (
            <div className={classes.cartItem} key={item._id}>
              <h4>{item.title} </h4>
              <span>
                {(
                  (item.price * (1 - item.discountInPercent / 100)) /
                  100
                ).toFixed(2)}
                €{" "}
                <button
                  className={classes.removeCartBtn}
                  onClick={() => removeGameFromAccount("cart", item._id)}
                >
                  x
                </button>
              </span>
            </div>
          ))}
        </div>
        <hr />
        <div className={classes.bottomCtn}>
          <h4>Total: {(cartTotalBeforeDiscount / 100).toFixed(2)}€</h4>
          <button
            className={classes.checkoutBtn}
            onClick={handleCheckoutRedirect}
          >
            CHECKOUT
          </button>
        </div>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default CartModal;
