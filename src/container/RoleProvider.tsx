import { createContext, FC, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import { UpdateProfileResponse } from "../libs/api/@types/profile";
import { profileAPI } from "../libs/api/profileAPI";

interface SuperUserContext {
  isSuperUser?: boolean;
  isLoading?: boolean;
  data?: UpdateProfileResponse;
}

const RoleContext = createContext<SuperUserContext>({
  isSuperUser: false,
  isLoading: false,
  data: undefined,
});
export const useSuperUser = () => useContext(RoleContext);

type FeaturesProviderProps = {
  children: ReactNode;
};

const ProfileProvider: FC<FeaturesProviderProps> = (props) => {
  const { data, isLoading } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  return (
    <RoleContext.Provider
      value={{
        data: data,
        isSuperUser: data?.data?.is_superuser,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </RoleContext.Provider>
  );
};

export default ProfileProvider;
