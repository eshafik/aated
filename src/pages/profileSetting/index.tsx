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
      label: "Profile Setting",
      children: <ProfileSettings />,
    },
    {
      key: "security",
      label: "Security",
      children: <Security />,
    },
    {
      key: "experience",
      label: "Experience",
      children: <SeeExperience />,
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
