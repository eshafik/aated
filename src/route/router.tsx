import { Navigate, createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/homepage/HomePage";
import Signup from "../pages/signup/Signup";
import SignIn from "../pages/signin/Signin";
import DashboardLayout from "../layout/DashboardLayout";
import Members from "../pages/members/Members";

export const publicRoute = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Navigate to="/homepage" /> },
      { path: "homepage", element: <HomePage /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <SignIn /> },
    ],
  },
]);

export const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/members" /> },
      { path: "members", element: <Members /> },
    ],
  },
]);
