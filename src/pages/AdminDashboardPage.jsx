import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import classes from "../styles/AdminDashboardPage.module.css";

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
          toast.success("💸Successfully added code");
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
        toast.success("🔥Successfully deleted code");
      }
    } catch (error) {
      toast.error("Failed to delete code", { theme: "dark" });
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
        toast.success("Successfully retrieved userdata");
      }
    } catch (error) {
      toast.error(
        "Failed to fetch user - you may still edit the previously fetched user"
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
        toast.success("😎👍Updated users roles");
      }
    } catch (error) {
      toast.error("🥶 Unable to udpate roles");
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
      <div className={classes.adminPageCtn}>
        <h1 className={classes.adminDashTitle}>Admin Dashboard</h1>
        <div className={classes.dashBodyCtn}>
          <div className={classes.discountDashCtn}>
            <h3 className={classes.sectionHeader}>Discount Codes</h3>
            <p className={classes.discListTitle}>
              <span>Name</span>
              <span>Discount in %</span>
              <span>Applies to already discounted games?</span>
              <span>Delete</span>
            </p>
            {couponCodes &&
              couponCodes.map((dcode) => {
                return (
                  <div className={classes.discListItem} key={dcode._id}>
                    <span>{dcode.code}</span>
                    <span>{dcode.discountInPercent}%</span>
                    <span className={classes.revTxt}>
                      {dcode.appliesToAlreadyDiscountedGames ? "✅" : "❌"}
                    </span>
                    <span>
                      <button
                        type="button"
                        onClick={() => deleteCoupon(dcode._id)}
                      >
                        x
                      </button>
                    </span>
                  </div>
                );
              })}
            <form className={classes.createCodeForm} onSubmit={createCode}>
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
          <div className={classes.roleDashCtn}>
            <h4 className={classes.sectionHeader}>Permission Manager</h4>
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
                <div className={classes.permissionNameCtn}>
                  <h4>Username: {userNameToDisplay}</h4>
                  <p>ID: {userIdToUpdate}</p>
                </div>

                <form className={classes.roleForm} onSubmit={updateRolesOfUser}>
                  <label>
                    <input
                      type="checkbox"
                      checked={enduserRole}
                      onChange={(event) => setEnduserRole(event.target.checked)}
                    />{" "}
                    ENDUSER
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={gameDevRole}
                      onChange={(event) => setGameDevRole(event.target.checked)}
                    />{" "}
                    GAMEDEVELOPER
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={adminRole}
                      onChange={(event) => setAdminRole(event.target.checked)}
                    />{" "}
                    ADMIN
                  </label>
                  <input type="submit" value={"Update Roles"} />
                </form>
              </>
            )}
          </div>
          <div className={classes.revenueDashCtn}>
            {revenue && (
              <div>
                <h4 className={classes.sectionHeader}>Revenues</h4>
                <p className={classes.revTxt}>
                  <span className={classes.boldTxt}>Total Revenue: </span>
                  {(revenue.sumAllTime / 100).toFixed(2)}€
                </p>
                <p className={classes.revTxt}>
                  <span className={classes.boldTxt}>
                    Revenue in the last 30 days:
                  </span>{" "}
                  {(revenue.sumThirtyDays / 100).toFixed(2)}€
                </p>
              </div>
            )}
          </div>
          <div className={classes.invoicesDashCtn}>
            <h4 className={classes.sectionHeader}>Recent Invoices</h4>
            <p className={classes.invHeader}>
              <span>User</span>
              <span>Items</span>
              <span>Total</span>
              <span>Discount</span>
            </p>
            {lastInvoices &&
              lastInvoices.map((invoice) => (
                <div className={classes.invItem} key={invoice._id}>
                  <span> {invoice.createdBy}</span>
                  <span>{invoice.items}</span>
                  <span>
                    {(invoice.totalInEuroCentAfterDiscount / 100).toFixed(2)}€
                  </span>
                  <span>{invoice.discountCodePercentage}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  );
};

export default AdminDashboardPage;
