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
          extra && action && "col-span-6"
        )}
      >
        <div>{icon}</div>
        <div className="flex flex-col gap-1">
          <div className="text-md font-semibold">{title}</div>
          <div className="text-sm font-normal text-gray-500">{description}</div>
        </div>
      </div>
      <div className="col-span-4">{extra}</div>
      <div className="col-span-2 flex justify-end">{action}</div>
    </div>
  );
};

export default CardMeta;
