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
      mode="inline"
      theme="light"
      className="bg-slate-300 h-full"
      items={[
        {
          key: "1",
          icon: "",
          disabled: true,
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
