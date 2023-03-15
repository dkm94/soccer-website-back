const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const Article = require('../models/Article');
const User = require('../models/User');
const getError = require("../../utils");

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

//****** USER ********
exports.updatePassword = async (req, res) => { 
    try {
        const { password } = req.body;
        if(!password){ 
            res.status(422).send(getError("empty"))
            return;
        } 
        const isInvalid = password?.match(regex) == null; // true for no match, false for match
        if(isInvalid) {
            res.status(400).send(getError("passwordRegex"))
            return;
        }
        let hash = bcrypt.hashSync(password, 10);
        const result = await User.updateOne({_id: req.params.id },
            {$set: {password: hash}}, { runValidators: true })
        if(!result.modifiedCount){
            res.status(404).send(getError("fail"))
            return;
        }
        res.sendStatus(204)
    } catch (e) {
        console.log(e.message)
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if(!user){
            res.sendStatus(404)
            return;
        } 
        res.status(200).send(user) 
    } catch (e) {
        console.log(e.message)
    } 
}

//****** PROFILE ********
exports.editProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id })
        if(!profile){
            res.sendStatus(404)
            return;
        }
        
        const result = await Profile.updateOne({ _id: req.params.id }, {$set:{...req.body}}, { runValidators: true })
        if(!result.modifiedCount){
            res.status(404).send(getError("fail"))
            return;
        }
        res.status(204).send(result)
    } catch (e) {
        console.log(e.message) 
    }
}

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id })
        if(!profile){
            res.sendStatus(404)
            return;
        } 
        res.status(200).send(profile) 
    } catch (e) {
        console.log(e.message)
    } 
}