import { ThunderboltOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSuperUser } from "../../../container/RoleProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";

const PendingMembers = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { data: pendingMemberData, isLoading } = useQuery(
    ["members-list"],
    () => membersAPI.pendingMembersList(),
    {
      onError: () => {
        notification.error({ message: "You do not have permission" });
      },
    }
  );

  const { mutate } = useMutation(
    (payload: ApproveMembersPayload) => membersAPI.approveMembers(payload),
    {
      onSuccess: () => {
        notification.success({ message: "User Approved" });
        queryClient.invalidateQueries(["members-list"]);
      },
    }
  );

  const { isSuperUser } = useSuperUser();

  return (
    <Spin spinning={isLoading}>
      {isSuperUser ? (
        <Row gutter={[12, 12]}>
          {pendingMemberData?.data?.map((item, i) => (
            <Col key={i} xs={24} md={8} lg={6}>
              <Badge.Ribbon text={`${item?.batch?.name} batch`}>
                <Card type="inner" hoverable className="h-full">
                  <Space align="start" size="middle">
                    <Avatar
                      size="large"
                      className="bg-primary/[15%] border-none dark:bg-primary flex justify-center items-center"
                      src={item?.profile_pic}
                    />
                    <Space.Compact direction="vertical">
                      <Typography.Title level={5} className="mb-1 mt-1">
                        {item?.name}
                      </Typography.Title>
                      <Typography.Paragraph
                        type="secondary"
                        className="mb-0"
                        ellipsis={{ rows: 2 }}
                      >
                        {item?.professional_designation}
                      </Typography.Paragraph>
                    </Space.Compact>
                  </Space>
                  <div className="text-end">
                    <Tooltip title="Active">
                      <Button
                        onClick={() =>
                          mutate({
                            user_id: item?.id,
                          })
                        }
                        icon={<ThunderboltOutlined />}
                      />
                    </Tooltip>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      ) : (
        "You Do not have permission to perform this action."
      )}
    </Spin>
  );
};

export default PendingMembers;
