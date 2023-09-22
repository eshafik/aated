import { Card, Col, Row, Space, Spin, Tag, Typography } from "antd";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { committeeAPI } from "../../libs/api/committee";

const Committee = () => {
  const { data, isLoading } = useQuery(["committee-list"], () =>
    committeeAPI.getCommitteeList()
  );
  return (
    <Spin spinning={isLoading}>
      <Typography.Title level={2}>Committee</Typography.Title>
      <Typography.Title type="secondary" level={5}>
        Connect with community members by joining a communities
      </Typography.Title>
      {data?.data?.map((items, index) => (
        <Space key={index} size={"large"} direction="vertical">
          <Row gutter={[48, 48]}>
            <Col className="mt-5" span={23}>
              <Link to={`members/${items?.id}`}>
                <Card hoverable>
                  <Typography.Title level={5}>{items?.name}</Typography.Title>
                  <Typography.Paragraph type="secondary">
                    This committee Start at {items?.start_date} and End at{" "}
                    {items?.end_date}
                  </Typography.Paragraph>
                  <Tag color={items?.is_active ? "green" : "red"}>
                    {items?.is_active ? "Active" : "Deactivate"}
                  </Tag>
                </Card>
              </Link>
            </Col>
          </Row>
        </Space>
      ))}
    </Spin>
  );
};

export default Committee;
