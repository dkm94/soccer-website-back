const User = require('../models/User');
const bcrypt = require('bcrypt');

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