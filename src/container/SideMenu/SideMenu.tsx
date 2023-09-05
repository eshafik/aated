import {
  UsergroupAddOutlined,
  SettingOutlined,
  ApartmentOutlined,
  ReadOutlined,
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
          icon: <ReadOutlined />,
          onClick: () => navigate("/posts"),
          label: "Post",
        },
        {
          key: "committee",
          title: "Committee",
          icon: <ApartmentOutlined />,
          onClick: () => navigate("committee"),
          label: "Committee",
        },
        {
          key: "profilesetting",
          title: "Setting",
          icon: <SettingOutlined />,
          onClick: () => navigate("profilesetting"),
          label: "Profile Setting",
        },
      ]}
    />
  );
};

export default SideMenu;
