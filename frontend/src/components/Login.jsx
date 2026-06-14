function Login({

    username,
    password,

    setUsername,
    setPassword,

    handleLogin,
    handleRegister

}) {

    return (

        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}
        >

            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <button
                className="btn-status"
                onClick={handleLogin}
            >
                Iniciar Sesión
            </button>

            <button
                className="btn-delete"
                onClick={handleRegister}
            >
                Registrarse
            </button>

        </div>

    );

}

export default Login;