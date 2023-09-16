import { Tabs, TabsProps } from "antd";
import ProfileSettings from "./components/ProfileSettings";
import Security from "./components/Security";
import SeeExperience from "../experience/SeeExperience";

const ProfileContainer = () => {
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
  return <Tabs items={items} />;
};

export default ProfileContainer;
