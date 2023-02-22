const User = require('../models/User');
const bcrypt = require('bcrypt');

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        if(!password) return res.status(422).json({"error": "Merci de remplir le champ."});

        const isInvalid = password?.match(regex) == null; // true for no match, false for match
        if(isInvalid) {
            return res.status(400).json({ error : "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et caractère spécial." })
        } else {
            let hash = bcrypt.hashSync(password, 10);
            const result = await User.updateOne({_id: req.params.id },
                {$set: {password: hash}})
                res.send(result)
                console.log("Your password has been updated successfully.")
        } 
    } catch (e) {
        console.log(e)
    }
}