import { Avatar, Layout } from "antd";
import { Outlet } from "react-router-dom";
import CardMeta from "../../components/CardMeta";
import Header from "../../components/header/Header";

const OnboardLayout = () => {
  return (
    <Layout className="h-screen w-screen">
      <Layout.Content className="container bg-slate-200 p-5">
        <div className="bg-white rounded shadow p-2">
          <CardMeta
            className="mb-3"
            icon={
              <Avatar src="https://cdn-icons-png.freepik.com/256/8074/8074800.png?semt=ais_hybrid" />
            }
          />
          <Header />
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default OnboardLayout;
