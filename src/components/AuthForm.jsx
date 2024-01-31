import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import {
  Modal,
  PinInput,
  PasswordInput,
  Notification,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import classes from "../styles/AuthForm.module.css";

const AuthForm = ({ isLogin = false }) => {
  const [loginCredential, setLoginCredential] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [opened, { open, close }] = useDisclosure();
  const [MFACode, setMFACode] = useState("");
  const [tempToken, setTempToken] = useState("");

  const navigate = useNavigate();

  const { saveToken } = useContext(AuthContext);

  const clearLoginForms = () => {
    setLoginCredential("");
    setPassword("");
    setMFACode("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate fields
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username should only contain numbers, letters or underscores");
    } else if (password1 !== password2) {
      setError("Passwords do not match");
    } else {
      setError("");
      let payload;
      if (isLogin) {
        payload = {
          loginCredential,
          password,
        };
      } else {
        payload = {
          email,
          username,
          password1,
        };
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/${
            isLogin ? "login" : "signup"
          }`,
          payload
        );
        if (response.status === 202) {
          setTempToken(response.data.loginToken);
          open();
        }

        if (response.status === 201) {
          navigate("/login");
        }
        if (response.status === 200) {
          toast.success("Login Successful", { theme: "dark" });
          saveToken(response.data.token);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMFACode = async () => {
    //event.preventDefault();
    const payload = { loginToken: tempToken, twoFactorToken: MFACode };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/otp/validate`,
        payload
      );
      if (response.status === 200) {
        toast.success("Login Successful", { theme: "dark" });
        close();
        saveToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Code incorrect, please try to login again", {
        theme: "dark",
      });
      clearLoginForms();
      close();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <TextInput
              className={classes.inputBox}
              label="Username / E-Mail"
              type="text"
              value={loginCredential}
              onChange={(event) =>
                setLoginCredential(event.currentTarget.value)
              }
              required
            />
            <PasswordInput
              className={classes.inputBox}
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
            />
          </>
        ) : (
          <>
            <TextInput
              className={classes.inputBox}
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
            <TextInput
              className={classes.inputBox}
              label="Username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              required
            />
            <PasswordInput
              className={classes.inputBox}
              label="Password"
              value={password1}
              onChange={(event) => setPassword1(event.currentTarget.value)}
              required
              minLength={6}
            />
            <PasswordInput
              className={classes.inputBox}
              label="Confirm Password"
              value={password2}
              onChange={(event) => setPassword2(event.currentTarget.value)}
              required
              minLength={6}
            />
            {error && (
              <Notification
                className={classes.notif}
                color="red"
                title="Error"
                description={error}
                onClose={() => setError("")}
              >
                {error}
              </Notification>
            )}
          </>
        )}

        <input type="submit" value={isLogin ? "Login" : "Sign Up"} />
      </form>
      <Modal
        opened={opened}
        withCloseButton={false}
        centered
        closeOnClickOutside={false}
      >
        <label>
          Please enter your 2FA code from your 2FA App to login:
          <PinInput
            size="md"
            length={6}
            type="number"
            value={MFACode}
            onChange={(value) => setMFACode(value)}
            onComplete={handleMFACode}
          />
        </label>
        <button type="button" onClick={() => navigate("/")}>
          Abort Login
        </button>
      </Modal>
    </>
  );
};

export default AuthForm;
