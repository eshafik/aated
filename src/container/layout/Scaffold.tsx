import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ScaffoldProps = {
  extra?: React.ReactNode;
  className?: string;
};
const Scaffold = ({
  children,
  extra,
  className,
}: PropsWithChildren & ScaffoldProps) => {
  return (
    <div
      className={twMerge(
        "container max-h-[calc(100vh-80px)] max-w-[100vw] flex flex-col overflow-auto mt-3",
        className
      )}
    >
      <div className="w-full">{extra}</div>
      <div>{children}</div>
    </div>
  );
};

export default Scaffold;
