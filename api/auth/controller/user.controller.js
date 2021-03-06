const User = require("../model/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //Pkg required for encryption purpose.
const constants = require('../helper/constants');


//create a user
exports.user_create = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {

            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role,
                    city: req.body.city,
                });

                user.save().then(result => {
                    res.status(201).json({
                        message: 'User created',
                        user:
                        {
                            _id: result._id,
                            email: result.email,
                            name: result.name,
                            city: result.city,
                            role: result.role,
                        }

                    });
                }).catch(err => {
                    res.status(500).json({ error: err.message });
                });
            });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

//get all
exports.user_get_all = (req, res, next) => {
    User.find({})
        .populate('role')
        .exec()
        .then(doc => {

            res.status(200).json(
                {
                    count: doc.length,
                    users: doc.map(u => {
                        return {
                            _id: u._id,
                            name: u.name,
                            email: u.email,
                            city: u.city,
                            role: u.role.role
                        }
                    })
                })
        }).catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
}

//update
exports.user_update = (req, res, next) => {
    mongoose.set('useFindAndModify', false);
    let updateOps = {};
    for (const ops of req.body) {

        if (constants.userUpdateProp.includes(ops.name))
            updateOps[ops.name] = ops.value;
    }   

    User.findByIdAndUpdate(updateOps._id, updateOps, { new: true })
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.status(422).json({
                error: err.message
            });
        });
}

//find by email
exports.user_findby_email = (req, res, next) => {
    const email = req.params.email;
    User.findOne({ email: email })
        .then(doc => {

            if (doc == null)
                return res.json({ 'message': 'No user found.' });

            const user = {
                'id': doc._id,
                'name': doc.name,
                'email': doc.email,
                'role': doc.role,
                'city': doc.city
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
            res.status(422).json({
                error: err.message
            });
        });;
}

//delete by email
exports.user_deleteby_email = (req, res, next) => {
    const email = req.params.email;
    User.deleteOne({ email: email })
        .then(doc => {
            let message = '';
            // if (doc == null)
            //     return res.json({ 'message': 'No user found.' });
            // console.log(doc.deletedCount > 0)

            if (doc.deletedCount > 0) {
                message = 'User removed.'
            } else {
                message = 'User removing unsuccessful.'
            }
            // const user = {
            //     'id': doc._id,
            //     'name': doc.name,
            //     'email': doc.email,
            //     'role': doc.role,
            //     'city': doc.city
            // }
            res.status(200).json(message);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });;
}
