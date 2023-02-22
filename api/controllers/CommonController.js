const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.updateUser = (req, res) => {
    const userId = res.locals.userId;
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    User.updateOne({_id: userId},
        {$set: {password: hash}})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err))
}