const User = require("../models/User");
const Comment = require("../models/Comment");

//****** COMMENT ********
exports.getReportedComments = async (req, res) => {
    try {
        const user = await User.findOne({ _id: res.locals.userId })
        if(!user.isMod){
            res.status(401).send({ error: "You don't have permission to execute this action." })
        }
        const reportedComments = await Comment.find({ isReported: true })
        if(!reportedComments){
            res.sendStatus(404);
            return;
        }
        res.status(200).send(reportedComments)
    } catch (e) {
        console.log(e.message)
    }
}

exports.moderateComment = async (req, res) => { // unreport comment
    try {
        const user = await User.findOne({ _id: res.locals.userId })
        if(!user.isMod){
            res.status(401).send({ error: "You don't have permission to execute this action." })
        }
        const comment = await Comment.findOne({ _id: req.params.id })
        if(!comment){
            res.sendStatus(404)
            return;
        }
        const result = await Comment.updateOne({ _id: req.params.id },
            {$set: { isReported: false }}, { runValidators: true })
        if(!result.modifiedCount){
            res.status(404).send({ error: "Request has failed." })
            return;
        }
        res.status(204).send(result)
    } catch (e) {
        console.log(e.message)
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const user = await User.findOne({ _id: res.locals.userId })
        if(!user.isMod){
            res.status(401).send({ error: "You don't have permission to execute this action." })
        }
        const comment = await Comment.findOne({ _id: req.params.id })
        if(!comment){
            res.sendStatus(404);
            return;
        }
        const result = await Comment.deleteOne({ _id: req.params.id })
        if(!result.deletedCount){
            res.sendStatus(404)
            return;
        }
        res.status(204).send(result)
    } catch (e) {
        console.log(e.message);
    }
}