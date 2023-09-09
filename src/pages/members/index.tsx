import { Tabs } from "antd";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";

const Members = () => {
  return (
    <Tabs
      items={[
        {
          key: "active_members",
          label: "Active Members",
          children: <ActiveMembers />,
        },
        {
          key: "pending_members",
          label: "Pending Request",
          children: <PendingMembers />,
        },
      ]}
    />
  );
};

export default Members;
