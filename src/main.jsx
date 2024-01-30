import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./providers/AuthContext.jsx";
import ReviewsContextProvider from "./providers/ReviewsContext.jsx";
import UserContextProvider from "./providers/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GameContextProvider } from "./providers/GameContext.jsx";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <GameContextProvider>
            <ReviewsContextProvider>
              <MantineProvider>
                <App />
                <ToastContainer theme="dark" autoClose={2500} />
              </MantineProvider>
            </ReviewsContextProvider>
          </GameContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
