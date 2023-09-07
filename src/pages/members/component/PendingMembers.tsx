import {
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { membersAPI } from "../../../libs/api/membersAPI";

const PendingMembers = () => {
  const { notification } = App.useApp();
  const { data: pendingMemberData, isLoading } = useQuery(
    ["members-list"],
    () => membersAPI.pendingMembersList(),
    {
      onError: () => {
        notification.error({ message: "You do not have permission" });
      },
    }
  );

  console.log("Calling Pending", pendingMemberData);

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
    <Spin spinning={isLoading}>
      {pendingMemberData?.data ? (
        <Row gutter={[12, 12]}>
          {pendingMemberData?.data?.map((item, i) => (
            <Col key={i} xs={24} md={8} lg={6}>
              <Badge.Ribbon text={`${item?.batch_no}th batch`}>
                <Card type="inner" hoverable className="h-full">
                  <Space align="start" size="middle">
                    <Avatar
                      size="large"
                      className="bg-primary/[15%] border-none dark:bg-primary flex justify-center items-center"
                      src={item?.profile_pic}
                    />
                    <Space.Compact direction="vertical">
                      <Typography.Title level={5} className="mb-1 mt-1">
                        {item?.name}
                      </Typography.Title>
                      <Typography.Paragraph
                        type="secondary"
                        className="mb-0"
                        ellipsis={{ rows: 2 }}
                      >
                        {item?.professional_designation}
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
            </Col>
          ))}
        </Row>
      ) : (
        "You Do not have permission to perform this action."
      )}
    </Spin>
  );
};

export default PendingMembers;
