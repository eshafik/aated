import { useQuery } from "react-query";
import ProfileLayout from "../../container/ProfileLayout";
import { profileAPI } from "../../libs/api/profileAPI";

const PersonalProfile = () => {
  const { data: memberData, isLoading } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const { data: experienceData } = useQuery(["experience-list"], () =>
    profileAPI.getExperiences()
  );

  return (
    <ProfileLayout
      isLoading={isLoading}
      profileData={memberData?.data}
      memberExperience={experienceData?.data}
      isOwnAccount={true}
    />
  );
};

export default PersonalProfile;
