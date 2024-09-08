import { Skeleton, Typography } from "antd";

type PageHeaderProps = {
  loading?: boolean;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  actions?: React.ReactNode;
};

const PageHeader = ({ loading, title, subtitle, actions }: PageHeaderProps) => {
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
    <div className="flex justify-between mb-3">
      <div className="flex flex-col">
        <Typography.Title level={3} className="mb-0 mt-0">
          {title}
        </Typography.Title>
        <Typography.Text className="text-base" type="secondary">
          {subtitle}
        </Typography.Text>
      </div>
      {actions}
    </div>
  );
};

export default PageHeader;
