import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { membersAPI } from "../../../libs/api/membersAPI";
import { Link } from "react-router-dom";

const ActiveMembers = () => {
  const { data: ActiveMemberData, isLoading } = useQuery(["members-list"], () =>
    membersAPI.activeMembersList()
  );

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
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Select size="large" />
          <Select size="large" />
          <Select size="large" />
        </Col>
        {ActiveMemberData?.data?.map((item, i) => (
          <Col key={i} xs={24} md={8} lg={6}>
            <Badge.Ribbon text={`${item?.batch_no}th batch`}>
              <Link to={`${item?.id}`}>
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
              </Link>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default ActiveMembers;
