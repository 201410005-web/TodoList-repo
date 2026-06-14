const passport = require('passport');

const LocalStrategy =
    require('passport-local').Strategy;

const db = require('../database/db');

passport.use(

    new LocalStrategy(

        (username, password, done) => {

            db.get(

                'SELECT * FROM users WHERE username = ?',

                [username],

                (err, user) => {

                    if (err) {

                        return done(err);

                    }

                    if (!user) {

                        return done(
                            null,
                            false,
                            {
                                message: 'Usuario no existe'
                            }
                        );

                    }

                    if (
                        user.password !== password
                    ) {

                        return done(
                            null,
                            false,
                            {
                                message: 'Contraseña incorrecta'
                            }
                        );

                    }

                    return done(
                        null,
                        user
                    );

                }

            );

        }

    )

);

module.exports = passport;