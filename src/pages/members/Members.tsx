import { Card } from "antd";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";

const Members = () => {
  const tabList = [
    {
      key: "activeMembers",
      label: "Active Members",
      children: <ActiveMembers />,
    },
    {
      key: "pendingRequest",
      label: "Pending Request",
      children: <PendingMembers />,
    },
  ];
  return <Card tabList={tabList} className="bg-transparent h-full w-full" />;
};

export default Members;
