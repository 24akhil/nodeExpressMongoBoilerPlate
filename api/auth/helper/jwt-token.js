const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt"); //Pkg required for encryption purpose.

// exports.authenticate = async (req, res, next) => {
exports.authenticate = async (pemail, ppassword, req, res) => {

    User.findOne({ email: pemail })
        .populate('role')
        .exec()
        .then(user => {
            if (user == null)
                return res.status(401).json({
                    message: 'unauthorised'
                });
            // console.log('user ', bcrypt.compare(ppassword, user.password))
            bcrypt.compare(ppassword, user.password).then(isMatch => {
                if (isMatch) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id,
                        role: user.role.role
                    },
                        process.env.JWT_KEY,
                        { expiresIn: "1h" });

                    return res.status(200).json({
                        message: "auth successful.",
                        token: token
                    });
                } else {
                    return res.status(401).json({
                        message: 'unauthorised'
                    });
                }
            });


        }).catch(err => {
            res.status(401).json({
                error: err.message
            });
        });

}