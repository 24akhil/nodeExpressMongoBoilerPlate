const User = require('../model/user.model');
const jwt = require('jsonwebtoken');


exports.validate = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
// console.log(decoded)
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed!'
        });
    }
}


exports.validateAdmin = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        
        if (decoded.role != 'Manager')
            throw new Error('authorization failed');

        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed!'
        });
    }
}



