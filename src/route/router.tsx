import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import Signup from "../pages/signup/Signup";
import SignIn from "../pages/signin/Signin";
import Members from "../pages/members/Members";
import Posts from "../pages/posts/Posts";
import DashboardLayout from "../container/layout/DashboardLayout";
import HomeLayout from "../container/layout/HomeLayout";
import Post from "../pages/post/Post";
import Committee from "../pages/committee/Committee";
import ProfileSetting from "../pages/profileSetting/ProfileSetting";
import EmailVerify from "../pages/emailverify/EmailVerify";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/forgot-password/ResetPassword";

export const publicRoute = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Navigate to="/homepage" /> },
      { path: "homepage", element: <HomePage /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <SignIn /> },
      { path: "verify", element: <EmailVerify /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
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
          { path: ":slag", element: <Post /> },
        ],
      },
      { path: "committee", element: <Committee /> },
      { path: "profilesetting", element: <ProfileSetting /> },
    ],
  },
]);
