import Login from '../components/Login';

function LoginPage({

    username,
    password,

    setUsername,
    setPassword,

    handleLogin,
    handleRegister

}) {

    return (

        <div className="todo-container">

            <h1 className="main-title">
                To Do List Login
            </h1>

            <Login

                username={username}
                password={password}

                setUsername={setUsername}
                setPassword={setPassword}

                handleLogin={handleLogin}
                handleRegister={handleRegister}

            />

        </div>

    );

}

export default LoginPage;