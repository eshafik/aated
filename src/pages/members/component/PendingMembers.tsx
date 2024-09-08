import { ThunderboltOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Pagination,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { usePendingMemberList } from "../../../config/hook/usePendingMembers";
import { useUserDetails } from "../../../container/RoleProvider";
import { ApproveMembersPayload } from "../../../libs/api/@types/members";
import { membersAPI } from "../../../libs/api/membersAPI";

const PendingMembers = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const {
    data: pendingMemberData,
    filter,
    isLoading,
    refetch,
  } = usePendingMemberList();

  const { mutate } = useMutation(
    (payload: ApproveMembersPayload) => membersAPI.approveMembers(payload),
    {
      onSuccess: () => {
        notification.success({ message: "User Approved" });
        refetch();
        queryClient.invalidateQueries(["members-list"]);
      },
    }
  );

  const { isSuperUser } = useUserDetails();

  return (
    <Spin spinning={isLoading}>
      {isSuperUser ? (
        <>
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
          <Pagination
            className="top-0 flex justify-end mt-3"
            defaultCurrent={1}
            total={pendingMemberData?.meta_data?.count}
            defaultPageSize={pendingMemberData?.meta_data?.page_size ?? 10}
            onChange={filter.handleChangePage}
          />
        </>
      ) : (
        "You Do not have permission to perform this action."
      )}
    </Spin>
  );
};

export default PendingMembers;
