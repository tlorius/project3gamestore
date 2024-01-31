import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";

const AuthForm = ({ isLogin = false }) => {
  const [loginCredential, setLoginCredential] = useState("");
  const [email, SetEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    let payload;
    if (isLogin) {
      payload = {
        //update this depending on backend
        loginCredential,
        password,
      };
    } else {
      payload = {
        email,
        username,
        password,
      };
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "signup"}`,
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
  };

  const handleMFACode = async (event) => {
    event.preventDefault();
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
          <label>
            Username / E-Mail
            <input
              type="text"
              value={loginCredential}
              onChange={(event) => setLoginCredential(event.target.value)}
            />
          </label>
        ) : (
          <>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => SetEmail(event.target.value)}
              />
            </label>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </>
        )}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value={isLogin ? "Login" : "Sign Up"} />
      </form>
      <Modal
        opened={opened}
        withCloseButton={false}
        centered
        closeOnClickOutside={false}
      >
        <form onSubmit={handleMFACode}>
          <label>
            Please enter your 2FA code from your 2FA App to login:
            <input
              type="text"
              value={MFACode}
              onChange={(event) => setMFACode(event.target.value)}
            />
          </label>
          <input type="submit" value="Submit 2FA Code" />
        </form>
        <button type="button" onClick={() => navigate("/")}>
          Abort Login
        </button>
      </Modal>
    </>
  );
};

export default AuthForm;
