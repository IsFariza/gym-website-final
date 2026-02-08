const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) 
        return res.status(403).json({message: 'No token'});
    if (token.startsWith("Bearer "))
        token = token.split(" ")[1]

    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized: invalid token'});
    }
};

module.exports = { verifyToken };