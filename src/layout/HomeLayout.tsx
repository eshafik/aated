import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const HomeLayout = () => {
  return (
    <Layout className="h-screen w-screen">
      <Layout.Content style={{ background: "LightGray" }}>
        <Header isSignButton />
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default HomeLayout;
