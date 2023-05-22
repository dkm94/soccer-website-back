// const Comment = require("../models/Comment");
const Article = require("../models/Article");
const getError = require("../utils/handleErrorMessages");
const fs = require("fs");

//****** ARTICLE ********
exports.createArticle = async (req, res, next) => {
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
    const newArticle = await article.save();

    res.status(200).json({
      message: "Article created successfully !",
      data: newArticle,
    });
  } catch (err) {
    next(err);
  }
};

exports.editArticle = async (req, res, next) => {
  try {
    const trimmedId = req.params.id.trim();
    const article = await Article.findOne({ _id: trimmedId });

    if (!article) {
      res.status(404).json({ message: "This post doesn't exist" });
      return;
    }

    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      newPath = path + "." + extension;
      fs.renameSync(path, newPath);
    }
    const result = await Article.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body, file: newPath ? newPath : article.file } },
      { runValidators: true, new: true }
    );

    const { matchedCount, modifiedCount } = result;
    if (!modifiedCount && !matchedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    res.send("Article updated successfully !");
  } catch (err) {
    next(err);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) {
      res.status(404).send(getError("notFound"));
      return;
    }
    const result = await Article.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    res.status(204).json({ message: "Post deleted successfully !." });
  } catch (err) {
    next(err);
  }
};

//****** COMMENT ********
// exports.getReportedComments = async (req, res) => {
//   try {
//     const reportedComments = await Comment.find({ isReported: true });
//     if (!reportedComments) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(200).send(reportedComments);
//   } catch (error) {
//     console.log(e.message);
//   }
// };

// exports.moderateComment = async (req, res) => {
//   try {
//     const comment = await Comment.findOne({ _id: req.params.id });
//     if (!comment) {
//       res.sendStatus(404);
//       return;
//     }
//     const result = await Comment.updateOne(
//       { _id: req.params.id },
//       { $set: { isReported: false } },
//       { runValidators: true }
//     );
//     if (!result.modifiedCount) {
//       res.status(404).send({ error: "Request has failed." });
//       return;
//     }
//     res.status(204).send(result);
//   } catch (error) {
//     console.log(e.message);
//   }
// };

// exports.deleteComment = async (req, res) => {
//   try {
//     const comment = await Comment.findOne({ _id: req.params.id });
//     if (!comment) {
//       res.sendStatus(404);
//       return;
//     }
//     const result = await Comment.deleteOne({ _id: req.params.id });
//     if (!result.deletedCount) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(204).send(result);
//   } catch (error) {
//     console.log(e.message);
//   }
// };
