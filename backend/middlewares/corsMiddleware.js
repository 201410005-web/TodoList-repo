function corsMiddleware(req, res, next) {

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    res.setHeader(
        'Content-Type',
        'application/json'
    );

    res.setHeader(
        'Author',
        'Bozo y Nina Penaloza'
    );

    res.setHeader(
        'API-Name',
        'Todo List API Avanzada'
    );

    if (req.method === 'OPTIONS') {

        return res.sendStatus(200);

    }

    next();
}

module.exports = corsMiddleware;