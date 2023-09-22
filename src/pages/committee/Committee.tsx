import { Button, Card, Col, Row, Space, Spin, Tag, Typography } from "antd";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSuperUser } from "../../container/ProfileProvider";
import { committeeAPI } from "../../libs/api/committee";
import PageHeader from "./components/PageHeader";

const Committee = () => {
  const { data, isLoading } = useQuery(["committee-list"], () =>
    committeeAPI.getCommitteeList()
  );

  const { isSuperUser } = useSuperUser();
  return (
    <Spin spinning={isLoading}>
      <PageHeader
        title="Committee"
        subtitle="Connect with community members by joining a communities"
        actions={
          isSuperUser ? (
            <Link className="pr-14" to={`create-committee`}>
              <Button size="large" type="primary">
                Create Committee
              </Button>
            </Link>
          ) : (
            ""
          )
        }
      />
      {data?.data?.map((items, index) => (
        <Space key={index} size={"large"} direction="vertical">
          <Row gutter={[48, 48]}>
            <Col className="mt-5" span={23}>
              <Link to={`members/${items?.id}`}>
                <Card hoverable>
                  <Typography.Title level={5}>{items?.name}</Typography.Title>
                  <Typography.Paragraph type="secondary">
                    This committee Start at{" "}
                    <span className="text-black">{items?.start_date}</span> and
                    End at <span className="text-black">{items?.end_date}</span>
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
