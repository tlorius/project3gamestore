import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";

const AdminDashboardPage = () => {
  const [revenue, setRevenue] = useState();
  const [couponCodes, setCouponCodes] = useState();
  const { isAuthenticated, requestWithToken } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [discountInPercent, setDiscountInPercent] = useState(10);
  const [appliesToAlreadyDiscountedGames, setAppliesToAlreadyDiscountedGames] =
    useState(true);

  const getCouponCodes = async () => {
    try {
      const allCoupons = await requestWithToken(`/discountcodes/`);
      if (allCoupons.status === 200) {
        setCouponCodes(allCoupons.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRevenues = async () => {
    try {
      const allRevenues = await requestWithToken(`/invoices/admin`);
      if (allRevenues.status === 200) {
        setRevenue(allRevenues.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createCode = async (event) => {
    event.preventDefault();
    const payload = {
      code,
      discountInPercent,
      appliesToAlreadyDiscountedGames,
    };
    if (code !== "") {
      try {
        const response = await requestWithToken(
          `/discountcodes`,
          "POST",
          payload
        );
        if (response.status === 201) {
          await getCouponCodes();
          toast.success("successfully added code");
          clearInputs();
        }
      } catch (error) {
        toast.error("failed to add code", { theme: "dark" });
      }
    }
  };

  const logstuff = () => {
    console.log(revenue);
    console.log(couponCodes);
  };

  const clearInputs = () => {
    setCode("");
    setDiscountInPercent(10);
    setAppliesToAlreadyDiscountedGames(true);
  };

  useEffect(() => {
    getCouponCodes();
    getRevenues();
  }, []);
  return isAuthenticated ? (
    <>
      <h1>admin content</h1>
      <div>
        <h3>Discount codes</h3>
        <div>
          render all codes here <div>button to delete one</div>
        </div>
        <div>
          <form onSubmit={createCode}>
            <label>
              Code:{" "}
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </label>
            <label>
              Percent off:{" "}
              <input
                type="number"
                value={discountInPercent}
                onChange={(event) => setDiscountInPercent(event.target.value)}
              />
            </label>
            <label>
              Should apply to already discounted Games:
              <input
                type="checkbox"
                checked={appliesToAlreadyDiscountedGames}
                onChange={(event) =>
                  setAppliesToAlreadyDiscountedGames(event.target.checked)
                }
              />
            </label>
            <input type="submit" value={"Add Discount Code"} />
          </form>
        </div>
      </div>
      <div>
        <h3>Revenues</h3>
        <div>
          <div>rev 1</div>
          <div>rev 2</div>
        </div>
      </div>
      <button type="button" onClick={logstuff}>
        LOG data for now
      </button>
    </>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default AdminDashboardPage;
