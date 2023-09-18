import { Layout, Tabs, TabsProps } from "antd";
import ProfileSettings from "./components/ProfileSettings";
import Security from "./components/Security";
import SeeExperience from "../experience/SeeExperience";
import { Header } from "antd/es/layout/layout";

const ProfileContainer = () => {
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          padding: 20,
          width: "100%",
          background: "transparent",
        }}
      >
        <DefaultTabBar {...props} />
      </Header>
    </Layout>
  );
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
  return <Tabs renderTabBar={renderTabBar} items={items} />;
};

export default ProfileContainer;
