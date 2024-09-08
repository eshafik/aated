import React, { PropsWithChildren } from "react";

type ScaffoldProps = {
  extra?: React.ReactNode;
};
const Scaffold = ({ children, extra }: PropsWithChildren & ScaffoldProps) => {
  return (
    <div className="container h-[calc(100vh-80px)] max-w-[1800px] flex flex-col overflow-auto mt-3">
      <div className="w-full">{extra}</div>
      {children}
    </div>
  );
};

export default Scaffold;
