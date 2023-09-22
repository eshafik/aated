import { Col, Row, Skeleton, Space, Typography } from "antd";
import { twMerge } from "tailwind-merge";

type PageHeaderProps = {
  loading?: boolean;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  actions?: React.ReactNode;
  style?: boolean;
};

const PageHeader = ({
  loading,
  title,
  subtitle,
  actions,
  style,
}: PageHeaderProps) => {
  if (loading) {
    return (
      <Skeleton
        active
        avatar
        title={false}
        paragraph={{ rows: 2 }}
        className="py-4"
      />
    );
  }

  return (
    <Row
      align="middle"
      className={twMerge(style ? "py-0" : "py-4")}
      gutter={[12, 12]}
    >
      <Col flex={1}>
        <Space size="middle">
          <Space.Compact direction="vertical">
            <Typography.Title level={3} className="mb-0">
              {title}
            </Typography.Title>
            <Typography.Text className="text-base" type="secondary">
              {subtitle}
            </Typography.Text>
          </Space.Compact>
        </Space>
      </Col>
      <Col className="mt-11">{actions}</Col>
    </Row>
  );
};

export default PageHeader;
