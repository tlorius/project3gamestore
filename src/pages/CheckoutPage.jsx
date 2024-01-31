import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Loader } from "@mantine/core";


const CheckoutPage = () => {
  const { userId, requestWithToken, isAuthenticated, setTotalRevenue } =
    useContext(AuthContext);
  const {
    user,
    setNeedsRefresh,
    removeGameFromAccount,
    cartTotalBeforeDiscount,
  } = useContext(UserContext);
  const [discountCode, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [appliedCode, setAppliedCode] = useState(null);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);

  const navigate = useNavigate();

  const validateDiscountCode = async (event) => {
    event.preventDefault();
    //display error if code is invalid
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/discountcodes/validate`,
        { discountcode: discountCode.trim() }
      );
      if (response.status === 200) {
        setAppliedCode(response.data);
        setDiscountCode("");
      }
    } catch (error) {
      setErrorMessage("Invalid Code");
      setDiscountCode("");
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 3000);
    }
  };

  const calculateTotalWithCode = () => {
    if (user && user.cart.length > 0) {
      const totalAfterDisc = user.cart.reduce((total, item) => {
        let priceToAdd;
        // case no discount
        if (item.discountInPercent === 0 && !appliedCode.discountInPercent) {
          priceToAdd = item.price;
        }
        // case only item OR both but doesnt apply
        if (
          item.discountInPercent > 0 &&
          (!appliedCode.discountInPercent ||
            !appliedCode.appliesToAlreadyDiscountedGames)
        ) {
          priceToAdd = item.price * (1 - item.discountInPercent / 100);
        }
        // case only code
        if (item.discountInPercent === 0 && appliedCode.discountInPercent > 0) {
          priceToAdd = item.price * (1 - appliedCode.discountInPercent / 100);
        }
        // case BOTH , compound discounting => first applying game specific discount, then applying the code
        if (
          item.discountInPercent > 0 &&
          appliedCode.discountInPercent > 0 &&
          appliedCode.appliesToAlreadyDiscountedGames
        ) {
          priceToAdd =
            item.price *
            (1 - item.discountInPercent / 100) *
            (1 - appliedCode.discountInPercent / 100);
        }

        return total + priceToAdd;
      }, 0);
      setFinalTotalPrice(totalAfterDisc);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    removeGameFromAccount("cart", itemId);
    calculateTotalWithCode();
  };

  useEffect(() => {
    if (user && appliedCode !== null) calculateTotalWithCode();
  }, [user, appliedCode]);

  //function to create order and invoice on backend // mocks payment process as we obviously can't charge customers here
  const handlePurchase = async () => {
    //filtering out games the user already ownes
    const gamesToPurchase = user.cart.map((item) => item._id);
    const ownedGameIds = user.ownedGames.map((item) => item._id);
    const filteredGamesToPurchase = gamesToPurchase.filter(
      (id) => !ownedGameIds.includes(id)
    );
    const purchasePayload = {
      games: filteredGamesToPurchase,
      discountCode: appliedCode ? appliedCode.code : "",
    };
    try {
      const orderResponse = await requestWithToken(
        `/orders/processpurchase`,
        "POST",
        purchasePayload
      );
      if (orderResponse.status === 200) {
        try {
          const invoiceResponse = await requestWithToken(
            `/invoices/fulfillinvoice/${orderResponse.data._id}`,
            "POST"
          );
          if (invoiceResponse.status === 200) {
            setNeedsRefresh(true);
            toast.success("purchase completed successfully", { theme: "dark" });
            navigate(`/profile/${userId}`);
            setRevenueAllTime(updatedRevenueAllTime);
          }
        } catch (error) {
          console.log(error, "issue with creating invoice");
        }
      }
    } catch (error) {
      console.log(error, "issue with order");
    }
  };

  return isAuthenticated && user ? (
    <>
      <h1>Checkout</h1>
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
            <button onClick={() => handleRemoveFromCart(item._id)}>x</button>
          </div>
        ))}
      </div>
      <form onSubmit={validateDiscountCode}>
        <label>
          Enter Discount Code:{" "}
          <input
            type="text"
            value={discountCode}
            onChange={(event) => setDiscountCode(event.target.value)}
          />
        </label>
        {displayError && <div>{errorMessage}</div>}
        <input type="submit" value={"Apply Code"} />
      </form>
      <h4>Total: {(cartTotalBeforeDiscount / 100).toFixed(2)}€</h4>
      {appliedCode && (
        <>
          <p>Currently applied discount: {appliedCode.discountInPercent}%</p>
          <h4>Total after discount: {(finalTotalPrice / 100).toFixed(2)}€</h4>
        </>
      )}
      <button type="button" onClick={handlePurchase}>
        COMPLETE ORDER
      </button>
    </>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default CheckoutPage;
