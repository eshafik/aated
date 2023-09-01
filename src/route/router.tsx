import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import Signup from "../pages/signup/Signup";
import SignIn from "../pages/signin/Signin";
import Members from "../pages/members/Members";
import Posts from "../pages/posts/Posts";
import DashboardLayout from "../container/layout/DashboardLayout";
import HomeLayout from "../container/layout/HomeLayout";
import Post from "../pages/post/Post";

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
      {
        path: "posts",
        children: [
          { index: true, element: <Posts /> },
          { path: "post", element: <Post /> },
        ],
      },
    ],
  },
]);
