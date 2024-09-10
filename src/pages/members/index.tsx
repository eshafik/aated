import { Tabs } from "antd";
import styled from "styled-components";
import { useUserDetails } from "../../container/RoleProvider";
import ActiveMembers from "./component/ActiveMembers";
import PendingMembers from "./component/PendingMembers";

const Members = () => {
  const { isSuperUser } = useUserDetails();

  return isSuperUser ? (
    <div className="p-3">
      <StyledTabs
        items={[
          {
            key: "active_members",
            label: "Active Members",
            children: <ActiveMembers />,
            className: "mb-0",
          },
          {
            key: "pending_members",
            label: "Pending Request",
            children: <PendingMembers />,
            className: "mb-0",
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

const StyledTabs = styled(Tabs)`
  &&.ant-tabs-top > .ant-tabs-nav {
    margin: 0 !important;
  }
`;
