const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.deleteAccount =  function (req, res, next) {
    const userId = res.locals.userId;
    User.findById(userId).exec()
        .then(user => {
            if(!user){ 
                return res.status(400).json({ error: "User not found." })
            } else {
                user.remove()
                .then(() => res.status(204).json({ success: "Account deleted successfully." }))
                .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => console.log(err))
}