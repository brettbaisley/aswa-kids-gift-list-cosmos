import { Link } from "react-router-dom";

const LoginPage = () => {

    return (
        <>
        <h2>Login Using:</h2>
        <ul>
            <li>
                <a href={`/.auth/login/github?post_login_redirect_uri=/`}>Sign In With Github</a>
            </li>
            <li>
                <a href={`/.auth/login/aad?post_login_redirect_uri=/`}>Sign In With Microsoft AAD</a>
            </li>
        </ul>

        <Link to="/">Back</Link>
        </>
    );
};

export default LoginPage;