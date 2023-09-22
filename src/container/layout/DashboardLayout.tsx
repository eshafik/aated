import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Layout, MenuProps, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { profileAPI } from "../../libs/api/profileAPI";
import { authService } from "../../libs/auth";
import ProfileProvider from "../ProfileProvider";
import SideMenu from "../SideMenu/SideMenu";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigate();
  const { data } = useQuery(["user-profile", "profile"], () =>
    profileAPI.getProfileDetails()
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a onClick={() => (authService.removeTokens(), navigation("/signin"))}>
          Logout
        </a>
      ),
    },
  ];
  return (
    <ProfileProvider>
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
          className="bg-blue-400 "
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <SideMenu />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0 }}
            className="bg-white border-2 border-sky-500 w-full"
          >
            <Row justify={"space-between"}>
              <Col>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                />
              </Col>
              <Col>
                <Dropdown.Button
                  className="mr-12"
                  size="large"
                  type="text"
                  icon={<Avatar src={data?.data?.profile_pic} />}
                  menu={{ items }}
                  placement="bottomLeft"
                >
                  {data?.data?.name}
                </Dropdown.Button>
              </Col>
            </Row>
          </Header>
          <Content className="overflow-auto ml-5 mt-2">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ProfileProvider>
  );
};

export default DashboardLayout;
