const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const getError = require("../../utils");

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.createMod = async (req, res) => {
    try {
        let profile = new Profile({
            ...req.body
        })
        await profile.save()
            .then(newProfile => {
                const {email, password} = req.body;
                if(!email || !password){
                    res.status(422).send(getError("empty"));
                    return;
                } 
                const isInvalid = password?.match(regex) == null; // true for no match, false for match
                if(isInvalid) {
                    res.status(400).send(getError("passwordRegex"));
                    return;
                } 
                let hash = bcrypt.hashSync(password, 10);
                let mod = new User ({
                    ...req.body,
                    password: hash,
                    isAdmin: false,
                    isMod: true,
                    accountValidated: false, // 1st log: Welcome mod, you can now activate your profile.
                    id_profile: newProfile._id
                });
                mod.save().then(newMod => res.status(200).send(newMod))
            })
    } catch (e) {
        console.log(e.message)
    }
}

exports.isMod = async (req, res) => {
    try {
         const user = await User.findOne({ _id: req.params.id })
         if(!user){
            res.sendStatus(404)
            return;
        }
         const result = await User.updateOne({ _id: req.params.id }, {$set: { isMod: req.body.isMod }}, { runValidators: true })
         if(!result.modifiedCount){ 
            res.status(404).send(getError("fail"))
            return;
        }
        res.status(204).send(result)  
    } catch (e) {
         console.log(e.message)
    }
 }

 exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate({path:'id_profile',select:'name handle _id -_id',model:Profile})
        if(!users){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(users)
    } catch (e) {
        console.log(e.message)
    }
}

exports.getModbyId = async (req, res) => {
    try {
        const mod = await User.findOne({ _id: req.params.id })
        if(!mod){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(mod);
    } catch (e) {
        console.log(e)
    }
}

exports.deleteMod = async (req, res) => {
    try {
        const mod = await User.findOne({ _id: req.params.id })
        if(!mod){ 
            res.sendStatus(404)
            return; 
        }
            
        const user_result = await User.deleteOne({ _id: req.params.id })
        if(!user_result.deletedCount){ 
            res.status(404).send(getError("fail"))
            return;
        }

        const profile_result = await Profile.deleteOne({ _id: mod.id_profile })
        if(!profile_result.deletedCount){ 
            res.status(404).send(getError("fail"))
            return; 
        }
        
        res.status(204).send(profile_result)
    } catch (e) {
         console.log(e)
    }
 }