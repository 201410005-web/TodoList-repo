function authMiddleware(
    req,
    res,
    next
) {

    if (
        req.headers.authorization
    ) {

        next();

    } else {

        return res
            .status(401)
            .json({

                error:
                    'No autorizado'

            });

    }

}

module.exports =
    authMiddleware;