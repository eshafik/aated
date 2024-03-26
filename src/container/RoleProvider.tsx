import { createContext, FC, ReactNode, useContext } from "react";

interface SuperUserContext {
  isSuperUser?: boolean;
  isModarator?: boolean;
  userID?: string | number;
}

const RoleContext = createContext<SuperUserContext>({
  isSuperUser: false,
  isModarator: false,
  userID: "",
});
export const useUserDetails = () => useContext(RoleContext);

type FeaturesProviderProps = {
  children: ReactNode;
};

const ProfileProvider: FC<FeaturesProviderProps> = (props) => {
  const userProfile = JSON.parse(localStorage.getItem("user-profile") || "[]");

  return (
    <RoleContext.Provider
      value={{
        userID: userProfile?.id,
        isSuperUser: userProfile?.is_superuser,
      }}
    >
      {props.children}
    </RoleContext.Provider>
  );
};

export default ProfileProvider;
