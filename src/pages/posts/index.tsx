import { Col, Row, Tabs } from "antd";
import Posts from "./Posts";
import { Header } from "antd/es/layout/layout";
import { usePostList } from "../../config/hook/useSearch";

const PostContainer = () => {
  const { filter } = usePostList();
  const renderTabBar = (props: any, DefaultTabBar: any) => (
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
  );
  const items = [
    { key: "0", label: "All Post", children: <Posts /> },
    { key: "1", label: "Job Post", children: <Posts categoryId={"1"} /> },
    { key: "2", label: "Notice", children: <Posts categoryId={"2"} /> },
    { key: "3", label: "General Post", children: <Posts categoryId={"3"} /> },
    { key: "4", label: "Help Post", children: <Posts categoryId={"4"} /> },
  ];

  return (
    <Row align="middle" justify="center">
      <Col>
        <Tabs renderTabBar={renderTabBar} items={items} />
      </Col>
    </Row>
  );
};

export default PostContainer;
