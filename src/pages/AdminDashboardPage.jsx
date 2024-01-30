import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";

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
  const [userNameToDisplay, setUserNameToDisplay] = useState("");
  const [adminRole, setAdminRole] = useState(false);
  const [gameDevRole, setGameDevRole] = useState(false);
  const [enduserRole, setEnduserRole] = useState(false);
  const [lastInvoices, setLastInvoices] = useState([]);

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

  const getInvoices = async () => {
    try {
      const response = await requestWithToken(`/invoices`);
      if (response.status === 200) {
        setLastInvoices(response.data);
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
        setUserNameToDisplay(response.data.username);
        assignRoleCheckboxes(response.data.roles);
        toast.success("successfully retrieved userdata");
      }
    } catch (error) {
      toast.error(
        "failed to fetch user - you may still edit the previously fetched user"
      );
    }
  };

  const assignRoleCheckboxes = (roles) => {
    setAdminRole(roles.includes("ADMIN"));
    setGameDevRole(roles.includes("GAMEDEVELOPER"));
    setEnduserRole(roles.includes("ENDUSER"));
  };

  const updateRolesOfUser = async (event) => {
    event.preventDefault();
    //construct array of roles to send first
    const newRoles = [];
    adminRole && newRoles.push("ADMIN");
    gameDevRole && newRoles.push("GAMEDEVELOPER");
    enduserRole && newRoles.push("ENDUSER");
    try {
      const response = await requestWithToken(
        `/users/roles/${userIdToUpdate}`,
        "PUT",
        { newRoles }
      );
      if (response.status === 200) {
        assignRoleCheckboxes(response.data);
        toast.success("Updated users roles");
      }
    } catch (error) {
      toast.error("unable to udpate roles");
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
      getInvoices();
    }
  }, [isAuthenticated]);
  return isAuthenticated ? (
    <>
      <h1>Admin Dashboard</h1>
      <h3>Discount Codes</h3>
      <p>name - discount % - applies to already discounted games? - delete</p>
      <div>
        {couponCodes &&
          couponCodes.map((dcode) => {
            return (
              <div key={dcode._id}>
                {dcode.code} - {dcode.discountInPercent}% -{" - "}
                {dcode.appliesToAlreadyDiscountedGames ? "✅" : "❌"}
                <button type="button" onClick={() => deleteCoupon(dcode._id)}>
                  x
                </button>
              </div>
            );
          })}
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
            <h4>Username: {userNameToDisplay}</h4>
            <p>ID: {userIdToUpdate}</p>
            <form onSubmit={updateRolesOfUser}>
              <label>
                ENDUSER{" "}
                <input
                  type="checkbox"
                  checked={enduserRole}
                  onChange={(event) => setEnduserRole(event.target.checked)}
                />
              </label>
              <label>
                GAMEDEVELOPER{" "}
                <input
                  type="checkbox"
                  checked={gameDevRole}
                  onChange={(event) => setGameDevRole(event.target.checked)}
                />
              </label>
              <label>
                ADMIN{" "}
                <input
                  type="checkbox"
                  checked={adminRole}
                  onChange={(event) => setAdminRole(event.target.checked)}
                />
              </label>
              <input type="submit" value={"Update Roles"} />
            </form>
          </>
        )}
      </div>
      {revenue && (
        <div>
          <h4>Revenues</h4>
          <p>Total Revenue: {(revenue.sumAllTime / 100).toFixed(2)}€</p>
          <p>
            Revenue in the last 30 days:{" "}
            {(revenue.sumThirtyDays / 100).toFixed(2)}€
          </p>
        </div>
      )}
      <h4>Recent Invoices</h4>
      <p>User - Items - Total - Discount</p>
      {lastInvoices &&
        lastInvoices.map((invoice) => (
          <div key={invoice._id}>
            <p>
              {invoice.createdBy} - {invoice.items} -{" "}
              {(invoice.totalInEuroCentAfterDiscount / 100).toFixed(2)}€ -{" "}
              {invoice.discountCodePercentage}%
            </p>
          </div>
        ))}
    </>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default AdminDashboardPage;
