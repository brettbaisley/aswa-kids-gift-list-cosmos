import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserInfo = {
  userDetails?: string;
  [key: string]: unknown;
};

type AuthContextValue = [
  UserInfo | undefined,
  React.Dispatch<React.SetStateAction<UserInfo | undefined>>
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  return (
    <AuthContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};