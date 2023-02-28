const User = require('../models/User');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.updatePassword = async (req, res) => { 
    try {
        const { password } = req.body;
        const user = await User.findOne({ _id: req.params.id });
        if(!user){
            return res.status(404).send({ error: "User not found" })
        } else {
            if(!password){ 
                return res.status(422).json({ error: "Merci de remplir le champ." })
            } else {
                const isInvalid = password?.match(regex) == null; // true for no match, false for match
                if(isInvalid) {
                    return res.status(400).json({ error : "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et caractère spécial." })
                } else {
                    let hash = bcrypt.hashSync(password, 10);
                    const result = await User.updateOne({_id: req.params.id },
                        {$set: {password: hash}})
                    if(!result.modifiedCount){
                        return res.status(404).send({ error: "Oops, something went wrong." })
                    } else return res.status(204).send(result)
                } 
            }
        }
    } catch (e) {
        console.log(e)
    }
}

exports.editProfile = async (req, res) => {
    //logic here
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if(!user){
            return res.status(404).send({ error: "User not found." })
        } else {
           return res.status(200).send(user) 
        }
    } catch (e) {
        console.log(e)
    } 
}

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id })
        if(!profile){
            return res.status(404).send({ error: "Profile not found." })
        } else {
           return res.status(200).send(profile) 
        }
    } catch (e) {
        console.log(e)
    } 
}