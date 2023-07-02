

const LoginPage = () => {

    const handleGoogleLogin = () => {
        // Redirect the user to the Google OAuth login route
        window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
    };

    const handleLogout = () => {
        // Redirect the user to the logout route
        window.location.href = `${process.env.REACT_APP_SERVER_URL}/logout`;

    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LoginPage;
