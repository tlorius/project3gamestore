import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  return isLoading ? (
    <>
      <h1>Loading...</h1>
      {/*REPLACE later with skeleton if possible or just remove the p */}
      <p>Loading Placeholder - Add Skeletons later</p>
    </>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
