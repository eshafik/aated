import { Avatar, Col, Dropdown, Layout, MenuProps, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import SideMenu from "../SideMenu/SideMenu";
import { useQuery } from "react-query";
import { profileAPI } from "../../libs/api/profileAPI";
import { authService } from "../../libs/auth";

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
    <Layout className="relative" style={{ overflow: "auto", height: "100vh" }}>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
        className="bg-blue-400"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <SideMenu />
      </Sider>
      <Layout>
        <Header className="bg-transparent w-full">
          <Row className="mr-3" justify={"end"}>
            <Col>
              <Dropdown.Button
                size="large"
                type="text"
                icon={
                  <Avatar className="bottom-1" src={data?.data?.profile_pic} />
                }
                menu={{ items }}
                placement="bottomLeft"
              >
                {data?.data?.name}
              </Dropdown.Button>
            </Col>
          </Row>
        </Header>
        <Content className="overflow-auto p-2">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
