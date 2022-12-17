import React, { useState, useEffect } from "react";
import './Header.css';



const Header = () => {
    const [userInfo, setUserInfo] = useState();
    const providers = ['twitter', 'github', 'aad'];
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
            <div className="menu-list auth">
                {!userInfo &&
                providers.map((provider) => (
                    <a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>{provider}&nbsp;</a>
                ))}
                {userInfo && <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>}
            </div>


            {
            userInfo && (
                <div>
                <div className="user">
                    <p>Welcome</p>
                    <p>{userInfo && userInfo.userDetails}</p>
                    <p>{userInfo && userInfo.identityProvider}</p>
                </div>
                </div>
            )
            }


        </header>
    )
}

export default Header;