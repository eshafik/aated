import {
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <Menu
      style={{ height: "100%" }}
      theme="dark"
      className="flex-1 overflow-auto bg-transparent pb-14 mt-4"
      items={[
        {
          key: "1",
          icon: "",
        },
        {
          key: "members",
          title: "members",
          icon: <UsergroupAddOutlined />,
          label: "Members",
          onClick: () => navigate("/members"),
        },
        {
          key: "post",
          title: "post",
          icon: <AppstoreAddOutlined />,
          onClick: () => navigate("/posts"),
          label: "Post",
        },
        {
          key: "committee",
          title: "Committee",
          icon: <GroupOutlined />,
          onClick: () => navigate("committee"),
          label: "Committee",
        },
        {
          key: "profilesetting",
          title: "Setting",
          icon: <GroupOutlined />,
          onClick: () => navigate("profilesetting"),
          label: "Profile Setting",
        },
      ]}
    />
  );
};

export default SideMenu;
