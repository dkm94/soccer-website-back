const Article = require("../models/Article");
// const Comment = require("../models/Comment");
const Profile = require("../models/Profile");
const User = require("../models/User");
const getError = require("../../utils");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "id_profile",
      select: "name handle _id",
      model: Profile,
    });
    if (!users) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(getError("internalErrorServer"));
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (!profiles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(profiles);
  } catch (error) {
    return res.status(500).send(getError("internalErrorServer"));
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id });
    if (!profile) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(profile);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send(getError("invalidValue"));
    }
    return res.status(500).send(getError("internalErrorServer"));
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    if (!articles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(articles);
  } catch (error) {
    return res.status(500).send(getError("internalErrorServer"));
  }
};

exports.getAllArticlesByProfile = async (req, res) => {
  try {
    const articles = await Article.find({ id_profile: req.params.id });
    if (!articles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(articles);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send(getError("invalidValue"));
    }
    return res.status(500).send(getError("internalErrorServer"));
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate(
      "id_profile",
      ["handle"]
    );
    if (!article) {
      res.status(404).send(getError("notFound"));
      return;
    }
    res.status(200).send(article);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send(getError("invalidValue"));
    }
    return res.status(500).send(getError("internalErrorServer"));
  }
};

// exports.createComment = async (req, res) => {
//   try {
//     const article = await Article.findOne({ _id: req.params.id });
//     if (!article) {
//       res.sendStatus(404);
//       return;
//     }
//     const comment = new Comment({
//       ...req.body,
//       isReported: false,
//       id_article: req.params.id,
//     });
//     const newComment = await comment.save();
//      res.status(200).send(newComment)
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       let errors = {};

//       Object.keys(error.errors).forEach((key) => {
//         errors[key] = error.errors[key].message;
//       });

//       return res.status(400).send(errors);
//     }
//     return res.status(500).send(getError("internalErrorServer"));
//   }
// };

// exports.getCommentsByArticle = async (req, res) => {
//   try {
//     const comments = await Comment.find({ id_article: req.params.id });
//     if (!comments) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(200).send(comments);
//   } catch (error) {
//     if (error.name === "CastError") {
//       return res.status(404).send(getError("invalidValue"));
//     }
//     return res.status(500).send(getError("internalErrorServer"));
//   }
// };

// exports.getCommentById = async (req, res) => {
//   try {
//     const comment = await Comment.findOne({ _id: req.params.id });
//     if (!comment) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(200).send(comment);
//   } catch (error) {
//     if (error.name === "CastError") {
//       return res.status(404).send(getError("invalidValue"));
//     }
//     return res.status(500).send(getError("internalErrorServer"));
//   }
// };

// exports.reportComment = async (req, res) => {
//   try {
//     const comment = await Comment.findOne({ _id: req.params.id });
//     if (!comment) {
//       res.sendStatus(404);
//       return;
//     }
//     const result = await Comment.updateOne(
//       { _id: req.params.id },
//       { $set: { isReported: true } },
//       { runValidators: true }
//     );
//     if (!result.modifiedCount) {
//       res.sendStatus(404);
//       return;
//     }
//     res.sendStatus(204);
//   } catch (error) {
//     if (error.name === "CastError") {
//       return res.status(404).send(getError("invalidValue"));
//     }
//     return res.status(500).send(getError("internalErrorServer"));
//   }
// };
