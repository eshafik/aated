import { Avatar, Col, Layout, Row, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import SideMenu from "../SideMenu/SideMenu";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="relative" style={{ overflow: "auto", height: "100vh" }}>
      <Sider
        className="@container main-sider hidden md:block"
        breakpoint="xl"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <SideMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row className="mr-3" justify={"end"}>
            <Col>
              <Avatar />
              Demon
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
