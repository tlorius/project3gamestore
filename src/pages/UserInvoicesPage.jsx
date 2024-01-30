import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { UserContext } from "../providers/UserContext";

const UserInvoicesPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  return isAuthenticated ? (
    <>
      <h1>All invoices of a user</h1>
      <Link to="/invoices/1">actually using a modal so scratch that</Link>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default UserInvoicesPage;
