import React, { useState } from "react";

export const useAuth = () => React.useContext(AuthContext);
interface AuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = React.createContext<AuthContext>({
  isLoading: false,
  isLoggedIn: false,
  login: () => undefined,
  logout: () => undefined,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isLoading, setisLoading] = useState(true);

  const login = () => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      setisLoading(true);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
