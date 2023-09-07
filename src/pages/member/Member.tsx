import { Avatar, Card, Col, Row, Skeleton, Typography } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { membersAPI } from "../../libs/api/membersAPI";

const Member = () => {
  const { memberId } = useParams();
  const { data: memberData, isLoading } = useQuery(["member-list"], () =>
    membersAPI.getMemberDetails(memberId as string)
  );
  return (
    <Skeleton loading={isLoading}>
      <Row align={"middle"} justify={"center"}>
        <Col span={12}>
          <Card className="text-center shadow-2xl bg-transparent ">
            <div>
              <Avatar
                src={memberData?.data?.profile_pic}
                size="large"
                className="h-40 w-40"
              />
              <Typography.Title level={3}>
                {memberData?.data?.name}
              </Typography.Title>
              <div>{memberData?.data?.student_id}</div>
              <div>{memberData?.data?.batch?.name}</div>
              <div>{memberData?.data?.passing_year}</div>
              <div>{memberData?.data?.email}</div>
              <div>{memberData?.data?.phone}</div>
              <div>{memberData?.data?.professional_designation}</div>
              <div>{memberData?.data?.contact_details}</div>
              <div>{memberData?.data?.employment_status}</div>
              <Typography.Title level={4} className="flex mt-5">
                Experiences
              </Typography.Title>
              {memberData?.data?.experiences?.map((exp, i) => (
                <Card title={`${i + 1}. ${exp?.company_name}`}>
                  <div>{exp?.designation}</div>
                  <div>{exp?.job_department?.name}</div>
                  <div>{exp?.job_location}</div>
                  <div>{exp?.responsibilities}</div>
                  <div>{exp?.working_years} Year of experience</div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default Member;
