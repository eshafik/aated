import { createContext, FC, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import { profileAPI } from "../libs/api/profileAPI";

interface SuperUserContext {
  isSuperUser?: boolean;
  isLoading?: boolean;
  isModarator?: boolean;
  userID?: string | number;
}

const RoleContext = createContext<SuperUserContext>({
  isSuperUser: false,
  isModarator: false,
  isLoading: false,
  userID: "",
});
export const useUserDetails = () => useContext(RoleContext);

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
        userID: data?.data?.id,
        isSuperUser: data?.data?.is_superuser,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </RoleContext.Provider>
  );
};

export default ProfileProvider;
