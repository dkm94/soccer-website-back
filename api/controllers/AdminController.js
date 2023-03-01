const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

// Admin can create mod, activate/deactivate mod, see all mods, see mod, delete mod

exports.createMod = async (req, res) => {
    try {
        let profile = new Profile({
            ...req.body,
            isActive: false
        })
        profile.save()
            .then(newProfile => {
                const {email, password, isAdmin, isActive} = req.body;
                if(!email || !password || !isAdmin || !isActive){
                    return res.status(422).json({"error": "Merci de renseigner tous les champs."});
                } else {
                    const isInvalid = password?.match(regex) == null; // true for no match, false for match
                    if(isInvalid) {
                        return res.status(400).json({ error : "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et caractère spécial." })
                    } else {
                        let hash = bcrypt.hashSync(password, 10);
                        let mod = new User ({
                            ...req.body,
                            password: hash,
                            isAdmin: false,
                            isActive: false,
                            id_profile: newProfile._id
                        });
                        mod.save()
                            .then(data => res.status(200).send(data))
                            .catch(err => console.log(err))
                    } 
                }
            })
        
    } catch (e) {
        console.log(e)
    }
}

exports.isActive = async (req, res) => {
   try {
        const mod = await User.findOne({ _id: req.params.id })
        if(!mod){
            return res.status(404).send({ error: "User not found" })
        } else {
            const result = await User.updateOne({ _id: req.params.id },
                {$set: { isActive: req.body.isActive }})
            if(!result.modifiedCount){
                return res.status(404).send({ error: "Request has failed." })
            } else return res.status(204).send(result)
        }
   } catch (e) {
        console.log(e)
   }
}

exports.getAllMods = async (req, res) => {
    try {
        const mods = await User.find({ isAdmin: false })
        if(mods) return res.status(200).json(mods);
        if(!mods) return res.status(204).json({ error: "No users found"});
    } catch (e) {
        console.log(e)
    }
}

exports.getModbyId = async (req, res) => {
    try {
        const mod = await User.findOne({ _id: req.params.id })
        if(mod) return res.status(200).json(mod);
        if(!mod) return res.status(204).json({ error: "User not found."});
    } catch (e) {
        console.log(e)
    }
}

exports.deleteMod = async (req, res) => {
    try {
        const mod = await User.findOne({ _id: req.params.id })
        if(!mod) {
            return res.status(404).send({ error: "User not found" })
        } else {
            const result = await User.deleteOne({ _id: req.params.id })
            if(!result.deletedCount){
                return res.status(404).send({ error: "Request has failed." })
            } else {
                const result = await Profile.deleteOne({ _id: mod.id_profile })
                if(!result.deletedCount){
                    return res.status(404).send({ error: "Request has failed." })
                } else {
                    return res.status(204).send(result)
                }
            }
        } 
    } catch (e) {
         console.log(e)
    }
 }