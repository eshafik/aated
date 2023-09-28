import { Avatar, Col, Image, Row, Skeleton, Typography } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StyledCard } from "../../components/StyleCard";
import { membersAPI } from "../../libs/api/membersAPI";

const Member = () => {
  const { memberId } = useParams();
  const { data: memberData, isLoading } = useQuery(["member-list"], () =>
    membersAPI.getMemberDetails(memberId as string)
  );
  return (
    <Skeleton loading={isLoading}>
      <Row justify={"center"}>
        <Col span={12}>
          <StyledCard className="shadow-2xl bg-transparent ">
            <div>
              {memberData?.data?.profile_pic ? (
                <Image
                  src={memberData?.data?.profile_pic}
                  className="h-32 w-24 rounded-lg"
                />
              ) : (
                <Avatar className="h-32 w-24 rounded-lg" />
              )}
              <Typography.Title level={3}>
                {memberData?.data?.name}
              </Typography.Title>
              <div className="ml-5">
                <div>{memberData?.data?.contact_details}</div>
                <div>{memberData?.data?.email}</div>
                <div>{memberData?.data?.phone}</div>
                <div>{memberData?.data?.student_id}</div>
                <div>{memberData?.data?.batch?.name}</div>
                <div>{memberData?.data?.passing_year}</div>
                <div>{memberData?.data?.professional_designation}</div>
              </div>
              <Typography.Title level={4} className="flex mt-5">
                Experiences
              </Typography.Title>
              {memberData?.data?.experiences?.map((exp, i) => (
                <div key={i} className="mb-8 ml-5">
                  <Typography.Title className="mt-0" level={5}>
                    {exp?.designation}
                  </Typography.Title>
                  <div>
                    {exp?.company_name} - {exp?.responsibilities}
                  </div>
                  <div>{exp?.working_years} Years of experience</div>
                </div>
              ))}
            </div>
          </StyledCard>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default Member;
