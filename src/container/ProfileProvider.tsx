import { createContext, FC, ReactNode, useContext } from "react";
import { profileAPI } from "../libs/api/profileAPI";
import { useQuery } from "react-query";
import { UpdateProfileResponse } from "../libs/api/@types/profile";

interface SuperUserContext {
  isSuperUser?: boolean;
  isLoading?: boolean;
  data?: UpdateProfileResponse;
}

const ProfileContext = createContext<SuperUserContext>({
  isSuperUser: false,
  isLoading: false,
  data: undefined,
});
export const useSuperUser = () => useContext(ProfileContext);

type FeaturesProviderProps = {
  children: ReactNode;
};

const ProfileProvider: FC<FeaturesProviderProps> = (props) => {
  const { data, isLoading } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  return (
    <ProfileContext.Provider
      value={{
        data: data,
        isSuperUser: data?.data?.is_superuser,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
