const jwt = require('jsonwebtoken');

const restriction = (req, res, next) => {
    const { authorization } = req.headers;

    if(authorization) {
        jwt.verify(
            authorization,
            'THIS IS THE SECRET',
            (err, decodedToken) => {
                if (err) {
                res.status(401).json({ message: err.message })
                } else {
                req.decodedToken = decodedToken;
                next()
                }
            }
        )
    }
};

module.exports = restriction;
