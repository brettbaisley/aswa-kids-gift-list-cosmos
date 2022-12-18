import React, { useContext, useEffect } from "react";
import './Header.css';
import { AuthContext } from "../context/AuthContext";



const Header = () => {
    const [userInfo, setUserInfo] = useContext(AuthContext);
    const providers = ['github', 'aad'];
    const redirect = window.location.pathname;

    useEffect( () => {
        (async () => {
            setUserInfo(await getUserInfo() );
        })();
    }, []);

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
                        <p>Log in:</p>
                        <ul>
                        {
                            providers.map((provider) => (
                                <li key={provider}><a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>{provider}</a></li>
                            ))
                        }
                        </ul>
                        </> ) : (
                        <div className="user">
                            <p>{userInfo && userInfo.userDetails} (via {userInfo && userInfo.identityProvider}) -- {<a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>}</p>
                        </div>
                    )   
                }
            </div>
        </header>
    )
}

export default Header;