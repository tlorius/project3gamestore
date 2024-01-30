import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import { Paper, Text } from "@mantine/core";

const AdminDashboardPage = () => {
  const { isAuthenticated, requestWithToken } = useContext(AuthContext);
  const [revenue, setRevenue] = useState();
  const [couponCodes, setCouponCodes] = useState([]);
  const [code, setCode] = useState("");
  const [discountInPercent, setDiscountInPercent] = useState(10);
  const [appliesToAlreadyDiscountedGames, setAppliesToAlreadyDiscountedGames] =
    useState(true);
  const [userNameToFind, setUserNameToFind] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [rolesOfUser, setRolesOfUser] = useState([]);
  const [userNameToDisplay, setUserNameToDisplay] = useState("");

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

  const deleteCoupon = async (codeId) => {
    try {
      const response = await requestWithToken(
        `/discountcodes/${codeId}`,
        "DELETE"
      );
      if (response.status === 204) {
        await getCouponCodes();
        toast.success("successfully deleted code");
      }
    } catch (error) {
      toast.error("failed to delete code", { theme: "dark" });
    }
  };

  const findUserByUserName = async (event) => {
    event.preventDefault();
    try {
      const response = await requestWithToken(
        `/users/roles/${userNameToFind.trim()}`
      );
      if (response.status === 200) {
        setUserIdToUpdate(response.data.id);
        setRolesOfUser(response.data.roles);
        setUserNameToDisplay(response.data.username);
        toast.success("successfully retrieved userdata");
      }
    } catch (error) {
      toast.error("failed to fetch user");
    }
  };

  const clearInputs = () => {
    setCode("");
    setDiscountInPercent(10);
    setAppliesToAlreadyDiscountedGames(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getCouponCodes();
      getRevenues();
    }
  }, [isAuthenticated]);
  return isAuthenticated ? (
    <>
      <h1>admin content</h1>
      <div>
        <h3>Discount Codes</h3>
        <p>name - discount % - applies to already discounted games? - delete</p>
        <div>
          {couponCodes &&
            couponCodes.map((dcode) => {
              return (
                <div key={dcode._id}>
                  {dcode.code} - {dcode.discountInPercent}% -{" "}
                  {dcode.appliesToAlreadyDiscountedGames ? "✅" : "❌"}
                  <button type="button" onClick={() => deleteCoupon(dcode._id)}>
                    x
                  </button>
                </div>
              );
            })}
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
        <div>
          <form onSubmit={findUserByUserName}>
            <label>
              Username:{" "}
              <input
                type="text"
                value={userNameToFind}
                onChange={(event) => setUserNameToFind(event.target.value)}
              />
            </label>
            <input type="submit" value={"Find user"} />
          </form>
          {userIdToUpdate && (
            <>
              <h4>{userNameToDisplay}</h4>
              <p>{userIdToUpdate}</p>
              <p>{rolesOfUser.map((role) => role + " ")}</p>
            </>
          )}
        </div>
      </div>
      {revenue && (
        <Paper shadow="xs" p="xl" bg={"grey"}>
          <Text>Revenues</Text>
          <Text>Total Revenue: {(revenue.sumAllTime / 100).toFixed(2)}€</Text>
          <Text>
            Revenue in the last 30 days:{" "}
            {(revenue.sumThirtyDays / 100).toFixed(2)}€
          </Text>
        </Paper>
      )}
    </>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default AdminDashboardPage;
