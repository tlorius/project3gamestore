import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  return isLoading ? (
    <>
      <Loader color="blue" size="xl" type="dots" />
    </>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
