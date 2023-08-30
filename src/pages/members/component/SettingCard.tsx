import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { FC } from "react";
import { MoreOutlined } from "@ant-design/icons";

type SettingType = {
  name?: string;
  position?: string;
  batch?: string;
};
const SettingCard: FC<SettingType> = ({ name, position, batch }) => {
  const items: MenuProps["items"] = [
    {
      label: "First Name",
      key: "fullname",
    },
    {
      label: "Last Name",
      key: "lastname",
    },
  ];
  return (
    <Badge.Ribbon text={batch}>
      <Card type="inner" hoverable className="h-full">
        <Space align="start" size="middle">
          <Avatar
            size="large"
            className="bg-primary/[15%] border-none dark:bg-primary flex justify-center items-center"
          />
          <Space.Compact direction="vertical">
            <Typography.Title level={5} className="mb-1 mt-1">
              {name}
            </Typography.Title>
            <Typography.Paragraph
              type="secondary"
              className="mb-0"
              ellipsis={{ rows: 2 }}
            >
              {position}
            </Typography.Paragraph>
          </Space.Compact>
        </Space>
        <div className="text-end">
          <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default SettingCard;
