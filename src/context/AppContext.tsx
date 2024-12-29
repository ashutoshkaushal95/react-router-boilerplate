import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface LoginInfo {
  isLoggedIn: boolean;
  email: string;
  role: string;
}

interface AppContextProps {
  loginInfo: LoginInfo;
  login: (email: string, role: string) => void;
  logout: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(() => {
    const savedLoginInfo = localStorage.getItem("loginInfo");
    return savedLoginInfo
      ? JSON.parse(savedLoginInfo)
      : { isLoggedIn: false, email: "", role: "" };
  });
  const navigate = useNavigate();

  const login = (email: string, role: string) => {
    const updatedLoginInfo = { isLoggedIn: true, email, role };
    localStorage.setItem("loginInfo", JSON.stringify(updatedLoginInfo));
    setLoginInfo(updatedLoginInfo);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("loginInfo");
    setLoginInfo({ isLoggedIn: false, email: "", role: "" });
    navigate("/login");
  };

  return (
    <AppContext.Provider value={{ loginInfo, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
