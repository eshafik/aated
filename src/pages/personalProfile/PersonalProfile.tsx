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
      name={memberData?.data?.name}
      profile_pic={memberData?.data?.profile_pic}
      email={memberData?.data?.email}
      contact_details={memberData?.data?.contact_details}
      batch_name={memberData?.data?.batch?.name}
      passing_year={memberData?.data?.passing_year}
      path="/profile-setting"
      phone={memberData?.data?.phone}
      professional_designation={memberData?.data?.professional_designation}
      student_id={memberData?.data?.student_id}
      personalExperienceData={experienceData}
    />
  );
};

export default PersonalProfile;
