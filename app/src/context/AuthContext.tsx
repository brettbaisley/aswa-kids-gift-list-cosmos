import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

export type UserInfo = {
  userDetails?: string;
  [key: string]: unknown;
};

type AuthContextValue = {
  userInfo: UserInfo | undefined;
  isAdmin: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Static list of admin users (case-insensitive)
const ADMIN_USERS = ['brettbaisley', 'enerlise615@gmail.com'];

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  // Calculate isAdmin based on userDetails (case-insensitive comparison)
  const isAdmin = useMemo(() => {
    if (!userInfo?.userDetails) {
      console.log('isAdmin check: No userDetails found', userInfo);
      return false;
    }
    const userDetailsLower = userInfo.userDetails.toLowerCase().trim();
    const adminStatus = ADMIN_USERS.some(admin => admin.toLowerCase() === userDetailsLower);
    console.log('isAdmin check:', { 
      userDetails: userInfo.userDetails, 
      userDetailsNormalized: userDetailsLower,
      adminUsers: ADMIN_USERS, 
      isAdmin: adminStatus 
    });
    return adminStatus;
  }, [userInfo]);

  const value = {
    userInfo,
    isAdmin,
    setUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>
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