const User = require("./user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //Pkg required for encryption purpose.


//create a user
exports.user_create = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {

            if (user.length >= 1) {
                return res.status(404).json({
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
    User.find()
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
                            role: u.role
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
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    User.findByIdAndUpdate(updateOps._id, updateOps)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.status(422).json({
                error: err.message
            });
        });
}

