import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { SignupForm } from "./app/signup/SignupForm";
import ErrorPage from "./error-page";
import { routes as noteRoutes } from "./app/notes";
import { routes as courseRoutes } from "./app/courses";
import { Header } from "./components/Header";
import { LoginForm } from "./app/login/login-form";
import { Home } from "./app/home";
import { MenuComponent } from "./components/Menu";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestsRoute } from "./components/GuestsRoute";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { theme } from "./theme";
import { ChatBot } from "./app/chatbot/chatbot";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
};

const LayoutHeader = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: [<Auth />],
    errorElement: <ErrorPage />,
    children: [
      {
        element: [<LayoutHeader />],
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },

      {
        element: [<ProtectedRoute />, <MenuComponent />, <Outlet />],
        children: [...noteRoutes, ...courseRoutes],
      },

      {
        element: [<GuestsRoute />, <LayoutHeader />],
        children: [
          {
            path: "/signup",
            element: <SignupForm />,
          },
          {
            path: "/login",
            element: <LoginForm />,
          },
        ],
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
