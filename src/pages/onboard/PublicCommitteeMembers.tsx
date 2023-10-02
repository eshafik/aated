import { Avatar, Row, Space, Typography } from "antd";
import { useQuery } from "react-query";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";

const PublicCommitteeMembers = () => {
  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });
  return (
    <div className="text-center bg-white">
      <div>
        <Typography.Title className="mt-0">Lorem Ipsum</Typography.Title>
        <Typography.Title level={5}>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." "There is no one who loves pain
          itself, who seeks after it and wants to have it, simply because it is
          pain..."
        </Typography.Title>
      </div>
      <Row justify={"center"} className="bg-white">
        {data?.data?.map((members, i) => (
          <Space direction="vertical" key={i}>
            {members?.committee_designation == "President" && (
              <div className="w-56 text-center">
                <Avatar
                  className="h-48 w-48"
                  src={`http://api.aated.smartlivestocksystem.com/${members?.profile_pic}`}
                />
                <Typography.Title level={4}>{members?.name}</Typography.Title>
                <Typography.Paragraph type="secondary">
                  {members?.committee_designation}
                </Typography.Paragraph>
              </div>
            )}
            {members?.committee_designation == "Secretary" && (
              <div className="w-56 text-center">
                <Avatar
                  className="h-48 w-48"
                  src={`http://api.aated.smartlivestocksystem.com/${members?.profile_pic}`}
                />
                <Typography.Title level={4}>{members?.name}</Typography.Title>
                <Typography.Paragraph type="secondary">
                  {members?.committee_designation}
                </Typography.Paragraph>
              </div>
            )}
          </Space>
        ))}
      </Row>
    </div>
  );
};

export default PublicCommitteeMembers;
