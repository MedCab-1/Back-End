const jwt = require('jsonwebtoken');
const secret = require('./secret');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(authorization) {

        jwt.verify(authorization, secret.jwtSecret, function(error, decodedToken) {
            if (error) {
                console.log(error);
                res.status(401).json({errorMessage: "Invalid Token"})
            } else {
                req.token = decodedToken;
                next();
            }
        });
    } else {
    res.status(400).json({ message: 'Please login and try again.' });
  }
};