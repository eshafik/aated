import React, { PropsWithChildren } from "react";

type ScaffoldProps = {
  extra?: React.ReactNode;
};
const Scaffold = ({ children, extra }: PropsWithChildren & ScaffoldProps) => {
  return (
    <div className="container max-h-[calc(100vh-80px)] max-w-[100vw] flex flex-col overflow-auto mt-3">
      <div className="w-full">{extra}</div>
      <div>{children}</div>
    </div>
  );
};

export default Scaffold;
