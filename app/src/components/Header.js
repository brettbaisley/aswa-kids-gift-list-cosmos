import React, { useEffect } from "react";
import './Header.css';
import { useAuthContext } from "../context/AuthContext";



const Header = () => {
    const [userInfo, setUserInfo] = useAuthContext();
    const providers = ['github', 'aad'];
    const redirect = window.location.pathname;

    useEffect( () => {
        (async () => {
            setUserInfo(await getUserInfo() );
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getUserInfo = async () => {
        try {
            const response = await fetch('/.auth/me');
            const payload = await response.json();
            const { clientPrincipal } = payload;
            return clientPrincipal;
          } catch (error) {
            console.error('No profile could be found');
            return undefined;
          }
    }

    return (
        <header>
            <h1>Gifts</h1>
            <div className="auth-list">
                {
                    !userInfo ? (
                        <>
                        <p>Log using:</p>
                        <ul>
                        {
                            providers.map((provider) => (
                                <li key={provider}><a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>{provider}</a></li>
                            ))
                        }
                        </ul>
                        </> ) : (
                        <div className="user">
                            <p>{userInfo.userDetails} (via {userInfo.identityProvider}) -- {<a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>}</p>
                        </div>
                    )   
                }
            </div>
        </header>
    )
}

export default Header;