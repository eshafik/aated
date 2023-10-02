import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProfileLayout from "../../container/ProfileLayout";
import { membersAPI } from "../../libs/api/membersAPI";

const Member = () => {
  const { memberId } = useParams();
  const { data: memberData, isLoading } = useQuery(["member-list"], () =>
    membersAPI.getMemberDetails(memberId as string)
  );
  return (
    <ProfileLayout
      isLoading={isLoading}
      name={memberData?.data?.name}
      email={memberData?.data?.email}
      batch_name={memberData?.data?.batch?.name}
      contact_details={memberData?.data?.contact_details}
      passing_year={memberData?.data?.passing_year}
      phone={memberData?.data?.phone}
      professional_designation={memberData?.data?.professional_designation}
      profile_pic={
        memberData?.data?.profile_pic
          ? memberData?.data?.profile_pic
          : "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg"
      }
      student_id={memberData?.data?.student_id}
      isMemberEnable={true}
      memberExperience={memberData?.data?.experiences}
    />
  );
};

export default Member;
