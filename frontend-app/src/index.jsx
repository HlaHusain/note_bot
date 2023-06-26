import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import { SignupForm } from "./app/signup/SignupForm";
import ErrorPage from "./error-page";
import { routes as noteRoutes } from "./app/notes";
import {routes as courseRoutes} from "./app/courses"
import { Header } from "./components/Header";
import { LoginForm } from "./app/login/login-form";
import { Home } from "./app/home";
import { MenuComponent } from "./components/Menu";

const LayoutMenu = () => (
  <>
     <MenuComponent/>
    <Outlet />
  </>
);

const LayoutHeader = () => (
  <>
     <Header/>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    
    element: <LayoutMenu />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        // errorElement:<ErrorPage/>,
      },
      ...noteRoutes,
      ...courseRoutes,
    ],
  },
  {
    element: <LayoutHeader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <SignupForm />,
        // errorElement:<ErrorPage/>,
      },
      {
        path: "/login",
        element: <LoginForm />,
        // errorElement:<ErrorPage/>,
      },
    ]
    
  },

  {
    path: "/logout",
    element: <LoginForm />,
    // errorElement:<ErrorPage/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
