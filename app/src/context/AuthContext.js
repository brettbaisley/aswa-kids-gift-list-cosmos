import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {
    const [userInfo, setUserInfo] = useState();

    return (
        <AuthContext.Provider value={ [userInfo, setUserInfo] }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }
    return context;
}