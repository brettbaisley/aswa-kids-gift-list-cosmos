import { useEffect, useState } from 'react';
import './Header.css';
import { useAuthContext, type UserInfo } from '../context/AuthContext';
import Modal from './Modal';

const Header = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
      console.log('=== Authentication Debug ===');
      console.log('Full clientPrincipal object:', JSON.stringify(clientPrincipal, null, 2));
      console.log('userDetails field:', clientPrincipal?.userDetails);
      console.log('All keys:', clientPrincipal ? Object.keys(clientPrincipal) : 'none');
      console.log('==========================');
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  };

  return (
    <header>
      <h1>Wonderlist</h1>
      <div className="auth-list">
        {!userInfo ? (
          <button className="btn-loginout" type="button" onClick={() => setIsAuthModalOpen(true)}>
            Login
          </button>
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
      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        <div className="auth-modal">
          <h2>Choose a sign-in method</h2>
          <div className="auth-provider-list">
            <a
              className="auth-provider-button github"
              href="/.auth/login/github?post_login_redirect_uri=/"
            >
              Continue with GitHub
            </a>
            <a
              className="auth-provider-button entra"
              href="/.auth/login/aad?post_login_redirect_uri=/"
            >
              Continue with Microsoft
            </a>
            <a
              className="auth-provider-button google"
              href="/.auth/login/google?post_login_redirect_uri=/"
            >
              Continue with Google
            </a>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;