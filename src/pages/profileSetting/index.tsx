/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsProps, theme } from "antd";
import ProfileSettings from "./components/ProfileSettings";
import Security from "./components/Security";
import SeeExperience from "./components/SeeExperience";

const ProfileContainer = () => {
  const { token } = theme.useToken();

  const items: TabsProps["items"] = [
    {
      key: "profile",
      label: "Basic Profile",
      children: <ProfileSettings />,
    },
    {
      key: "experience",
      label: "Experiences",
      children: <SeeExperience />,
    },
    {
      key: "security",
      label: "Change Password",
      children: <Security />,
    },
  ];
  return (
    <Tabs
      tabBarStyle={{
        backgroundColor: token.colorBgLayout,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      items={items}
    />
  );
};

export default ProfileContainer;
