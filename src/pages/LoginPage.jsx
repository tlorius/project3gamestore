import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import classes from "../styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={classes.authFormCtn}>
        <h1 className={classes.loginHeader}>Login</h1>
        <AuthForm isLogin />
      </div>
    </>
  );
};

export default LoginPage;
