import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import SignIn from "../pages/signin/Signin";
import Members from "../pages/members";
import DashboardLayout from "../container/layout/DashboardLayout";
import HomeLayout from "../container/layout/HomeLayout";
import Post from "../pages/post/Post";
import Committee from "../pages/committee/Committee";
import EmailVerify from "../pages/emailverify/EmailVerify";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/forgot-password/ResetPassword";
import Member from "../pages/member/Member";
import CreateCommittee from "../pages/committee/CreateCommittee";
import EditCommittee from "../pages/committee/EditCommittee";
import CommitteeMembers from "../pages/committee/committeemembers/CommitteeMembers";
import { Button, Result } from "antd";
import AddExperiences from "../pages/experience/AddExperiences";
import SeeExperience from "../pages/experience/SeeExperience";
import SignUp from "../pages/signup/Signup";
import ProfileContainer from "../pages/profileSetting";
import EditPost from "../pages/post/EditPost";
import PostContainer from "../pages/posts";

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
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        path: "*",
        element: (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
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
          { path: "edit-post/:postId", element: <EditPost /> },
        ],
      },
      {
        path: "committee",
        children: [
          { index: true, element: <Committee /> },
          { path: "createcommittee", element: <CreateCommittee /> },
          { path: ":committeeId", element: <EditCommittee /> },
          {
            path: "members/:committeemembersId",
            element: <CommitteeMembers />,
          },
        ],
      },
      { path: "profilesetting", element: <ProfileContainer /> },
      { path: "add-experiences", element: <AddExperiences /> },
      { path: "experiences", element: <SeeExperience /> },
    ],
  },
  {
    path: "*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    ),
  },
]);
