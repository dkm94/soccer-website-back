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
    const newArticle = await article.save();

    return res.status(200).json({
      message: "Article created successfully !",
      data: newArticle,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }
    return res.status(500).send(getError("internalErrorServer"));
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
    // const { title, summary, topic, content } = req.body;
    // if (!title || !summary || !topic || !content) {
    //   res.status(422).send(getError("empty"));
    //   return;
    // }
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
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send(getError("invalidValue"));
    }
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }
    return res.status(500).send(getError("internalErrorServer"));
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
    res.status(204).send("L'article a été supprimé.");
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send(getError("invalidValue"));
    }
    return res.status(500).send(getError("internalErrorServer"));
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
