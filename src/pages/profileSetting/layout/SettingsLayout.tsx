import { Card } from "antd";
import { PropsWithChildren } from "react";
const SettingsLayout = ({ children }: PropsWithChildren) => {
  return (
    <Card className="container h-[calc(100vh-64px)] max-w-[1800px] flex flex-col overflow-auto p-3">
      {children}
    </Card>
  );
};

export default SettingsLayout;
