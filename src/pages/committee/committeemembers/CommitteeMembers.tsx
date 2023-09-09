import {
  App,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { committeeAPI } from "../../../libs/api/committee";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { profileAPI } from "../../../libs/api/profileAPI";

const CommitteeMembers = () => {
  const { notification } = App.useApp();
  const { committeemembersId } = useParams();

  const { data: committeeMemberData, isLoading } = useQuery(
    ["members-list"],
    () => committeeAPI.getcommitteeMembersList(committeemembersId as string),
    {
      onError: () => {
        notification.error({ message: "You do not have permission" });
      },
    }
  );

  const { data: superUser } = useQuery(["user-profile"], () =>
    profileAPI.superUserCheck()
  );

  //   const { mutate } = useMutation(
  //     (payload: ApproveMembersPayload) => membersAPI.approveMembers(payload),
  //     {
  //       onSuccess: () => {
  //         notification.success({ message: "User Approved" });
  //       },
  //     }
  //   );

  //   const { data: superUser } = useQuery(["user-profile"], () =>
  //     profileAPI.getProfileDetails()
  //   );

  return (
    <Spin spinning={isLoading}>
      {committeeMemberData?.data?.length ? (
        <Row gutter={[12, 12]}>
          {committeeMemberData?.data?.map((item, i) => (
            <Col key={i} xs={24} md={8} lg={6}>
              <Badge.Ribbon text={`${item?.member?.batch?.name}th batch`}>
                <Card type="inner" hoverable className="h-full">
                  <Space align="start" size="middle">
                    <Space.Compact direction="vertical">
                      <Typography.Title level={5} className="mb-1 mt-1">
                        {item?.member?.name}
                      </Typography.Title>
                      <Typography.Paragraph
                        type="secondary"
                        className="mb-0"
                        ellipsis={{ rows: 2 }}
                      >
                        {item?.committee_designation}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        {item?.position_order}
                      </Typography.Paragraph>
                    </Space.Compact>
                  </Space>
                  <div className="text-end">
                    <Button disabled={!superUser?.data?.is_superuser}>
                      Remove
                    </Button>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          You do not have permission to do this action
        </div>
      )}
    </Spin>
  );
};

export default CommitteeMembers;
