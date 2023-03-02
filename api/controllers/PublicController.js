const Article = require("../models/Article");

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