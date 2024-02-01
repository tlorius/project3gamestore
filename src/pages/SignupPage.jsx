import AuthForm from "../components/AuthForm";
import classes from "../styles/SignupPage.module.css";

const SignupPage = () => {
  return (
    <>
      <div className={classes.authFormCtn}>
        <h1 className={classes.signupHeader}>Sign Up</h1>
        <AuthForm />
      </div>
    </>
  );
};

export default SignupPage;
