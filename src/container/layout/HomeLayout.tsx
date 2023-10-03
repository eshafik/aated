import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <Layout className="h-screen w-screen">
      <Layout.Content className="bg-slate-300">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default HomeLayout;
