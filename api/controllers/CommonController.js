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
        const user = await User.findOne({ _id: req.params.id });
        if(!user){
            res.sendStatus(404)
            return;
        }
        if(req.params.id != res.locals.userId){
            res.status(401).send(getError("unauthorized"))
            return;
        }
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
        if(req.params.id != res.locals.profileId){
            res.status(401).send(getError("unauthorized"))
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

//****** ARTICLE ********
exports.createArticle = async (req, res) => {
    try {
        const mod = await User.findOne({ isMod: true })
        if(!mod){
            res.status(401).send(getError("unauthorized"))
            return;
        }
        const article = new Article({
            ...req.body,
            id_profile: res.locals.profileId
        })
        await article.save().then(newArticle => res.status(200).send(newArticle))
    } catch (e) {
        console.log(e.message)
    }
}

exports.editArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        if(!article){
            res.sendStatus(404);
            return;
        }
        if(article.id_profile != res.locals.profileId){
            res.status(401).send(getError("unauthorized"))
            return;
        }
        const result = await Article.updateOne({ _id: req.params.id }, {$set: {...req.body}}, { runValidators: true })
        if(!result.modifiedCount){
            res.status(404).send(getError("fail"))
            return;
        }
        res.status(204).send(result)
    } catch (e) {
        console.log(e.message)
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        if(!article){
            res.sendStatus(404);
            return;
        }
        if(article.id_profile != res.locals.profileId){
            res.status(401).send(getError("unauthorized"))
            return;
        }
        const result = await Article.deleteOne({ _id: req.params.id })
        if(!result.deletedCount){
            res.status(404).send(getError("fail"))
            return;
        }
        res.status(204).send(result)
    } catch (e) {
        console.log(e.message)
    }
}