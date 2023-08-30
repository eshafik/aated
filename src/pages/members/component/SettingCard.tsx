import { Avatar, Badge, Card, Space, Typography } from "antd";
import { FC } from "react";
type SettingType = {
  name?: string;
  position?: string;
  batch?: string;
};
const SettingCard: FC<SettingType> = ({ name, position, batch }) => {
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
      </Card>
    </Badge.Ribbon>
  );
};

export default SettingCard;
