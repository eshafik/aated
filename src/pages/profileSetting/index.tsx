/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsProps, theme } from "antd";
import SeeExperience from "./components/PersonalExperience";
import ProfileSettings from "./components/ProfileSettings";
import Security from "./components/Security";

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
    <div
      className="w-full h-full"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Tabs
        className="w-[500px] sm:w-[700px]"
        size="large"
        tabBarStyle={{
          backgroundColor: token.colorBgLayout,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
        items={items}
      />
    </div>
  );
};

export default ProfileContainer;
