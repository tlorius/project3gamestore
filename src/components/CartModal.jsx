import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const CartModal = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { user, cartCount } = useContext(UserContext);
  const [opened, { open, close }] = useDisclosure();

  return isAuthenticated ? (
    <>
      {/*first div is the image of the cart, on hover the modal should open */}
      {cartCount === 0 ? (
        <></>
      ) : (
        <button type="button" onClick={open}>
          CART [{cartCount}]
        </button>
      )}
      <Modal opened={opened} onClose={close} title="Cart">
        <h2>Total Items: {cartCount}</h2>
        <div>Display some of the items</div>
        <button>CHECKOUT</button>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default CartModal;
