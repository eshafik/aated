import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProfileLayout from "../../container/ProfileLayout";
import { membersAPI } from "../../libs/api/membersAPI";

const Member = () => {
  const { memberId } = useParams();
  const { data: memberData, isLoading } = useQuery({
    queryKey: ["member-list", memberId],
    queryFn: () => membersAPI.getMemberDetails(memberId ?? ""),
  });
  return (
    <ProfileLayout
      isLoading={isLoading}
      profileData={memberData?.data}
      memberExperience={memberData?.data?.experiences}
    />
  );
};

export default Member;
