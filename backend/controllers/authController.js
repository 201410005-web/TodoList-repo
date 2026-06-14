const passport =
    require('../config/passport');
const db = require('../database/db');

const register = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            error: 'Usuario y contraseña obligatorios'
        });

    }

    db.run(
        'INSERT INTO users(username,password) VALUES (?,?)',
        [username, password],
        function(err) {

            if (err) {

                return res.status(400).json({
                    error: 'El usuario ya existe'
                });

            }

            res.status(201).json({
                message: 'Usuario registrado correctamente',
                userId: this.lastID
            });

        }
    );

};

const login = (req, res) => {

    passport.authenticate(

        'local',

        (
            err,
            user,
            info
        ) => {

            if (err) {

                return res
                    .status(500)
                    .json({
                        error:
                            err.message
                    });

            }

            if (!user) {

                return res
                    .status(401)
                    .json({
                        error:
                            info.message
                    });

            }

            res.status(200)
                .json({

                    message:
                        'Login correcto',

                    token:
                        'usuario-autenticado',

                    user: {

                        id:
                            user.id,

                        username:
                            user.username

                    }

                });

        }

    )(
        req,
        res
    );

};

module.exports = {
    register,
    login
};