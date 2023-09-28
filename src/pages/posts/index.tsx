import { Tabs, theme } from "antd";
import Posts from "./Posts";

const PostContainer = () => {
  const { token } = theme.useToken();
  const items = [
    { key: "0", label: "All Post", children: <Posts /> },
    { key: "1", label: "Job Post", children: <Posts categoryId={"1"} /> },
    { key: "2", label: "Notice", children: <Posts categoryId={"2"} /> },
    { key: "3", label: "General Post", children: <Posts categoryId={"3"} /> },
    { key: "4", label: "Help Post", children: <Posts categoryId={"4"} /> },
  ];

  return (
    <div className="grid justify-center bg-inherit ">
      <Tabs
        items={items}
        tabBarStyle={{
          backgroundColor: token.colorBgLayout,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default PostContainer;
