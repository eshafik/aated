import { Tabs } from "antd";
import Scaffold from "../../container/layout/Scaffold";
import { useUserDetails } from "../../container/RoleProvider";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";

const Members = () => {
  const { isSuperUser } = useUserDetails();

  return isSuperUser ? (
    <Scaffold>
      <Tabs
        className="p-2"
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
    </Scaffold>
  ) : (
    <Scaffold>
      <ActiveMembers />
    </Scaffold>
  );
};

export default Members;
