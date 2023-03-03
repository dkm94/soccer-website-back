const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const getError = require("../../utils");

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

exports.createMod = async (req, res) => {
    try {
        let profile = new Profile({
            ...req.body,
            isActive: false
        })
        await profile.save()
            .then(newProfile => {
                const {email, password, isAdmin} = req.body;
                if(!email || !password || !isAdmin){
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
                    isActive: false,
                    id_profile: newProfile._id
                });
                mod.save().then(newMod => res.status(200).send(newMod))
            })
    } catch (e) {
        console.log(e.message)
    }
}

exports.isActive = async (req, res) => {
   try {
        const mod = await User.findOne({ _id: req.params.id })
        if(!mod){ 
            res.sendStatus(404)
            return; 
        }
        const result = await User.updateOne({ _id: req.params.id },{$set: { isActive: req.body.isActive }}, { runValidators: true })
        if(!result.modifiedCount){ 
            res.status(404).send(getError("fail"))
            return;
        }
        res.status(204).send(result)  
   } catch (e) {
        console.log(e.message)
   }
}

exports.isMod = async (req, res) => {
    try {
         const mod = await User.findOne({ _id: req.params.id })
         if(!mod){
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

exports.getAllMods = async (req, res) => {
    try {
        const mods = await User.find({ isMod: true })
        if(!mods || mods.length === 0){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(mods);
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