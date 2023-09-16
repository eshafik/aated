import { Tabs, TabsProps } from "antd";
import ProfileSettings from "./components/ProfileSettings";

const ProfileContainer = () => {
  const items: TabsProps["items"] = [
    {
      key: "profile",
      label: "Profile Setting",
      children: <ProfileSettings />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return <Tabs items={items} />;
};

export default ProfileContainer;
