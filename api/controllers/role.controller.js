const Role = require('../models/role.model');
const mongoose = require('mongoose');

//get all roles
exports.role_getAll = (req, res, next) => {
    Role.find()
        .then(docs => {

            res.status(200).json({
                count: docs.length,
                roles: docs.map(r => {
                    return {
                        '_id': r._id,
                        'role': r.role
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

//add role
exports.role_add = (req, res, next) => {

    const prole = req.body.role;

    if (prole == null)
        return res.status(400).json({
            message: 'Invalid input params'
        });

    Role.findOne({ role: prole }).then(doc => {
        if (doc != null)
            return res.status(409).json({
                message: `role: '${doc.role}' already exists.`
            });

        const role = new Role({
            _id: mongoose.Types.ObjectId(),
            role: prole
        });

        role.save().then(role => {
            res.status(201).json({
                message: 'created',
                'role': {
                    '_id': role._id,
                    'role': role.role
                }
            })
        })
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}

//get role id
exports.role_getbyRole = (req, res, next) => {
    const prole = req.params.role;
    if (prole == null)
        return res.status(400).json({
            message: 'invalid params'
        });

    Role.findOne({ role: prole })
        .then(doc => {
            if (doc == null)
                return res.status(404).json({ message: 'role not found' });

            return res.status().json({
                _id: doc._id,
                role: doc.role
            });
        }).catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
}

//update role
exports.role_update = (req, res, next) => {
    const prole = req.body.role;
    const proleId = req.body.roleId;
    if (prole == null || proleId == null)
        return res.status(400).json({ message: 'invalid params' });

    mongoose.set('useFindAndModify', false);
    Role.findByIdAndUpdate(proleId, { role: prole }) //upsert: true, new: true,returnOriginal: false
        .then(result => {

            if (result == null)
                return res.status(400).json({ message: 'invalid role id' });

            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

//remove role
exports.role_remove = async (req, res, next) => {
    const proleId = req.params.roleId;

    if (proleId == null)
        return res.status(400).json({ message: 'invalid role id' });

    try {
        let result = await Role.deleteOne({ _id: proleId });

        if (result != null)
            res.status(200).json({ message: 'role deleted.' })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

