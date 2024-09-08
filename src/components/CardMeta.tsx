import { Typography } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";

type CardMetaProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
  action?: React.ReactNode;
};
const CardMeta = ({
  icon,
  description,
  title,
  className,
  extra,
  action,
}: CardMetaProps) => {
  return (
    <div
      className={twMerge(
        "grid w-full grid-cols-12 items-center justify-between",
        className
      )}
    >
      <div
        className={twMerge(
          "col-span-12 flex items-center gap-2",
          (extra || action) && "col-span-10"
        )}
      >
        <div>{icon}</div>
        <div className="flex flex-col">
          <Typography.Title level={5} className="mt-0 mb-0">
            {title}
          </Typography.Title>
          <Typography.Text type="secondary" className="mt-0">
            {description}
          </Typography.Text>
        </div>
      </div>
      <div className="col-span-2 flex ml-auto">{extra}</div>
      <div className="col-span-2 flex ml-auto">{action}</div>
    </div>
  );
};

export default CardMeta;
