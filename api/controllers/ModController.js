const Comment = require("../models/Comment");
const Article = require("../models/Article");
const getError = require("../../utils");
const fs = require("fs");

//****** ARTICLE ********
exports.createArticle = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    let article = new Article({
      ...req.body,
      file: newPath,
      online: false,
      id_profile: res.locals.profileId,
    });
    await article.save().then((newArticle) => res.status(200).send(newArticle));
  } catch (error) {
    console.log(error.message);
  }
};

exports.editArticle = async (req, res) => {
  try {
    const trimmedId = req.params.id.trim();
    const article = await Article.findOne({ _id: trimmedId });

    if (!article) {
      res.sendStatus(404);
      return;
    }
    const { title, summary, topic, caption, content } = req.body;
    if (!title || !summary || !topic || !req.file || !caption || !content) {
      res.status(422).send(getError("empty"));
      return;
    }
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      newPath = path + "." + extension;
      fs.renameSync(path, newPath);
      const result = await Article.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body, file: newPath ? newPath : article.file } },
        { runValidators: true }
      );

      if (!result.modifiedCount) {
        res.status(404).send(getError("fail"));
        return;
      }
    }
    res.sendStatus(204);
  } catch (e) {
    console.log("error", e.message);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) {
      res.sendStatus(404);
      return;
    }
    const result = await Article.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    res.status(204).send(result);
  } catch (e) {
    console.log(e.message);
  }
};

//****** COMMENT ********
exports.getReportedComments = async (req, res) => {
  try {
    const reportedComments = await Comment.find({ isReported: true });
    if (!reportedComments) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(reportedComments);
  } catch (e) {
    console.log(e.message);
  }
};

exports.moderateComment = async (req, res) => {
  // unreport comment
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (!comment) {
      res.sendStatus(404);
      return;
    }
    const result = await Comment.updateOne(
      { _id: req.params.id },
      { $set: { isReported: false } },
      { runValidators: true }
    );
    if (!result.modifiedCount) {
      res.status(404).send({ error: "Request has failed." });
      return;
    }
    res.status(204).send(result);
  } catch (e) {
    console.log(e.message);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (!comment) {
      res.sendStatus(404);
      return;
    }
    const result = await Comment.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      res.sendStatus(404);
      return;
    }
    res.status(204).send(result);
  } catch (e) {
    console.log(e.message);
  }
};
