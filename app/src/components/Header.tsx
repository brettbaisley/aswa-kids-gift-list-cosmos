import { useEffect } from 'react';
import './Header.css';
import { useAuthContext, type UserInfo } from '../context/AuthContext';

const Header = () => {
  const { userInfo, setUserInfo } = useAuthContext();

  useEffect(() => {
    const loadUserInfo = async () => {
      setUserInfo(await getUserInfo());
    };

    loadUserInfo();
  }, [setUserInfo]);

  const getUserInfo = async (): Promise<UserInfo | undefined> => {
    try {
      const response = await fetch('/.auth/me');
      const payload = (await response.json()) as { clientPrincipal?: UserInfo };
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  };

  return (
    <header>
      <h1>Gifts</h1>
      <div className="auth-list">
        {!userInfo ? (
          <a className="btn-loginout" href="/.auth/login/github?post_login_redirect_uri=/">
            Login
          </a>
        ) : (
          <div className="user">
            <p>
              Hi {userInfo.userDetails}
              <a className="btn-loginout" href={`/.auth/logout?post_logout_redirect_uri=/`}>
                Logout
              </a>
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;