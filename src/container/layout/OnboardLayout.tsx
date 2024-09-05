import { Avatar, Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";
import CardMeta from "../../components/CardMeta";
import Header from "../../components/header/Header";

const OnboardLayout = () => {
  return (
    <Layout className="h-full w-full bg-slate-200">
      <Layout.Content className="container bg-slate-200 p-5 lg:pl-14 lg:pr-14 min-h-screen max-h-full">
        <div className="bg-white rounded shadow p-3 overflow-auto">
          <CardMeta
            className="mb-3"
            icon={
              <Avatar src="https://cdn-icons-png.freepik.com/256/8074/8074800.png?semt=ais_hybrid" />
            }
            title={
              <Typography.Title level={5} className="mt-0 mb-0">
                Lorem Ipsum
              </Typography.Title>
            }
            description="Neque porro quisquam est qui dolorem ipsum"
          />
          <Header />
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default OnboardLayout;
