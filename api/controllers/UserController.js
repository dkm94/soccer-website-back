const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.users = (req, res) => {
    User.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json( err ))
}

exports.user = (req, res) => {
    const userId = res.locals.userId;
    User.findOne({_id: userId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateUser = (req, res) => {
    const userId = res.locals.userId;
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    User.updateOne({_id: userId},
        {$set: {password: hash, ...req.body}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteAccount =  function (req, res, next) {
    const userId = res.locals.userId;
    User.findById(userId).exec()
        .then(user => {
            if(!user) return res.status(400).json(err)
            user.remove()
                .then(() => res.status(200).json("Le compte a été supprimé avec succès."))
                .catch(err => res.status(400).json(err))
        })
}