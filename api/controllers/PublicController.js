const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Profile = require("../models/Profile");

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find()
        if(!profiles){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(profiles)
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

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
        if(!articles){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(articles)
    } catch (e) {
        console.log(e.message)
    }
}

exports.getAllArticlesByProfile = async (req, res) => {
    try {
        const articles = await Article.find({ id_profile: req.params.id })
        if(!articles){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(articles)
    } catch (e) {
        console.log(e.message)
    }
}

exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        if(!article){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(article)
    } catch (e) {
        console.log(e.message)
    }
}

exports.createComment = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        if(!article){
            res.sendStatus(404);
            return;
        }
        const { email, handle, content } = req.body;
        if(!email || !handle || !content){
            res.status(422).json({ error: "Please fill in all the fields."})
            return;
        }
        let comment = new Comment({
            ...req.body,
            isReported: false,
            id_article: req.params.id
        })
        await comment.save().then(newComment => res.status(200).send(newComment))
    } catch (e) {
        console.log(e.message)
    }
}

exports.getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.find({ id_article: req.params.id })
        if(!comments){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(comments)
    } catch (e) {
        console.log(e.message)
    }
}

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id })
        if(!comment){
            res.sendStatus(404)
            return;
        }
        res.status(200).send(comment)
    } catch (e) {
        console.log(e.message)
    }
}

exports.reportComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id })
        if(!comment){
            res.sendStatus(404)
            return;
        }
        const result = await Comment.updateOne({ _id: req.params.id }, {$set: { isReported: true }}, { runValidators: true })
        if(!result.modifiedCount){
            res.sendStatus(404)
            return;
        }
        res.sendStatus(204)
    } catch (e) {
        console.log(e.message)
    }
}