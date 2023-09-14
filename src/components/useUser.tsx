// import React, { useState } from "react";
// import { profileAPI } from "../libs/api/profileAPI";
// import { useQuery } from "react-query";

// export const useLoginAuth = () => React.useContext(AuthContext);

// interface Userontext {
//   is_super_user: boolean;
//   user_id: string | number;
// }

// const AuthContext = React.createContext<Userontext>({
//   is_super_user: false,
//   user_id: "",
// });

// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {

//   return (
//     <AuthContext.Provider
//       value={{
//         is_super_user
//         user_id,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export default AuthProvider;
