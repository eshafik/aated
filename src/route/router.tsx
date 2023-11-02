import { Button, Result } from "antd";
import { Link, Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../container/layout/DashboardLayout";
import HomeLayout from "../container/layout/HomeLayout";
import Committee from "../pages/committee/Committee";
import CommitteeMembers from "../pages/committee/committeemembers/CommitteeMembers";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/forgot-password/ResetPassword";
import Member from "../pages/member/Member";
import Members from "../pages/members";
import Contributor from "../pages/onboard/Contributor";
import EmailVerify from "../pages/onboard/EmailVerify";
import HomePage from "../pages/onboard/HomePage";
import SignIn from "../pages/onboard/Signin";
import SignUp from "../pages/onboard/Signup";
import PersonalProfile from "../pages/personalProfile/PersonalProfile";
import Post from "../pages/post/Post";
import PostContainer from "../pages/posts";
import ProfileContainer from "../pages/profileSetting";

export const publicRoute = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Navigate to="/homepage" /> },
      { path: "homepage", element: <HomePage /> },
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <SignIn /> },
      { path: "verify", element: <EmailVerify /> },
      { path: "contributor", element: <Contributor /> },
      // { path: "committee", element: <PublicCommitteeMembers /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        path: "*",
        element: (
          <Result
            status="404"
            title="404"
            subTitle="You have to signin to access this page"
            extra={
              <Link to={"/signin"}>
                <Button type="primary">Back Home</Button>
              </Link>
            }
          />
        ),
      },
    ],
  },
]);

export const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/members" /> },
      {
        path: "profile",
        element: <PersonalProfile />,
      },
      {
        path: "members",
        children: [
          { index: true, element: <Members /> },
          { path: ":memberId", element: <Member /> },
        ],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <PostContainer /> },
          { path: ":slag", element: <Post /> },
        ],
      },
      {
        path: "committee",
        children: [
          { index: true, element: <Committee /> },
          {
            path: "members/:slag",
            element: <CommitteeMembers />,
          },
        ],
      },
      {
        path: "profile-setting",
        children: [{ index: true, element: <ProfileContainer /> }],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    ),
  },
]);
