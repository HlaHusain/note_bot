import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {noteRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          {courseRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
