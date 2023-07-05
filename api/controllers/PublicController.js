const Article = require("../models/Article");
// const Comment = require("../models/Comment");
const Profile = require("../models/Profile");
const User = require("../models/User");
const getError = require("../utils/handleErrorMessages");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: "id_profile",
      select: "name handle _id file",
      model: Profile,
    });
    if (!users) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    if (!profiles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(profiles);
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id });
    if (!profile) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(profile);
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    if (!articles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

exports.getLastArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: 1 }).limit(5);
    if (!articles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

exports.getAllArticlesByProfile = async (req, res, next) => {
  try {
    const articles = await Article.find({ id_profile: req.params.id });
    if (!articles) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate(
      "id_profile",
      ["handle", "intro", "file"]
    );
    if (!article) {
      res.status(404).json({ message: "This post doesn't exist" });
      return;
    }
    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
};

// exports.createComment = async (req, res, next) => {
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
//   } catch (err) {
//     next(err)
//   }
// };

// exports.getCommentsByArticle = async (req, res, next) => {
//   try {
//     const comments = await Comment.find({ id_article: req.params.id });
//     if (!comments) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(200).send(comments);
//   } catch (err) {
//     next(err)
//   }
// };

// exports.getCommentById = async (req, res, next) => {
//   try {
//     const comment = await Comment.findOne({ _id: req.params.id });
//     if (!comment) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(200).send(comment);
//   } catch (err) {
//     next(err)
//   }
// };

// exports.reportComment = async (req, res, next) => {
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
//   } catch (err) {
//    next(err)
//   }
// };
