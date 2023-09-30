import { Tabs, theme } from "antd";
import { useSuperUser } from "../../container/ProfileProvider";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";

const Members = () => {
  const { token } = theme.useToken();
  const { isSuperUser } = useSuperUser();

  return isSuperUser ? (
    <Tabs
      className="mt-5"
      tabBarStyle={{
        backgroundColor: token.colorBgLayout,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
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
  ) : (
    <ActiveMembers />
  );
};

export default Members;
