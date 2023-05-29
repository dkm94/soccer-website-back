const User = require("../models/User");
const Profile = require("../models/Profile");
const getError = require("../utils/handleErrorMessages");
const Article = require("../models/Article");

exports.createMod = async (req, res, next) => {
  try {
    // const { email, name, handle, intro, file } = req.body;
    const profile = new Profile({
      ...req.body,
    });
    const newProfile = await profile.save();

    const mod = new User({
      email: `${email}@twolefoot.fr`,
      isAdmin: false,
      isMod: true,
      accountValidated: false, // 1st log: Welcome mod, you can now activate your profile.
      id_profile: newProfile._id,
    });
    const newMod = await mod.save();

    res.status(200).json({
      message: "Account created successfully !",
      data: newMod,
    });
  } catch (err) {
    next(err);
  }
};

exports.isMod = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { isMod: !user.isMod } },
      { runValidators: true }
    );
    if (!result.modifiedCount) {
      res.status(404).send(getError("fail"));
      return;
    }
    return res.status(204).send({ message: "Mod updated successfully !" });
  } catch (err) {
    next(err);
  }
};

exports.isFeatured = async (req, res, next) => {
  try {
    const currentArticle = await Article.findOne({ _id: req.params.id });
    if (!currentArticle) {
      res.status(404).send({ message: "Oops, this post doesn't exist" });
      return;
    }

    const result = await Article.updateOne(
      { _id: req.params.id },
      { $set: { featured: !currentArticle.featured } },
      { runValidators: true }
    );
    const { matchedCount, modifiedCount } = result;
    if (!modifiedCount && !matchedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    res.send({ message: "Featured articles list updated !" });
  } catch (err) {
    next(err);
  }
};

exports.getModbyId = async (req, res, next) => {
  try {
    const mod = await User.findOne({ _id: req.params.id });
    if (!mod) {
      res.sendStatus(404);
      return;
    }
    return res.status(200).send(mod);
  } catch (err) {
    next(err);
  }
};

exports.deleteMod = async (req, res, next) => {
  try {
    const mod = await User.findOne({ _id: req.params.id });
    if (!mod) {
      res.status(404).send({ message: "Oops, this mod doesn't exist" });
      return;
    }

    const user_result = await User.deleteOne({ _id: req.params.id });
    if (!user_result.deletedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    const profile_result = await Profile.deleteOne({ _id: mod.id_profile });
    if (!profile_result.deletedCount) {
      res.status(404).send(getError("fail"));
      return;
    }

    return res.status(204).send({ message: "Mod deleted successfully !" });
  } catch (err) {
    next(err);
  }
};
