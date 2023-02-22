const User = require('../models/User');
const bcrypt = require('bcrypt');

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.createMod = async (req, res) => {
    try {
        const {email, password, isAdmin, isActive} = req.body;
        if(!email || !password || !isAdmin || !isActive) return res.status(422).json({"error": "Merci de renseigner tous les champs."});
        const isInvalid = password?.match(regex) == null; // true for no match, false for match
        if(isInvalid) {
            return res.status(400).json({ error : "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial." })
        } else {
            let hash = bcrypt.hashSync(password, 10);
            let mod = new User ({
                ...req.body,
                password: hash,
                isAdmin: false,
                isActive: false
            });
            await mod.save()
                .then(data => res.send(data))
                .catch(err => console.log(err))
        } 
    } catch (e) {
        console.log(e)
    }
}

exports.deactivateMod = async (req, res) => {
   try {
        const result = await User.updateOne({ _id: req.params.id },
            {$set: { isActive: req.body.isActive }})
            res.send(result)
            console.log("Mod has been updated successfully.")
   } catch (e) {
        console.log(e)
   }
}

exports.getAllMods = async (req, res) => {
    try {
        const mods = await User.find({ isAdmin: false })
        if(mods) return res.status(200).json(mods);
        if(!mods) return res.status(204).json({ message: "No users found"});
    } catch (e) {
        console.log(e)
    }
}

exports.getModbyId = async (req, res) => {
    try {
        const mod = await User.findOne({ _id: req.params.id })
        if(mod) return res.status(200).json(mod);
        if(!mod) return res.status(204).json({ message: "User not found."});
    } catch (e) {
        console.log(e)
    }
}
