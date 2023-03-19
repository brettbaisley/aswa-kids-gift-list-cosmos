import { useEffect } from "react";
import './Header.css';
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";


const Header = () => {
    const [userInfo, setUserInfo] = useAuthContext();
    
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
                        <Link className="btn-loginout" to="/login">Login</Link>
                    ) : (
                        <div className="user">
                            <p>{userInfo.userDetails} -- {<a className="btn-loginout" href={`/.auth/logout?post_logout_redirect_uri=/`}>Logout</a>}</p>
                        </div>
                    )   
                }
            </div>
        </header>
    )
}

export default Header;