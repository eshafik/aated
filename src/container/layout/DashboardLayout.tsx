import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { profileAPI } from "../../libs/api/profileAPI";
import { authService } from "../../libs/auth";
import RoleProvider from "../RoleProvider";
import SideMenu from "../SideMenu/SideMenu";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigate();
  const { data } = useQuery({
    queryFn: () => profileAPI.getProfileDetails(),
    onSuccess: (data) => {
      localStorage.setItem("user-profile", JSON.stringify(data?.data));
    },
  });

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => navigation("/profile")}>Personal Profile</a>,
    },
    {
      key: "2",
      label: (
        <a onClick={() => (authService.removeTokens(), navigation("/signin"))}>
          Logout
        </a>
      ),
    },
  ];
  return (
    <RoleProvider>
      <Layout
        className="relative"
        style={{ overflow: "auto", height: "100vh" }}
      >
        <Sider
          trigger={null}
          theme="light"
          breakpoint="xl"
          collapsedWidth="0"
          collapsible
          className="bg-blue-400"
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <SideMenu />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0 }}
            className="bg-white w-full h-14 flex justify-between items-center"
          >
            <div className="w-full grid grid-cols-2 ">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Dropdown.Button
                className="pr-3 justify-end"
                size="large"
                icon={
                  <Avatar
                    className="bottom-0.5"
                    src={data?.data?.profile_pic}
                  />
                }
                menu={{ items }}
              >
                {data?.data?.name}
              </Dropdown.Button>
            </div>
          </Header>
          <Content className="overflow-auto h-[calc(100vh)] pl-5 pr-3">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RoleProvider>
  );
};

export default DashboardLayout;
