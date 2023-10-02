import { useQuery } from "react-query";
import { publicCommitteeMemberAPI } from "../../libs/api/publicMember";

const PublicCommitteeMembers = () => {
  const { data } = useQuery({
    queryKey: ["publicCommitteeMembers-list"],
    queryFn: () => publicCommitteeMemberAPI.getPublicCommitteeMembers(),
  });

  console.log(data);
  return <div></div>;
};

export default PublicCommitteeMembers;
