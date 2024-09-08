import { Tabs } from "antd";
import { useUserDetails } from "../../container/RoleProvider";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";

const Members = () => {
  const { isSuperUser } = useUserDetails();

  return isSuperUser ? (
    <div className="mt-2">
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
    </div>
  ) : (
    <div className="mt-3">
      <ActiveMembers />
    </div>
  );
};

export default Members;
