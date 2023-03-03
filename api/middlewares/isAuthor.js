const getError = require("../../utils");
const Article = require('../models/Article');

module.exports = async (req, res, next) => {
    try {
        const article = await Article.findOne({ _id: req.params.id });
        if(!article){
            res.sendStatus(404);
            return;
        }
        if(article.id_profile != res.locals.profileId){
            res.status(401).send(getError("unauthorized"));
            return;
        } else {
            next();
        }
    } catch {
        res.sendStatus(401);
    }
};